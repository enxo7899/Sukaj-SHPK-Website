"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Monitor, Moon, Sun } from "lucide-react";

type ThemeMode = "system" | "light" | "dark";

const STORAGE_KEY = "theme-mode";

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = mode === "system" ? (systemDark ? "dark" : "light") : mode;
  root.setAttribute("data-theme", resolved);
  root.style.colorScheme = resolved;
}

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ThemeMode>("system");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    const nextMode = stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
    setMode(nextMode);
    applyTheme(nextMode);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if ((localStorage.getItem(STORAGE_KEY) as ThemeMode | null) !== "light" && (localStorage.getItem(STORAGE_KEY) as ThemeMode | null) !== "dark") {
        applyTheme("system");
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) {
      document.addEventListener("mousedown", onClickOutside);
      return () => document.removeEventListener("mousedown", onClickOutside);
    }
  }, [open]);

  const setThemeMode = (next: ThemeMode) => {
    setMode(next);
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
    setOpen(false);
  };

  const activeIcon = mode === "light" ? Sun : mode === "dark" ? Moon : Monitor;
  const ActiveIcon = activeIcon;

  const options: { mode: ThemeMode; label: string; Icon: typeof Sun }[] = [
    { mode: "system", label: "System", Icon: Monitor },
    { mode: "light", label: "Light", Icon: Sun },
    { mode: "dark", label: "Dark", Icon: Moon },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium tracking-wider transition-colors"
        style={{ borderColor: "var(--site-border)", background: "var(--site-surface)", color: "var(--site-text-muted)" }}
        aria-label="Change theme"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <ActiveIcon className="h-3.5 w-3.5" />
        <span className="font-mono uppercase">{mode}</span>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-36 origin-top-right rounded-xl border p-1 shadow-xl backdrop-blur-xl"
          style={{ borderColor: "var(--site-border)", background: "var(--site-surface-strong)" }}
          role="menu"
        >
          {options.map((opt) => {
            const active = opt.mode === mode;
            const Icon = opt.Icon;
            return (
              <button
                key={opt.mode}
                type="button"
                onClick={() => setThemeMode(opt.mode)}
                className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors"
                style={{ color: active ? "#0891b2" : "var(--site-text-muted)", background: active ? "rgba(8,145,178,0.1)" : "transparent" }}
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5" />
                  <span className="font-medium">{opt.label}</span>
                </span>
                {active && <Check className="h-3.5 w-3.5" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
