import { cn } from "@/lib/utils"

type BadgeVariant = "success" | "warning" | "danger" | "muted"

interface StatusBadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
  muted: "bg-muted text-muted-foreground",
}

export function StatusBadge({ 
  children, 
  variant = "muted", 
  className 
}: StatusBadgeProps) {
  return (
    <span 
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
