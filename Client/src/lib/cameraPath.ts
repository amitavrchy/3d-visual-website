import { MathUtils, Vector3 } from "three";

/** Camera keyframes along the Origin journey (position + lookAt). */
const KEYS: {
  t: number;
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
}[] = [
  { t: 0.0, pos: [0, 0.2, 8.5], look: [0, 0, 0], fov: 42 },
  { t: 0.14, pos: [0.4, 0.1, 5.2], look: [0, 0, 0], fov: 40 },
  { t: 0.3, pos: [-0.6, 0.4, 3.4], look: [0, 0.1, 0], fov: 38 },
  { t: 0.48, pos: [1.2, 0.8, 2.2], look: [0, 0.2, -1], fov: 45 },
  { t: 0.66, pos: [-1.5, 1.1, 4.0], look: [0, 0.3, 0], fov: 36 },
  { t: 0.84, pos: [0.2, 0.5, 5.5], look: [0, 0.15, 0], fov: 40 },
  { t: 1.0, pos: [0, 0.35, 6.2], look: [0, 0.1, 0], fov: 38 },
];

function sample(t: number) {
  const p = MathUtils.clamp(t, 0, 1);
  let i = 0;
  while (i < KEYS.length - 2 && KEYS[i + 1]!.t < p) i++;
  const a = KEYS[i]!;
  const b = KEYS[i + 1]!;
  const u = (p - a.t) / Math.max(1e-6, b.t - a.t);
  const s = u * u * (3 - 2 * u);
  const pos = new Vector3(
    MathUtils.lerp(a.pos[0], b.pos[0], s),
    MathUtils.lerp(a.pos[1], b.pos[1], s),
    MathUtils.lerp(a.pos[2], b.pos[2], s),
  );
  const look = new Vector3(
    MathUtils.lerp(a.look[0], b.look[0], s),
    MathUtils.lerp(a.look[1], b.look[1], s),
    MathUtils.lerp(a.look[2], b.look[2], s),
  );
  const fov = MathUtils.lerp(a.fov, b.fov, s);
  return { pos, look, fov };
}

const _pos = new Vector3();
const _look = new Vector3();
const _mouseOffset = new Vector3();

export function getCameraSample(progress: number, mouseX = 0, mouseY = 0) {
  const s = sample(progress);
  _mouseOffset.set(mouseX * 0.35, mouseY * 0.22, 0);
  _pos.copy(s.pos).add(_mouseOffset);
  _look.copy(s.look);
  _look.x += mouseX * 0.05;
  _look.y += mouseY * 0.04;
  return { position: _pos, lookAt: _look, fov: s.fov };
}
