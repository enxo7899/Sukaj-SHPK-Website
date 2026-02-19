"use client";

import { createContext, useContext } from "react";

export type PerformanceTier = "high" | "medium" | "low";

export interface DeviceCapabilities {
  webglSupported: boolean;
  tier: PerformanceTier;
  isMobile: boolean;
  saveData: boolean;
}

export const defaultCapabilities: DeviceCapabilities = {
  webglSupported: true,
  tier: "high",
  isMobile: false,
  saveData: false,
};

export const PerformanceContext = createContext<DeviceCapabilities>(defaultCapabilities);

export const usePerformanceTier = () => useContext(PerformanceContext);
