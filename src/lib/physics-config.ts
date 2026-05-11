export interface PipeConfig {
  id: number;
  width: number;
  height: number;
  color: string;
  marking: string;
  markingColor?: string;
  density: number;
  friction: number;
  restitution: number;
  frictionAir: number;
  sleepThreshold: number;
  dropDelayMs: number;
  initialX: number;
  initialY: number;
  initialRotationDeg: number;
  initialVelocity: { x: number; y: number };
  initialAngularVelocity: number;
}

interface PipePreset extends Omit<PipeConfig, "width"> {
  baseWidth: number;
}

export const HERO_PIPE_WORLD = {
  gravityY: 1.6,
  timeScale: 1.0,
  fixedDt: 16.667,
  maxSubSteps: 4,
  floorOffset: 22,
  floorThickness: 74,
  wallThickness: 100,
  wallInset: 40,
  settleFramesRequired: 90,
  linearSleepThreshold: 0.08,
  angularSleepThreshold: 0.008,
  maxAngularVelocity: 0.25,
  maxAngleDeg: 22,
} as const;

// Tight palette — reads as one product line
const PIPE_COLORS = [
  "#1e2d3d",
  "#243343",
  "#1f2e3e",
  "#253545",
  "#222f3f",
];

const PIPE_MARKINGS = [
  "SUKAJ SH.P.K  ·  PE100  HDPE",
  "SUKAJ  ·  EN 13476  ·  SN8",
  "SUKAJ SH.P.K  ·  HDPE  DN 315",
  "SUKAJ  ·  PE100  ·  EN 12201",
  "SUKAJ SH.P.K  ·  HDPE  PE100",
];

const DESKTOP_PIPE_PRESETS: PipePreset[] = [
  {
    id: 1,
    baseWidth: 360,
    height: 62,
    color: PIPE_COLORS[0],
    marking: PIPE_MARKINGS[0],
    density: 0.003,
    friction: 0.5,
    restitution: 0.18,
    frictionAir: 0.022,
    sleepThreshold: 36,
    dropDelayMs: 0,
    initialX: -120,
    initialY: -360,
    initialRotationDeg: -12,
    initialVelocity: { x: 1.2, y: 1.8 },
    initialAngularVelocity: 0.018,
  },
  {
    id: 2,
    baseWidth: 320,
    height: 56,
    color: PIPE_COLORS[1],
    marking: PIPE_MARKINGS[1],
    density: 0.0028,
    friction: 0.46,
    restitution: 0.2,
    frictionAir: 0.024,
    sleepThreshold: 36,
    dropDelayMs: 220,
    initialX: 100,
    initialY: -300,
    initialRotationDeg: 10,
    initialVelocity: { x: -1.0, y: 2.0 },
    initialAngularVelocity: -0.02,
  },
  {
    id: 3,
    baseWidth: 400,
    height: 70,
    color: PIPE_COLORS[2],
    marking: PIPE_MARKINGS[2],
    density: 0.0032,
    friction: 0.5,
    restitution: 0.16,
    frictionAir: 0.022,
    sleepThreshold: 38,
    dropDelayMs: 460,
    initialX: -20,
    initialY: -400,
    initialRotationDeg: -14,
    initialVelocity: { x: 0.4, y: 1.6 },
    initialAngularVelocity: 0.014,
  },
  {
    id: 4,
    baseWidth: 340,
    height: 58,
    color: PIPE_COLORS[3],
    marking: PIPE_MARKINGS[3],
    density: 0.0028,
    friction: 0.46,
    restitution: 0.2,
    frictionAir: 0.024,
    sleepThreshold: 38,
    dropDelayMs: 680,
    initialX: 70,
    initialY: -320,
    initialRotationDeg: 14,
    initialVelocity: { x: -0.8, y: 2.2 },
    initialAngularVelocity: -0.018,
  },
  {
    id: 5,
    baseWidth: 380,
    height: 66,
    color: PIPE_COLORS[4],
    marking: PIPE_MARKINGS[4],
    density: 0.003,
    friction: 0.48,
    restitution: 0.18,
    frictionAir: 0.022,
    sleepThreshold: 38,
    dropDelayMs: 900,
    initialX: -80,
    initialY: -380,
    initialRotationDeg: 8,
    initialVelocity: { x: 0.9, y: 1.8 },
    initialAngularVelocity: 0.016,
  },
];

const MOBILE_PIPE_PRESETS: PipePreset[] = [
  {
    ...DESKTOP_PIPE_PRESETS[0],
    baseWidth: 230,
    height: 46,
    dropDelayMs: 0,
    initialX: -40,
    initialY: -280,
    initialRotationDeg: -15,
    initialVelocity: { x: 1.0, y: 2.0 },
    initialAngularVelocity: 0.02,
  },
  {
    ...DESKTOP_PIPE_PRESETS[1],
    baseWidth: 200,
    height: 40,
    dropDelayMs: 200,
    initialX: 35,
    initialY: -240,
    initialRotationDeg: 12,
    initialVelocity: { x: -0.7, y: 2.4 },
    initialAngularVelocity: -0.022,
  },
  {
    ...DESKTOP_PIPE_PRESETS[2],
    baseWidth: 260,
    height: 50,
    dropDelayMs: 420,
    initialX: -15,
    initialY: -320,
    initialRotationDeg: -18,
    initialVelocity: { x: 0.5, y: 1.8 },
    initialAngularVelocity: 0.018,
  },
  {
    ...DESKTOP_PIPE_PRESETS[3],
    baseWidth: 180,
    height: 36,
    dropDelayMs: 600,
    initialX: 25,
    initialY: -260,
    initialRotationDeg: 20,
    initialVelocity: { x: -0.4, y: 2.6 },
    initialAngularVelocity: -0.025,
  },
  {
    ...DESKTOP_PIPE_PRESETS[4],
    baseWidth: 240,
    height: 44,
    dropDelayMs: 780,
    initialX: -30,
    initialY: -300,
    initialRotationDeg: 10,
    initialVelocity: { x: 0.7, y: 2.1 },
    initialAngularVelocity: 0.02,
  },
];

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function createPipeConfigs({
  isMobile,
  containerWidth,
}: {
  isMobile: boolean;
  containerWidth: number;
}): PipeConfig[] {
  const presets = isMobile ? MOBILE_PIPE_PRESETS : DESKTOP_PIPE_PRESETS;
  const safeContainerWidth = Math.max(containerWidth, isMobile ? 320 : 520);

  return presets.map(({ baseWidth, ...preset }) => {
    const maxPipeWidth = safeContainerWidth * (isMobile ? 0.84 : 0.78);
    // Heavy industrial tuning: heavier, less bouncy, slower tumble.
    const tunedRestitution = clamp(preset.restitution * 0.3, 0.08, 0.12);
    const tunedDensity = preset.density * 1.4;
    const tunedFrictionAir = 0.012;
    const tunedAngularVel = preset.initialAngularVelocity * 0.5;
    return {
      ...preset,
      width: Math.round(clamp(baseWidth, 220, maxPipeWidth)),
      restitution: tunedRestitution,
      density: tunedDensity,
      frictionAir: tunedFrictionAir,
      initialAngularVelocity: tunedAngularVel,
      markingColor: preset.markingColor,
    };
  });
}
