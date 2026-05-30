"use client"

import { useState, useEffect } from "react"

interface OnboardingScreenProps {
  onComplete: () => void
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 1500)
    const nextTimer = setTimeout(() => onComplete(), 2000)
    return () => {
      clearTimeout(exitTimer)
      clearTimeout(nextTimer)
    }
  }, [onComplete])

  return (
    <div
      className="min-h-screen bg-[#033220] flex flex-col items-center justify-center"
      style={{ opacity: exiting ? 0 : 1, transition: "opacity 0.5s ease-out" }}
    >
      {/* Logo + ripple rings */}
      <div className="relative flex items-center justify-center mb-6">
        <div
          className="absolute w-24 h-24 rounded-[22px] bg-[#0A5C2A]"
          style={{ animation: "ttRipple 1.6s ease-out 0.2s infinite" }}
        />
        <div
          className="absolute w-24 h-24 rounded-[22px] bg-[#0A5C2A]"
          style={{ animation: "ttRipple 1.6s ease-out 0.7s infinite" }}
        />
        <div
          className="relative w-24 h-24 rounded-[22px] flex items-center justify-center shadow-2xl bg-[#0A5C2A]"
          style={{ animation: "ttScaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
        >
          <span className="text-6xl font-black text-white select-none italic leading-none">U</span>
        </div>
      </div>

      {/* App name */}
      <div
        className="text-center"
        style={{ animation: "ttTextIn 0.5s ease-out 0.35s both" }}
      >
        <p className="text-white font-bold text-2xl tracking-tight">Ungtienhang</p>
        <p className="text-white/60 text-xs font-medium mt-1 tracking-[0.15em] uppercase">
          TikTok Shop
        </p>
      </div>

      {/* Loading dots */}
      <div className="absolute bottom-16 flex gap-3">
        {[0, 0.18, 0.36].map((delay, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-white"
            style={{ animation: `ttDot 1s ease-in-out ${delay}s infinite` }}
          />
        ))}
      </div>

      <style>{`
        @keyframes ttScaleIn {
          from { transform: scale(0.6); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        @keyframes ttTextIn {
          from { transform: translateY(14px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes ttRipple {
          0%   { transform: scale(1);   opacity: 0.45; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes ttDot {
          0%, 100% { opacity: 0.25; transform: scale(0.8); }
          50%       { opacity: 1;    transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}
