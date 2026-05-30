"use client"

import { useState } from "react"
import { TabBar } from "@/components/ungtienhang/tab-bar"
import { HomeScreen } from "@/components/ungtienhang/screens/home-screen"
import { QuickAdvanceScreen } from "@/components/ungtienhang/screens/quick-advance-screen"
import { ConfirmOTPScreen } from "@/components/ungtienhang/screens/confirm-otp-screen"
import { SuccessScreen } from "@/components/ungtienhang/screens/success-screen"
import { MyAdvancesScreen } from "@/components/ungtienhang/screens/my-advances-screen"
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

  const feeRate = 0.008
  const fee = Math.round(advanceAmount * feeRate)

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    setCurrentScreen("home")
  }

  const handleAdvanceNow = () => {
    setCurrentScreen("quick-advance")
  }

  const handleConfirmAdvance = (amount: number) => {
    setAdvanceAmount(amount)
    setCurrentScreen("confirm-otp")
  }

  const handleOTPConfirm = () => {
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
        />
      )}
      
      {currentScreen === "my-advances" && (
        <MyAdvancesScreen onNewAdvance={handleAdvanceNow} />
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
