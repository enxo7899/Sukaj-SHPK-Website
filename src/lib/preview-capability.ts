export type PreviewMode = "desktop-premium-3d" | "mobile-lite-3d" | "fallback-preview";

type CapabilityInput = {
  isMobile: boolean;
  reduceMotion: boolean;
  hasWebGL: boolean;
  saveData?: boolean;
  effectiveType?: string;
  deviceMemory?: number;
  hardwareConcurrency?: number;
};

export function resolvePreviewMode(input: CapabilityInput): PreviewMode {
  const slowNetwork = /(^2g$|^3g$|slow-2g)/i.test(input.effectiveType ?? "");
  const deviceMemory = input.deviceMemory ?? 4;
  const hardwareConcurrency = input.hardwareConcurrency ?? 4;
  const veryConstrained = deviceMemory <= 2 || hardwareConcurrency <= 2;
  const moderatelyConstrained = deviceMemory <= 4 || hardwareConcurrency <= 4;

  if (!input.hasWebGL || Boolean(input.saveData) || slowNetwork || input.reduceMotion) {
    return "fallback-preview";
  }

  if (input.isMobile) {
    return veryConstrained ? "fallback-preview" : "mobile-lite-3d";
  }

  return moderatelyConstrained ? "mobile-lite-3d" : "desktop-premium-3d";
}
