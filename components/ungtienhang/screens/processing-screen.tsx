"use client"

import { useEffect, useState } from "react"
import { Check } from "lucide-react"

const steps = [
  "Xác minh yêu cầu",
  "Kết nối TikTok Shop",
  "Đang chuyển tiền về tài khoản",
]

export function ProcessingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= steps.length) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 750)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-8">
      {/* Logo */}
      <div className="w-16 h-16 rounded-2xl bg-[#166534] flex items-center justify-center mb-6 shadow-lg">
        <span className="text-3xl font-black text-white italic leading-none">U</span>
      </div>

      <p className="text-foreground font-bold text-xl mb-1">Đang xử lý giao dịch</p>
      <p className="text-muted-foreground text-sm mb-10">Vui lòng không tắt ứng dụng</p>

      {/* Steps */}
      <div className="w-full max-w-xs space-y-5">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 transition-all duration-500 ${
              i < progress ? "opacity-100" : "opacity-30"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                i < progress ? "bg-success" : "bg-muted"
              }`}
            >
              {i < progress ? (
                <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
              ) : (
                <span className="w-2 h-2 rounded-full bg-muted-foreground/30 block" />
              )}
            </div>
            <span className={`text-sm ${i < progress ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              {step}
            </span>
          </div>
        ))}
      </div>

      {/* Pulsing dots */}
      <div className="flex gap-2 mt-14">
        {[0, 0.2, 0.4].map((delay, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            style={{ animation: `ttDot 1s ease-in-out ${delay}s infinite` }}
          />
        ))}
      </div>

      <style>{`
        @keyframes ttDot {
          0%, 100% { opacity: 0.25; transform: scale(0.8); }
          50%       { opacity: 1;    transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}
