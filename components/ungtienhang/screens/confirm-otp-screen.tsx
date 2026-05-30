"use client"

import { useState } from "react"
import { OTPInput } from "@/components/ungtienhang/otp-input"
import { formatMoney } from "@/components/ungtienhang/money-display"
import { ArrowLeft, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react"

interface ConfirmOTPScreenProps {
  amount: number
  fee: number
  bankAccount: string
  bankName: string
  phoneLastDigits: string
  onBack: () => void
  onConfirm: (otp: string) => void
}

export function ConfirmOTPScreen({ 
  amount, 
  fee, 
  bankAccount, 
  bankName,
  phoneLastDigits,
  onBack, 
  onConfirm 
}: ConfirmOTPScreenProps) {
  const [otp, setOtp] = useState("")
  const [countdown, setCountdown] = useState(45)
  const [showDetails, setShowDetails] = useState(false)

  const handleOTPComplete = (value: string) => {
    setOtp(value)
  }

  const handleConfirm = () => {
    if (otp.length === 6) {
      onConfirm(otp)
    }
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
        <h1 className="text-lg font-semibold text-foreground">Xác nhận</h1>
      </header>

      <main className="flex-1 px-4 py-8 flex flex-col items-center">
        {/* Shield Icon */}
        <div className="w-16 h-16 rounded-full bg-primary-soft flex items-center justify-center mb-6">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-foreground mb-2">Nhập mã OTP</h2>
        <p className="text-sm text-muted-foreground mb-8">
          Mã đã gửi đến số ***{phoneLastDigits}
        </p>

        {/* OTP Input */}
        <OTPInput 
          onComplete={handleOTPComplete}
          className="mb-6"
        />

        {/* Resend Link */}
        <button 
          disabled={countdown > 0}
          className={`text-sm ${countdown > 0 ? "text-muted-foreground" : "text-primary font-medium"}`}
        >
          {countdown > 0 ? `Gửi lại mã (${countdown}s)` : "Gửi lại mã"}
        </button>

        {/* Transaction Summary - Collapsible */}
        <div className="w-full mt-8">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between py-3 text-sm text-muted-foreground"
          >
            <span>Xem chi tiết giao dịch</span>
            {showDetails ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          
          {showDetails && (
            <div className="bg-card rounded-xl border border-border p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ứng</span>
                <span className="font-medium text-foreground">{formatMoney(amount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Phí</span>
                <span className="text-muted-foreground">{formatMoney(fee)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Về tài khoản</span>
                <span className="text-muted-foreground">***{bankAccount} ({bankName})</span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Fixed Bottom CTA */}
      <div className="sticky bottom-0 bg-card border-t border-border p-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
        <button
          onClick={handleConfirm}
          disabled={otp.length !== 6}
          className="w-full bg-accent hover:bg-accent/90 disabled:bg-muted disabled:text-muted-foreground text-white font-semibold py-4 rounded-xl transition-colors"
        >
          Xác nhận
        </button>
      </div>
    </div>
  )
}
