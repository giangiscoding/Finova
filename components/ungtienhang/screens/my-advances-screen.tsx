"use client"

import { MoneyDisplay } from "@/components/ungtienhang/money-display"
import { StatusBadge } from "@/components/ungtienhang/status-badge"
import { Plus, ChevronDown, ChevronUp, CalendarDays, Package } from "lucide-react"
import { useState } from "react"
import { pendingOrders } from "@/lib/ungtienhang/pending-orders"

export interface Advance {
  id: string
  amount: number
  pendingAmount: number
  advanceDate: string
  expectedPayDate: string
  orderIds: string[]
  paidOrderCount?: number
  status: "active" | "warning" | "completed"
}

interface MyAdvancesScreenProps {
  onNewAdvance: () => void
  newAdvances?: Advance[]
}

const activeAdvances: Advance[] = [
  {
    id: "TTH240526-003",
    amount: 5400000,
    pendingAmount: 9000000,
    advanceDate: "26/05/2026",
    expectedPayDate: "01/06/2026",
    orderIds: ["TT-8821043", "TT-8819204", "TT-8817651", "TT-8815980", "TT-8814372"],
    paidOrderCount: 2,
    status: "warning",
  },
  {
    id: "TTH240527-007",
    amount: 7200000,
    pendingAmount: 12000000,
    advanceDate: "27/05/2026",
    expectedPayDate: "03/06/2026",
    orderIds: ["TT-8812045", "TT-8810931", "TT-8808764", "TT-8806512", "TT-8804291"],
    paidOrderCount: 0,
    status: "active",
  },
  {
    id: "TTH240529-011",
    amount: 4800000,
    pendingAmount: 8000000,
    advanceDate: "29/05/2026",
    expectedPayDate: "06/06/2026",
    orderIds: ["TT-8821043", "TT-8817651", "TT-8815980", "TT-8814372", "TT-8812045"],
    paidOrderCount: 0,
    status: "active",
  },
]

const completedAdvances: Advance[] = [
  {
    id: "TTH240520-001",
    amount: 6000000,
    pendingAmount: 0,
    advanceDate: "20/05/2026",
    expectedPayDate: "25/05/2026",
    orderIds: ["TT-8808764", "TT-8806512", "TT-8804291", "TT-8810931", "TT-8812045"],
    paidOrderCount: 5,
    status: "completed",
  },
  {
    id: "TTH240512-008",
    amount: 3500000,
    pendingAmount: 0,
    advanceDate: "12/05/2026",
    expectedPayDate: "17/05/2026",
    orderIds: ["TT-8819204", "TT-8817651", "TT-8815980", "TT-8814372", "TT-8821043"],
    paidOrderCount: 5,
    status: "completed",
  },
]

function AdvanceCard({ advance }: { advance: Advance }) {
  const [expanded, setExpanded] = useState(false)

  const orderDetails = advance.orderIds.map(id => {
    const found = pendingOrders.find(o => o.id === id)
    return found ?? { id, amount: 0, date: "—", expectedPay: "—", items: 0 }
  })

  const paid = advance.paidOrderCount ?? 0
  const total = advance.orderIds.length

  // Tính số tiền đã thu và còn lại dựa trên đơn đã giải ngân
  const paidAmount = orderDetails
    .slice(0, paid)
    .reduce((s, o) => s + Math.round(o.amount * 0.6), 0)
  const remaining = paid >= total ? 0 : advance.amount - paidAmount

  return (
    <div className={`bg-card rounded-2xl border overflow-hidden ${
      advance.status === "warning"
        ? "border-l-4 border-l-warning border-t-border border-r-border border-b-border"
        : "border-border"
    }`}>
      {/* Clickable header */}
      <button
        className="w-full text-left p-4"
        onClick={() => setExpanded(v => !v)}
      >
        {/* Row 1: ID */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded bg-[#0A5C2A] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-[9px]">U</span>
            </div>
            <span className="text-xs text-muted-foreground font-mono">#{advance.id}</span>
          </div>
          {expanded
            ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
            : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>

        {/* Row 2: Amount + remaining */}
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-[11px] text-muted-foreground mb-0.5">Ban đầu ứng</p>
            <MoneyDisplay
              amount={advance.amount}
              variant="inline"
              className="text-xl font-bold text-foreground"
            />
          </div>
          {remaining > 0 ? (
            <div className="text-right">
              <p className="text-[11px] text-muted-foreground mb-0.5">Còn lại</p>
              <p className="text-base font-bold text-warning">{(remaining / 1000000).toFixed(2)}M</p>
            </div>
          ) : (
            <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">Đã thu hết</span>
          )}
        </div>

        {/* Row 3: Orders paid status */}
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            paid === total
              ? "bg-success/10 text-success"
              : paid > 0
              ? "bg-warning/10 text-warning"
              : "bg-muted text-muted-foreground"
          }`}>
            {paid}/{total} đơn đã giải ngân
          </span>
          <span className="text-xs text-muted-foreground">· Ứng {advance.advanceDate}</span>
        </div>
      </button>

      {/* Expanded: order list + payout date */}
      {expanded && (
        <div className="border-t border-border">
          {/* Order list */}
          <div className="px-4 pt-3 pb-2 space-y-0">
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
              Đơn hàng được ứng
            </p>
            {orderDetails.map((order, i) => {
              const isPaid = i < paid
              return (
                <div key={order.id} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                  <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Package className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground font-mono">{order.id}</p>
                    <p className="text-[11px] text-muted-foreground">{order.items} sản phẩm · {order.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-semibold text-foreground">{(order.amount / 1000000).toFixed(2)}M</p>
                    <span className={`text-[10px] font-medium ${isPaid ? "text-success" : "text-muted-foreground"}`}>
                      {isPaid ? "Đã giải ngân" : `về ${order.expectedPay}`}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Payout date */}
          <div className="px-4 py-3 bg-muted/30 flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Dự kiến TikTok Shop giải ngân hết:{" "}
              <span className="font-semibold text-foreground">{advance.expectedPayDate}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export function MyAdvancesScreen({ onNewAdvance, newAdvances = [] }: MyAdvancesScreenProps) {
  const [showCompleted, setShowCompleted] = useState(false)

  const allActive = [...newAdvances, ...activeAdvances]
  const totalActive = allActive.reduce((sum, a) => sum + a.amount, 0)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#0A5C2A] flex items-center justify-center shadow-sm">
            <span className="text-white font-black text-base leading-none" style={{ fontStyle: "italic" }}>U</span>
          </div>
          <h1 className="text-base font-semibold text-foreground">Khoản ứng của tôi</h1>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#0A1F14] flex items-center justify-center">
          <span className="text-white text-xs font-bold">N</span>
        </div>
      </header>

      <main className="px-4 py-4 space-y-6">
        {/* Summary */}
        <div className="bg-primary-soft rounded-2xl p-5">
          <p className="text-sm text-primary/70 mb-1">Tổng đang ứng</p>
          <MoneyDisplay amount={totalActive} variant="large" className="text-foreground block mb-4" />
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Đang hoạt động</p>
            <p className="text-sm font-semibold text-foreground">{allActive.length} khoản</p>
          </div>
        </div>

        {/* Active */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">Đang hoạt động</h2>
          <div className="space-y-3">
            {allActive.map(a => <AdvanceCard key={a.id} advance={a} />)}
          </div>
        </section>

        {/* Completed */}
        <section>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center justify-between w-full py-3 text-base font-semibold text-foreground"
          >
            <span>Đã hoàn tất ({completedAdvances.length})</span>
            <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${showCompleted ? "rotate-180" : ""}`} />
          </button>

          {showCompleted && (
            <div className="space-y-3">
              {completedAdvances.map(a => <AdvanceCard key={a.id} advance={a} />)}
            </div>
          )}
        </section>
      </main>

      <button
        onClick={onNewAdvance}
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg flex items-center justify-center transition-colors"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  )
}
