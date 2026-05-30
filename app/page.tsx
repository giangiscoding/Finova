"use client"

import { useState } from "react"
import { TabBar } from "@/components/ungtienhang/tab-bar"
import { HomeScreen } from "@/components/ungtienhang/screens/home-screen"
import { QuickAdvanceScreen } from "@/components/ungtienhang/screens/quick-advance-screen"
import { ConfirmOTPScreen } from "@/components/ungtienhang/screens/confirm-otp-screen"
import { SuccessScreen } from "@/components/ungtienhang/screens/success-screen"
import { MyAdvancesScreen, type Advance } from "@/components/ungtienhang/screens/my-advances-screen"
import { OnboardingScreen } from "@/components/ungtienhang/screens/onboarding-screen"
import { ProcessingScreen } from "@/components/ungtienhang/screens/processing-screen"

type Screen =
  | "onboarding"
  | "home"
  | "quick-advance"
  | "confirm-otp"
  | "processing"
  | "success"
  | "my-advances"
  | "profile"

type Tab = "home" | "advances" | "profile"

export default function UngtienhangApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("onboarding")
  const [advanceAmount, setAdvanceAmount] = useState(0)
  const [activeTab, setActiveTab] = useState<Tab>("home")
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [newAdvances, setNewAdvances] = useState<Advance[]>([])
  const [advancedOrderIds, setAdvancedOrderIds] = useState<string[]>([])

  const feeRate = 0.008
  const fee = Math.round(advanceAmount * feeRate)

  function makeAdvance(amount: number, orderIds: string[]): Advance {
    const now = new Date()
    const pad = (n: number) => String(n).padStart(2, "0")
    const fmt = (d: Date) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`
    const due = new Date(now); due.setDate(due.getDate() + 5)
    const seq = String(Math.floor(Math.random() * 900) + 100)
    const dateStr = `${String(now.getFullYear()).slice(2)}${pad(now.getMonth() + 1)}${pad(now.getDate())}`
    return {
      id: `TTH${dateStr}-${seq}`,
      amount,
      pendingAmount: Math.round(amount / 0.6),
      advanceDate: fmt(now),
      expectedPayDate: fmt(due),
      orderIds,
      paidOrderCount: 0,
      status: "active",
    }
  }

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    setCurrentScreen("home")
  }

  const handleAdvanceNow = () => {
    setCurrentScreen("quick-advance")
  }

  const [pendingSelectedIds, setPendingSelectedIds] = useState<string[]>([])

  const handleConfirmAdvance = (amount: number, selectedIds: string[]) => {
    setAdvanceAmount(amount)
    setPendingSelectedIds(selectedIds)
    setCurrentScreen("confirm-otp")
  }

  const handleOTPConfirm = () => {
    setNewAdvances(prev => [makeAdvance(advanceAmount, pendingSelectedIds), ...prev])
    setAdvancedOrderIds(prev => [...prev, ...pendingSelectedIds])
    setCurrentScreen("processing")
    setTimeout(() => setCurrentScreen("success"), 2800)
  }

  const handleViewAdvances = () => {
    setActiveTab("advances")
    setCurrentScreen("my-advances")
  }

  const handleGoHome = () => {
    setActiveTab("home")
    setCurrentScreen("home")
  }

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    if (tab === "home") setCurrentScreen("home")
    else if (tab === "advances") setCurrentScreen("my-advances")
    else if (tab === "profile") setCurrentScreen("profile")
  }

  // Show onboarding first
  if (showOnboarding) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-background">
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      </div>
    )
  }

  // Full screen flows (no tab bar)
  if (currentScreen === "quick-advance") {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-background">
        <QuickAdvanceScreen
          onBack={handleGoHome}
          onConfirm={handleConfirmAdvance}
          advancedOrderIds={advancedOrderIds}
        />
      </div>
    )
  }

  if (currentScreen === "processing") {
    return (
      <div className="max-w-md mx-auto min-h-screen">
        <ProcessingScreen />
      </div>
    )
  }

  if (currentScreen === "confirm-otp") {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-background">
        <ConfirmOTPScreen
          amount={advanceAmount}
          fee={fee}
          bankAccount="5678"
          bankName="Vietcombank"
          phoneLastDigits="1234"
          onBack={() => setCurrentScreen("quick-advance")}
          onConfirm={handleOTPConfirm}
        />
      </div>
    )
  }

  if (currentScreen === "success") {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-background">
        <SuccessScreen
          amount={advanceAmount}
          fee={fee}
          transactionId="UTH240530-001"
          bankAccount="5678"
          bankName="Vietcombank"
          onViewAdvances={handleViewAdvances}
          onGoHome={handleGoHome}
          onClose={handleGoHome}
        />
      </div>
    )
  }

  // Tab-based screens
  return (
    <div className="max-w-md mx-auto min-h-screen bg-background">
      {currentScreen === "home" && (
        <HomeScreen
          onAdvanceNow={handleAdvanceNow}
          advancedOrderIds={advancedOrderIds}
        />
      )}
      
      {currentScreen === "my-advances" && (
        <MyAdvancesScreen onNewAdvance={handleAdvanceNow} newAdvances={newAdvances} />
      )}

      {currentScreen === "profile" && (
        <div className="min-h-screen bg-background pb-24 flex items-center justify-center">
          <p className="text-muted-foreground">Tài khoản của tôi</p>
        </div>
      )}

      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
