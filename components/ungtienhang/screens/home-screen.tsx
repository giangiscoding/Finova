"use client"

import { MoneyDisplay } from "@/components/ungtienhang/money-display"
import { Bell, ChevronRight, Clock, User, Package } from "lucide-react"
import { pendingOrders, ADVANCE_RATE } from "@/lib/ungtienhang/pending-orders"

interface HomeScreenProps {
  onAdvanceNow: () => void
  advancedOrderIds?: string[]
}

const maxAdvanceAmount = 85500000
const totalPendingOrders = 248

export function HomeScreen({ onAdvanceNow, advancedOrderIds = [] }: HomeScreenProps) {
  const activePendingOrders = pendingOrders.filter(o => !advancedOrderIds.includes(o.id))
  const totalPending = activePendingOrders.reduce((s, o) => s + o.amount, 0)
  const availableNow = Math.round(totalPending * ADVANCE_RATE)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#0A5C2A] flex items-center justify-center shadow-sm">
            <span className="text-white font-black text-base leading-none" style={{fontStyle:"italic"}}>U</span>
          </div>
          <div>
            <p className="font-bold text-foreground text-sm leading-tight">Ungtienhang</p>
            <p className="text-[10px] text-muted-foreground leading-tight">TikTok Shop</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-soft">
            <User className="w-5 h-5 text-primary" />
          </button>
        </div>
      </header>

      <main className="px-4 py-4 space-y-6">
        {/* Hero Card */}
        <div className="bg-gradient-to-br from-[#00C853] to-[#047A32] rounded-2xl p-5 text-white">
          <div className="flex gap-3 mb-5">
            <div className="flex-1 bg-white/10 rounded-xl px-4 py-3">
              <p className="text-white/60 text-xs mb-1">Hạn mức tối đa</p>
              <MoneyDisplay amount={maxAdvanceAmount} variant="inline" className="text-white font-bold text-base block" />
              <p className="text-white/50 text-[10px] mt-0.5">{totalPendingOrders} đơn đã giao</p>
            </div>
            <div className="flex-1 bg-white/20 rounded-xl px-4 py-3 border border-white/30">
              <p className="text-white/80 text-xs mb-1">Khả dụng ngay</p>
              <MoneyDisplay amount={availableNow} variant="inline" className="text-white font-bold text-base block" />
              <p className="text-white/60 text-[10px] mt-0.5">60% × {activePendingOrders.length} đơn chờ về</p>
            </div>
          </div>

          <button
            onClick={onAdvanceNow}
            className="w-full bg-white hover:bg-white/90 text-[#00C853] font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            Ứng ngay
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center gap-1.5 mt-3 text-white/60 text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>Tiền về sau ~5 phút</span>
          </div>
        </div>

        {/* Pending Orders List */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground">
              Đơn đang chờ tiền về
            </h2>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {activePendingOrders.length} đơn · {(totalPending / 1000000).toFixed(1)}M
            </span>
          </div>

          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {activePendingOrders.map((order, index) => (
              <div key={order.id}>
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <Package className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground font-mono">{order.id}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.items} sản phẩm · đặt {order.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">
                      {(order.amount / 1000000).toFixed(2)}M
                    </p>
                    <p className="text-[11px] text-primary font-medium">về {order.expectedPay}</p>
                  </div>
                </div>
                {index < activePendingOrders.length - 1 && <div className="border-b border-border mx-4" />}
              </div>
            ))}

            {/* Footer total */}
            <div className="border-t border-border bg-muted/30 px-4 py-3 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Tổng tiền về</span>
              <span className="text-sm font-bold text-foreground">
                {(totalPending / 1000000).toFixed(1)} triệu
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
