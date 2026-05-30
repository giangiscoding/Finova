"use client"

import { useState } from "react"
import { formatMoney } from "@/components/ungtienhang/money-display"
import { ArrowLeft, Lock, Check } from "lucide-react"

interface QuickAdvanceScreenProps {
  onBack: () => void
  onConfirm: (amount: number) => void
}

const pendingAmount = 15700000
const maxAmount = Math.round(pendingAmount * 0.6) // 9.420.000đ
const minAmount = 500000
const feeRate = 0.008
const presets = [2000000, 4000000, 6000000, maxAmount]

function formatInput(value: string): string {
  const num = value.replace(/\D/g, "")
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export function QuickAdvanceScreen({ onBack, onConfirm }: QuickAdvanceScreenProps) {
  const [inputValue, setInputValue] = useState("")
  const [agreed, setAgreed] = useState(true)
  const [error, setError] = useState("")

  const amount = parseInt(inputValue.replace(/\./g, "") || "0")
  const fee = Math.round(amount * feeRate)
  const totalRepay = amount + fee
  const isValid = amount >= minAmount && amount <= maxAmount

  const handleInput = (raw: string) => {
    const digits = raw.replace(/\D/g, "")
    const num = parseInt(digits || "0")
    setError("")
    if (num > maxAmount) {
      setError(`Tối đa ${formatMoney(maxAmount)}`)
    }
    setInputValue(formatInput(digits))
  }

  const handlePreset = (preset: number) => {
    setError("")
    setInputValue(formatInput(String(preset)))
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Ứng tiền</h1>
      </header>

      <main className="flex-1 px-4 py-6 space-y-5">
        {/* Amount Input */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground text-center">Số tiền muốn ứng</p>

          {/* Input box */}
          <div className={`relative bg-card rounded-2xl border-2 transition-colors ${
            error ? "border-danger" : amount > 0 && isValid ? "border-primary" : "border-border"
          }`}>
            <div className="flex items-center px-4 py-4 gap-2">
              <input
                type="text"
                inputMode="numeric"
                value={inputValue}
                onChange={e => handleInput(e.target.value)}
                placeholder="0"
                className="flex-1 text-3xl font-bold text-foreground bg-transparent outline-none text-center placeholder:text-muted-foreground/40"
              />
              <span className="text-xl font-bold text-muted-foreground flex-shrink-0">đ</span>
            </div>
          </div>

          {/* Error / limit hint */}
          {error ? (
            <p className="text-xs text-danger text-center">{error}</p>
          ) : (
            <p className="text-xs text-muted-foreground text-center">
              Tối đa {formatMoney(maxAmount)} · = 60% × {formatMoney(pendingAmount)} đơn chờ
            </p>
          )}

          {/* Preset chips */}
          <div className="flex gap-2 justify-center flex-wrap">
            {presets.map((preset) => (
              <button
                key={preset}
                onClick={() => handlePreset(preset)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  amount === preset
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {preset === maxAmount ? "Tối đa" : `${preset / 1000000}tr`}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Card */}
        {amount >= minAmount && (
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-foreground">Bạn sẽ nhận</h3>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tiền chuyển về tài khoản</span>
                <span className="font-semibold text-foreground">{formatMoney(amount)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Phí dịch vụ (0.8%)</span>
                <span className="text-sm text-muted-foreground">{formatMoney(fee)}</span>
              </div>

              <div className="border-t border-border pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">Sẽ trừ từ tiền sàn</span>
                  <span className="font-bold text-foreground">{formatMoney(totalRepay)}</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 px-4 py-3">
              <p className="text-xs text-muted-foreground">
                Trừ tự động khi TikTok Shop giải ngân, dự kiến trong 5 ngày
              </p>
            </div>
          </div>
        )}

        {/* Agreement */}
        <label className="flex items-start gap-3 cursor-pointer">
          <button
            onClick={() => setAgreed(!agreed)}
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
              agreed ? "bg-primary border-primary" : "border-border bg-card"
            }`}
          >
            {agreed && <Check className="w-3 h-3 text-white" />}
          </button>
          <span className="text-sm text-foreground">
            Tôi đồng ý với{" "}
            <button className="text-primary font-medium">điều khoản ứng tiền</button>
          </span>
        </label>
      </main>

      {/* CTA */}
      <div className="sticky bottom-0 bg-card border-t border-border p-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
        <button
          onClick={() => onConfirm(amount)}
          disabled={!agreed || !isValid}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-white font-semibold py-4 rounded-xl transition-colors"
        >
          {isValid ? `Xác nhận ứng ${formatMoney(amount)}` : "Nhập số tiền muốn ứng"}
        </button>
        <div className="flex items-center justify-center gap-1.5 mt-2 text-muted-foreground text-xs">
          <Lock className="w-3 h-3" />
          <span>Bảo mật bằng OTP</span>
        </div>
      </div>
    </div>
  )
}
