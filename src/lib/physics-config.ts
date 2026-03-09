export interface PipeConfig {
  id: number;
  width: number;
  height: number;
  color: string;
  marking: string;
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
  gravityY: 1.2,
  timeScale: 1.1,
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
  loopPauseMs: 3500,
  loopFadeMs: 700,
} as const;

const PIPE_COLORS = [
  "#0c1220",
  "#0a1018",
  "#0e141f",
  "#0b111c",
  "#0d1321",
  "#091019",
  "#0f1623",
];

const PIPE_MARKINGS = [
  "SUKAJ SH.P.K  —  PE100  HDPE",
  "M&L SUKAJ  ·  EN 13476  ·  SN8",
  "SUKAJ  —  PP  ·  ISO 9001",
  "HDPE PE100  —  SUKAJ SH.P.K",
  "SUKAJ  ·  PVC  ·  EN 12201",
  "M&L SUKAJ  —  HDPE  DN/OD 315",
];

const DESKTOP_PIPE_PRESETS: PipePreset[] = [
  {
    id: 1,
    baseWidth: 380,
    height: 68,
    color: PIPE_COLORS[0],
    marking: PIPE_MARKINGS[0],
    density: 0.003,
    friction: 0.45,
    restitution: 0.32,
    frictionAir: 0.018,
    sleepThreshold: 38,
    dropDelayMs: 0,
    initialX: -140,
    initialY: -350,
    initialRotationDeg: -28,
    initialVelocity: { x: 2.2, y: 2.0 },
    initialAngularVelocity: 0.035,
  },
  {
    id: 2,
    baseWidth: 320,
    height: 56,
    color: PIPE_COLORS[1],
    marking: PIPE_MARKINGS[1],
    density: 0.0028,
    friction: 0.42,
    restitution: 0.35,
    frictionAir: 0.02,
    sleepThreshold: 38,
    dropDelayMs: 180,
    initialX: 120,
    initialY: -280,
    initialRotationDeg: 22,
    initialVelocity: { x: -1.8, y: 2.5 },
    initialAngularVelocity: -0.04,
  },
  {
    id: 3,
    baseWidth: 440,
    height: 78,
    color: PIPE_COLORS[2],
    marking: PIPE_MARKINGS[2],
    density: 0.0032,
    friction: 0.48,
    restitution: 0.3,
    frictionAir: 0.019,
    sleepThreshold: 40,
    dropDelayMs: 380,
    initialX: -30,
    initialY: -400,
    initialRotationDeg: -35,
    initialVelocity: { x: 0.5, y: 1.8 },
    initialAngularVelocity: 0.028,
  },
  {
    id: 4,
    baseWidth: 280,
    height: 50,
    color: PIPE_COLORS[3],
    marking: PIPE_MARKINGS[3],
    density: 0.0026,
    friction: 0.4,
    restitution: 0.38,
    frictionAir: 0.025,
    sleepThreshold: 42,
    dropDelayMs: 520,
    initialX: 90,
    initialY: -320,
    initialRotationDeg: 32,
    initialVelocity: { x: -1.2, y: 2.8 },
    initialAngularVelocity: -0.05,
  },
  {
    id: 5,
    baseWidth: 400,
    height: 72,
    color: PIPE_COLORS[4],
    marking: PIPE_MARKINGS[4],
    density: 0.0029,
    friction: 0.46,
    restitution: 0.33,
    frictionAir: 0.021,
    sleepThreshold: 40,
    dropDelayMs: 700,
    initialX: -110,
    initialY: -370,
    initialRotationDeg: 18,
    initialVelocity: { x: 1.6, y: 2.2 },
    initialAngularVelocity: 0.042,
  },
  {
    id: 6,
    baseWidth: 350,
    height: 62,
    color: PIPE_COLORS[5],
    marking: PIPE_MARKINGS[5],
    density: 0.0027,
    friction: 0.44,
    restitution: 0.36,
    frictionAir: 0.022,
    sleepThreshold: 40,
    dropDelayMs: 880,
    initialX: 60,
    initialY: -300,
    initialRotationDeg: -20,
    initialVelocity: { x: -0.9, y: 2.6 },
    initialAngularVelocity: -0.032,
  },
  {
    id: 7,
    baseWidth: 460,
    height: 82,
    color: PIPE_COLORS[6],
    marking: PIPE_MARKINGS[0],
    density: 0.0031,
    friction: 0.47,
    restitution: 0.3,
    frictionAir: 0.019,
    sleepThreshold: 40,
    dropDelayMs: 1060,
    initialX: -50,
    initialY: -440,
    initialRotationDeg: 25,
    initialVelocity: { x: 0.8, y: 1.5 },
    initialAngularVelocity: 0.038,
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
    initialRotationDeg: -25,
    initialVelocity: { x: 1.2, y: 2.0 },
    initialAngularVelocity: 0.03,
  },
  {
    ...DESKTOP_PIPE_PRESETS[1],
    baseWidth: 200,
    height: 40,
    dropDelayMs: 200,
    initialX: 35,
    initialY: -240,
    initialRotationDeg: 20,
    initialVelocity: { x: -0.8, y: 2.4 },
    initialAngularVelocity: -0.035,
  },
  {
    ...DESKTOP_PIPE_PRESETS[2],
    baseWidth: 260,
    height: 50,
    dropDelayMs: 420,
    initialX: -15,
    initialY: -320,
    initialRotationDeg: -30,
    initialVelocity: { x: 0.6, y: 1.8 },
    initialAngularVelocity: 0.025,
  },
  {
    ...DESKTOP_PIPE_PRESETS[3],
    baseWidth: 180,
    height: 36,
    dropDelayMs: 600,
    initialX: 25,
    initialY: -260,
    initialRotationDeg: 28,
    initialVelocity: { x: -0.5, y: 2.6 },
    initialAngularVelocity: -0.04,
  },
  {
    ...DESKTOP_PIPE_PRESETS[4],
    baseWidth: 240,
    height: 44,
    dropDelayMs: 780,
    initialX: -30,
    initialY: -300,
    initialRotationDeg: 15,
    initialVelocity: { x: 0.9, y: 2.1 },
    initialAngularVelocity: 0.032,
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
    return {
      ...preset,
      width: Math.round(clamp(baseWidth, 200, maxPipeWidth)),
    };
  });
}
