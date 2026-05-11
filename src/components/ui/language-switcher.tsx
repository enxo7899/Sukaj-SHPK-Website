"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useTranslation, LOCALES, type Locale } from "@/lib/i18n/context";
import { localeMeta } from "@/lib/i18n/translations";

export function LanguageSwitcher({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "compact";
}) {
  const { locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  const handleSelect = (next: Locale) => {
    setLocale(next);
    setOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs font-medium tracking-wider text-slate-300 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white ${
          variant === "compact" ? "" : "min-w-[68px]"
        }`}
        aria-label="Change language"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Globe className="h-3.5 w-3.5 text-slate-400" />
        <span className="font-mono">{localeMeta[locale].short}</span>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-44 origin-top-right rounded-xl border border-white/[0.08] bg-slate-950/95 p-1 shadow-xl shadow-black/50 backdrop-blur-xl"
          role="menu"
        >
          {LOCALES.map((loc) => {
            const meta = localeMeta[loc];
            const active = loc === locale;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => handleSelect(loc)}
                role="menuitemradio"
                aria-checked={active}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  active
                    ? "bg-cyan-500/10 text-cyan-100"
                    : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="font-mono text-[10px] tracking-widest text-slate-500">
                    {meta.short}
                  </span>
                  <span className="font-medium">{meta.label}</span>
                </span>
                {active && <Check className="h-3.5 w-3.5 text-cyan-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
