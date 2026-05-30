"use client"

import { cn } from "@/lib/utils"

interface MoneyDisplayProps {
  amount: number
  variant?: "hero" | "large" | "inline"
  className?: string
  showCurrency?: boolean
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("vi-VN").format(amount) + "đ"
}

export function MoneyDisplay({ 
  amount, 
  variant = "inline", 
  className,
  showCurrency = true
}: MoneyDisplayProps) {
  const formatted = showCurrency 
    ? formatMoney(amount) 
    : new Intl.NumberFormat("vi-VN").format(amount)

  const variantStyles = {
    hero: "text-[40px] font-bold leading-tight",
    large: "text-[32px] font-bold leading-tight",
    inline: "text-[15px] font-semibold",
  }

  return (
    <span className={cn(variantStyles[variant], className)}>
      {formatted}
    </span>
  )
}
