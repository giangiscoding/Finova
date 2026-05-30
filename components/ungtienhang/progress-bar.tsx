import { cn } from "@/lib/utils"

type ProgressVariant = "success" | "warning" | "danger" | "primary"

interface ProgressBarProps {
  value: number // 0-100
  variant?: ProgressVariant
  className?: string
}

const variantStyles: Record<ProgressVariant, string> = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  primary: "bg-primary",
}

export function ProgressBar({ 
  value, 
  variant = "success", 
  className 
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value))
  
  return (
    <div className={cn("h-1 w-full rounded-full bg-border", className)}>
      <div 
        className={cn("h-full rounded-full transition-all duration-300", variantStyles[variant])}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  )
}
