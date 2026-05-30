"use client"

import { useState } from "react"
import { formatMoney } from "@/components/ungtienhang/money-display"
import { ArrowLeft, Lock, Check, Package, ChevronDown, ChevronUp } from "lucide-react"
import { pendingOrders, MIN_ORDERS, MIN_ADVANCE, ADVANCE_RATE } from "@/lib/ungtienhang/pending-orders"

interface QuickAdvanceScreenProps {
  onBack: () => void
  onConfirm: (amount: number) => void
}

const feeRate = 0.008

export function QuickAdvanceScreen({ onBack, onConfirm }: QuickAdvanceScreenProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [agreed, setAgreed] = useState(true)
  const [showAll, setShowAll] = useState(false)

  const visibleOrders = showAll ? pendingOrders : pendingOrders.slice(0, 5)

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleAll = () => {
    if (selected.size === pendingOrders.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(pendingOrders.map(o => o.id)))
    }
  }

  const selectedOrders = pendingOrders.filter(o => selected.has(o.id))
  const totalSelected = selectedOrders.reduce((s, o) => s + o.amount, 0)
  const advanceAmount = Math.round(totalSelected * ADVANCE_RATE)
  const fee = Math.round(advanceAmount * feeRate)
  const totalRepay = advanceAmount + fee

  const meetsMinOrders = selected.size >= MIN_ORDERS
  const meetsMinAmount = advanceAmount >= MIN_ADVANCE
  const canConfirm = agreed && meetsMinOrders && meetsMinAmount

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

      <main className="flex-1 px-4 py-4 space-y-4 pb-48">
        {/* Instruction */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-0.5">Chọn đơn hàng muốn ứng</h2>
          <p className="text-xs text-muted-foreground">
            Số tiền ứng = 60% giá trị mỗi đơn · Cần ít nhất {MIN_ORDERS} đơn và {formatMoney(MIN_ADVANCE)}
          </p>
        </div>

        {/* Select all row */}
        <div className="flex items-center justify-between py-2 border-b border-border">
          <button
            onClick={toggleAll}
            className="flex items-center gap-2 text-sm font-medium text-foreground"
          >
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              selected.size === pendingOrders.length
                ? "bg-primary border-primary"
                : selected.size > 0
                ? "bg-primary/30 border-primary"
                : "border-border bg-card"
            }`}>
              {selected.size > 0 && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </div>
            Chọn tất cả
          </button>
          <span className="text-xs text-muted-foreground">{selected.size}/{pendingOrders.length} đơn</span>
        </div>

        {/* Order list */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {visibleOrders.map((order, index) => {
            const isSelected = selected.has(order.id)
            return (
              <div key={order.id}>
                <button
                  onClick={() => toggle(order.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    isSelected ? "bg-primary/5" : "hover:bg-muted/40"
                  }`}
                >
                  {/* Checkbox */}
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected ? "bg-primary border-primary" : "border-border bg-card"
                  }`}>
                    {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>

                  {/* Icon */}
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 text-muted-foreground" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground font-mono">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.items} sản phẩm · {order.date}</p>
                  </div>

                  {/* Amount */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-foreground">
                      {(order.amount / 1000000).toFixed(2)}M
                    </p>
                    <p className="text-[11px] text-primary font-medium">
                      ứng {(order.amount * ADVANCE_RATE / 1000000).toFixed(2)}M
                    </p>
                  </div>
                </button>
                {index < visibleOrders.length - 1 && <div className="border-b border-border mx-4" />}
              </div>
            )
          })}

          {/* Show more / less */}
          {pendingOrders.length > 5 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full flex items-center justify-center gap-1 py-3 text-xs text-primary font-medium border-t border-border"
            >
              {showAll ? (
                <><ChevronUp className="w-3.5 h-3.5" /> Thu gọn</>
              ) : (
                <><ChevronDown className="w-3.5 h-3.5" /> Xem thêm {pendingOrders.length - 5} đơn</>
              )}
            </button>
          )}
        </div>

        {/* Requirement hints */}
        <div className="flex gap-3">
          <div className={`flex-1 rounded-xl px-3 py-2 text-xs text-center border ${
            meetsMinOrders ? "bg-success/10 border-success/30 text-success" : "bg-muted border-border text-muted-foreground"
          }`}>
            {selected.size}/{MIN_ORDERS} đơn tối thiểu
          </div>
          <div className={`flex-1 rounded-xl px-3 py-2 text-xs text-center border ${
            meetsMinAmount ? "bg-success/10 border-success/30 text-success" : "bg-muted border-border text-muted-foreground"
          }`}>
            {formatMoney(MIN_ADVANCE)} tối thiểu
          </div>
        </div>

        {/* Summary */}
        {advanceAmount > 0 && (
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-foreground text-sm">Bạn sẽ nhận</h3>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Giá trị {selected.size} đơn</span>
                <span className="text-foreground">{formatMoney(totalSelected)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tiền ứng (60%)</span>
                <span className="font-semibold text-foreground">{formatMoney(advanceAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Phí dịch vụ (0.8%)</span>
                <span className="text-muted-foreground">{formatMoney(fee)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="text-sm font-medium text-foreground">Sẽ trừ từ TikTok Shop</span>
                <span className="font-bold text-foreground">{formatMoney(totalRepay)}</span>
              </div>
            </div>
            <div className="bg-muted/30 px-4 py-2">
              <p className="text-xs text-muted-foreground">Trừ tự động khi TikTok Shop giải ngân, dự kiến 5 ngày</p>
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

      {/* Sticky bottom */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border p-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
        <button
          onClick={() => onConfirm(advanceAmount)}
          disabled={!canConfirm}
          className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-white font-semibold py-4 rounded-xl transition-colors"
        >
          {canConfirm
            ? `Ứng ${formatMoney(advanceAmount)} từ ${selected.size} đơn`
            : !meetsMinOrders
            ? `Chọn thêm ${MIN_ORDERS - selected.size} đơn nữa`
            : !meetsMinAmount
            ? `Cần thêm ${formatMoney(MIN_ADVANCE - advanceAmount)}`
            : "Chọn đơn hàng"}
        </button>
        <div className="flex items-center justify-center gap-1.5 mt-2 text-muted-foreground text-xs">
          <Lock className="w-3 h-3" />
          <span>Bảo mật bằng OTP</span>
        </div>
      </div>
    </div>
  )
}
