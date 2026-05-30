"use client"

import { MoneyDisplay } from "@/components/ungtienhang/money-display"
import { StatusBadge } from "@/components/ungtienhang/status-badge"
import { Plus, ChevronDown, CalendarDays } from "lucide-react"
import { useState } from "react"

export interface Advance {
  id: string
  amount: number
  pendingAmount: number
  advanceDate: string
  expectedPayDate: string
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
    status: "warning",
  },
  {
    id: "TTH240527-007",
    amount: 7200000,
    pendingAmount: 12000000,
    advanceDate: "27/05/2026",
    expectedPayDate: "03/06/2026",
    status: "active",
  },
  {
    id: "TTH240529-011",
    amount: 4800000,
    pendingAmount: 8000000,
    advanceDate: "29/05/2026",
    expectedPayDate: "06/06/2026",
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
    status: "completed",
  },
  {
    id: "TTH240512-008",
    amount: 3500000,
    pendingAmount: 0,
    advanceDate: "12/05/2026",
    expectedPayDate: "17/05/2026",
    status: "completed",
  },
]

export function MyAdvancesScreen({ onNewAdvance, newAdvances = [] }: MyAdvancesScreenProps) {
  const [showCompleted, setShowCompleted] = useState(false)

  const allActive = [...newAdvances, ...activeAdvances]
  const totalActive = allActive.reduce((sum, a) => sum + a.amount, 0)
  const warningCount = allActive.filter(a => a.status === "warning").length

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#0A5C2A] flex items-center justify-center shadow-sm">
            <span className="text-white font-black text-base leading-none" style={{fontStyle:"italic"}}>U</span>
          </div>
          <h1 className="text-base font-semibold text-foreground">Khoản ứng của tôi</h1>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#0A1F14] flex items-center justify-center">
          <span className="text-white text-xs font-bold">N</span>
        </div>
      </header>

      <main className="px-4 py-4 space-y-6">
        {/* Summary Card */}
        <div className="bg-primary-soft rounded-2xl p-5">
          <p className="text-sm text-primary/70 mb-1">Tổng đang ứng</p>
          <MoneyDisplay
            amount={totalActive}
            variant="large"
            className="text-foreground block mb-4"
          />
          <div className="flex gap-6">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Đang hoạt động</p>
              <p className="text-sm font-semibold text-foreground">{activeAdvances.length} khoản</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Sắp đến hạn</p>
              <p className="text-sm font-semibold text-warning">{warningCount} khoản</p>
            </div>
          </div>
        </div>

        {/* Active Advances */}
        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">Đang hoạt động</h2>
          <div className="space-y-3">
            {allActive.map((advance) => (
              <div
                key={advance.id}
                className={`bg-card rounded-2xl border overflow-hidden ${
                  advance.status === "warning"
                    ? "border-l-4 border-l-warning border-t-border border-r-border border-b-border"
                    : "border-border"
                }`}
              >
                <div className="p-4">
                  {/* Row 1: ID */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="w-5 h-5 rounded bg-[#0A5C2A] flex items-center justify-center">
                      <span className="text-white font-black text-[9px]">U</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">#{advance.id}</span>
                  </div>

                  {/* Row 2: Amount */}
                  <MoneyDisplay
                    amount={advance.amount}
                    variant="inline"
                    className="text-xl font-bold text-foreground block mb-3"
                  />

                  {/* Row 3: Expected pay date */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>Dự kiến TikTok Shop giải ngân: <span className="font-medium text-foreground">{advance.expectedPayDate}</span></span>
                  </div>

                  {/* Row 5: Platform note */}
                  <p className="text-xs text-muted-foreground">
                    Tự động trừ từ TikTok Shop – {(advance.pendingAmount / 1000000).toFixed(0)}M chờ giải ngân
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Completed */}
        <section>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center justify-between w-full py-3 text-base font-semibold text-foreground"
          >
            <span>Đã hoàn tất ({completedAdvances.length})</span>
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground transition-transform ${showCompleted ? "rotate-180" : ""}`}
            />
          </button>

          {showCompleted && (
            <div className="space-y-3">
              {completedAdvances.map((advance) => (
                <div
                  key={advance.id}
                  className="bg-card rounded-2xl border border-border p-4 opacity-60"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded bg-[#0A5C2A] flex items-center justify-center">
                        <span className="text-white font-black text-[9px]">U</span>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">#{advance.id}</span>
                    </div>
                    <StatusBadge variant="muted">Đã xong</StatusBadge>
                  </div>

                  <MoneyDisplay
                    amount={advance.amount}
                    variant="inline"
                    className="text-lg font-semibold text-muted-foreground block mb-2"
                  />

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>Giải ngân: {advance.expectedPayDate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* FAB */}
      <button
        onClick={onNewAdvance}
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg flex items-center justify-center transition-colors"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  )
}
