"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type StatusCardProps = {
  label: string
  count: number
  bg: string
  text: string
  isActive: boolean
  onClick: () => void
}

export function StatusCard({
  label,
  count,
  bg,
  text,
  isActive,
  onClick,
}: StatusCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "relative cursor-pointer h-24 p-4 flex flex-col justify-between",
        "border-0 overflow-hidden transition-all duration-300",
        "hover:scale-[1.03] hover:shadow-xl cursor-grab active:cursor-grabbing",
        bg,
        isActive ? "ring-2 ring-white/30" : "opacity-95"
      )}
    >
      {/* 🔒 readability overlay (IMPORTANT FIX) */}
      <div className="absolute inset-0 bg-black/25" />

      {/* subtle light overlay for premium feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30" />

      {/* content */}
      <div className="relative flex flex-col justify-between h-full text-white">
        
        {/* top */}
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white drop-shadow-sm">
            {label}
          </h3>

          {isActive && (
            <Badge className="bg-white text-black text-[10px] px-2 py-0.5">
              <Check className={cn("h-3 w-3 mr-1", text)} />
              Active
            </Badge>
          )}
        </div>

        {/* bottom */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <p className="text-3xl font-bold text-white drop-shadow-md leading-none">
              {count}
            </p>
            <span className="text-[10px] text-white/80">
              Total
            </span>
          </div>

          <div
            className={cn(
              "h-2.5 w-2.5 rounded-full",
              isActive ? "bg-white" : "bg-white/40"
            )}
          />
        </div>
      </div>
    </Card>
  )
}