"use client"

import { formatMoney } from "@/components/ungtienhang/money-display"
import { CheckCircle2, X, ArrowRight, Info } from "lucide-react"

interface SuccessScreenProps {
  amount: number
  fee: number
  transactionId: string
  bankAccount: string
  bankName: string
  onViewAdvances: () => void
  onGoHome: () => void
  onClose: () => void
}

function addDays(date: Date, days: number): string {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`
}

export function SuccessScreen({
  amount,
  fee,
  transactionId,
  bankAccount,
  bankName,
  onViewAdvances,
  onGoHome,
  onClose,
}: SuccessScreenProps) {
  const totalRepay = amount + fee
  const today = new Date()
  const estimatedFrom = addDays(today, 3)
  const estimatedTo = addDays(today, 7)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Close */}
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <main className="flex-1 px-4 flex flex-col items-center justify-center -mt-10">
        {/* Success icon */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center animate-pulse">
            <CheckCircle2 className="w-16 h-16 text-success" />
          </div>
          <div className="absolute -top-2 -left-2 w-3 h-3 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0s" }} />
          <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-warning animate-bounce" style={{ animationDelay: "0.1s" }} />
          <div className="absolute top-4 -right-3 w-2.5 h-2.5 rounded-full bg-success animate-bounce" style={{ animationDelay: "0.2s" }} />
          <div className="absolute bottom-2 -left-4 w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.3s" }} />
        </div>

        <h1 className="text-[28px] font-bold text-foreground mb-2 text-center">
          Đã chuyển {formatMoney(amount)}
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-8">
          Tiền sẽ về {bankName} ***{bankAccount} trong ~5 phút
        </p>

        {/* Detail card */}
        <div className="w-full bg-card rounded-2xl border border-border overflow-hidden mb-4">
          <div className="p-4 space-y-3">
            <h3 className="font-semibold text-foreground text-sm">Chi tiết khoản ứng</h3>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Mã giao dịch</span>
              <span className="font-mono text-foreground">{transactionId}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Phí dịch vụ</span>
              <span className="text-muted-foreground">{formatMoney(fee)}</span>
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-foreground">Tổng phải trả</span>
                <span className="font-bold text-foreground">{formatMoney(totalRepay)}</span>
              </div>
            </div>
          </div>

          {/* Estimated payout row */}
          <div className="border-t border-border bg-muted/30 px-4 py-3">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">
                  Ước tính TikTok Shop giải ngân:{" "}
                  <span className="font-semibold text-foreground">
                    {estimatedFrom} – {estimatedTo}
                  </span>
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Phụ thuộc vào chu kỳ thanh toán của sàn, có thể sớm hoặc muộn hơn
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Auto deduct note */}
        <div className="w-full bg-primary-soft rounded-xl px-4 py-3 flex gap-3">
          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
            <CheckCircle2 className="w-3 h-3 text-white" />
          </div>
          <p className="text-sm text-primary">
            Chúng tôi sẽ tự động trừ từ tiền sàn – bạn không cần làm gì thêm
          </p>
        </div>
      </main>

      {/* CTAs */}
      <div className="p-4 pb-[calc(16px+env(safe-area-inset-bottom))] space-y-3">
        <button
          onClick={onViewAdvances}
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          Xem trong app
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={onGoHome}
          className="w-full border border-border hover:bg-muted text-foreground font-semibold py-4 rounded-xl transition-colors"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  )
}
