import { cn } from "@/lib/utils"

type ShopType = "shopee" | "tiktok" | "lazada" | "tiki"

interface ShopChipProps {
  shop: ShopType
  className?: string
}

const shopConfig: Record<ShopType, { name: string; color: string; bgColor: string }> = {
  shopee: { name: "Shopee", color: "#EE4D2D", bgColor: "#FEF0ED" },
  tiktok: { name: "TikTok Shop", color: "#000000", bgColor: "#F0F0F0" },
  lazada: { name: "Lazada", color: "#0F146D", bgColor: "#EEEEF8" },
  tiki: { name: "Tiki", color: "#1A94FF", bgColor: "#E8F4FF" },
}

export function ShopChip({ shop, className }: ShopChipProps) {
  const config = shopConfig[shop]
  
  return (
    <span 
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium",
        className
      )}
      style={{ backgroundColor: config.bgColor, color: config.color }}
    >
      {config.name}
    </span>
  )
}
