"use client"

import { useRef, useState, KeyboardEvent, ClipboardEvent } from "react"
import { cn } from "@/lib/utils"

interface OTPInputProps {
  length?: number
  onComplete: (otp: string) => void
  className?: string
}

export function OTPInput({ length = 6, onComplete, className }: OTPInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newValues = [...values]
    newValues[index] = value.slice(-1)
    setValues(newValues)

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    const otp = newValues.join("")
    if (otp.length === length) {
      onComplete(otp)
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, length)
    if (!/^\d+$/.test(pastedData)) return

    const newValues = [...values]
    pastedData.split("").forEach((char, i) => {
      if (i < length) newValues[i] = char
    })
    setValues(newValues)

    const otp = newValues.join("")
    if (otp.length === length) {
      onComplete(otp)
    }
  }

  return (
    <div className={cn("flex gap-3 justify-center", className)}>
      {values.map((value, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={cn(
            "w-12 h-14 text-center text-xl font-semibold rounded-xl border-2 outline-none transition-colors",
            value ? "border-primary bg-primary-soft" : "border-border bg-card",
            "focus:border-primary focus:bg-primary-soft"
          )}
        />
      ))}
    </div>
  )
}
