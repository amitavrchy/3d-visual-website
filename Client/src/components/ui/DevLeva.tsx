"use client";

import { useControls } from "leva";
import { useEffect } from "react";
import {
  setBloom,
  setExposure,
  setQuality,
  updatePlayground,
} from "@/features/sceneUi/sceneUiSlice";
import { useAppDispatch } from "@/store/hooks";

/** Dev-only Leva bridge — never imported in production pages via a guarded dynamic. */
export function DevLeva() {
  const dispatch = useAppDispatch();
  const values = useControls("Scene", {
    quality: { options: ["low", "med", "high"], value: "med" },
    bloom: true,
    exposure: { value: 1, min: 0.4, max: 2, step: 0.05 },
    color: "#4AF2C8",
    metalness: { value: 0.75, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.22, min: 0, max: 1, step: 0.01 },
  });

  useEffect(() => {
    dispatch(setQuality(values.quality as "low" | "med" | "high"));
    dispatch(setBloom(values.bloom));
    dispatch(setExposure(values.exposure));
    dispatch(
      updatePlayground({
        color: values.color,
        metalness: values.metalness,
        roughness: values.roughness,
      }),
    );
  }, [dispatch, values]);

  return null;
}
