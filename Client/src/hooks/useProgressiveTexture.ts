"use client";

import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { SRGBColorSpace, Texture, TextureLoader } from "three";

const cache = new Map<string, Texture>();

export function previewUrlFor(url: string): string | null {
  // /textures/planets/2k_mercury.webp -> /textures/preview/2k_mercury.webp
  const m = url.match(/\/textures\/planets\/([^/]+\.webp)$/);
  if (!m) return null;
  return `/textures/preview/${m[1]}`;
}

export function useProgressiveTexture(
  url: string | null | undefined,
  options?: { preview?: string | null; enabled?: boolean },
): Texture | null {
  const enabled = options?.enabled !== false;
  const preview = options?.preview;
  const gl = useThree((s) => s.gl);
  const [map, setMap] = useState<Texture | null>(() => {
    if (!url || !enabled) return null;
    return cache.get(url) ?? null;
  });

  useEffect(() => {
    if (!url || !enabled) {
      setMap(null);
      return;
    }
    const hit = cache.get(url);
    if (hit) {
      setMap(hit);
      return;
    }

    let cancelled = false;
    const loader = new TextureLoader();
    const maxAniso = Math.min(8, gl.capabilities.getMaxAnisotropy?.() ?? 1);

    const apply = (tex: Texture, key: string, asFinal: boolean) => {
      tex.colorSpace = SRGBColorSpace;
      tex.anisotropy = maxAniso;
      tex.needsUpdate = true;
      cache.set(key, tex);
      if (!cancelled) {
        if (asFinal) setMap(tex);
        else setMap((cur) => (cur && cache.get(url) === cur ? cur : tex));
      }
    };

    (async () => {
      const previewPath = preview === undefined ? previewUrlFor(url) : preview;
      if (previewPath && !cache.get(url)) {
        const pHit = cache.get(previewPath);
        if (pHit) {
          if (!cancelled) setMap(pHit);
        } else {
          try {
            const p = await loader.loadAsync(previewPath);
            if (!cancelled && !cache.get(url)) apply(p, previewPath, false);
          } catch {
            /* preview optional */
          }
        }
      }
      try {
        const full = await loader.loadAsync(url);
        if (!cancelled) apply(full, url, true);
      } catch (err) {
        console.warn("[texture]", url, err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [url, preview, enabled, gl]);

  return map;
}
