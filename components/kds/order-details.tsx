"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { DeleteDialog } from "../delete-dialog"
import ViewOrder from "./view-order"

export default function OrderDisplay() {
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [viewOrder, setViewOrder] = useState(false)
    return (
        <Card
            className="
            relative overflow-hidden rounded-2xl
            border-0
            bg-gradient-to-br from-background via-background to-muted/30
            shadow-sm
            transition-all duration-300 ease-out
            hover:-translate-y-1 hover:shadow-2xl
            hover:scale-[1.01]
            cursor-grab active:cursor-grabbing
            
        "
        >
            {/* subtle glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-black/5 pointer-events-none" />

            {/* Time Badge */}
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[11px] px-3 py-1 font-medium rounded-bl-xl shadow-sm">
                10:20 M
            </div>

            {/* Order Type Badge */}
            <div className="absolute top-0 left-0 bg-primary/90 text-primary-foreground text-[11px] px-3 py-1 font-medium rounded-br-xl shadow-sm">
                Dine
            </div>

            {/* Table Badge */}
            <div className="absolute bottom-0 left-0 bg-foreground text-background text-[11px] px-3 py-1 font-medium rounded-tr-xl shadow-md">
                T5 • VIP
            </div>

            <CardContent className="relative p-5 space-y-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="space-y-0.5">
                        <h2 className="text-lg font-semibold tracking-tight">
                            Order #1024
                        </h2>

                        {/* DATE + TIME (BEST PLACE) */}
                        <p className="text-xs text-muted-foreground">
                            10 Apr 2026 • 10:20 AM
                        </p>
                    </div>

                    <Badge
                        variant="secondary"
                        className="text-xs px-2 py-1"
                    >
                        Pending
                    </Badge>
                </div>

                {/* Info */}
                <div className="text-sm text-muted-foreground leading-relaxed">
                    Order Special Info
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Actions */}
                <div className="flex flex-wrap gap-2 justify-end">
                    {/* <Button
                        variant="outline"
                        size="sm"
                        className="transition-all duration-200 hover:scale-105 hover:bg-muted "
                    >
                        Print
                    </Button> */}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={(() => setViewOrder(true))}
                        className="transition-all duration-200 hover:scale-105 hover:bg-muted"
                    >
                        View
                    </Button>

                    <Button
                        size="sm"
                        onClick={() => setDeleteOpen(true)}
                        className="
                        gap-1
                        transition-all duration-200
                        hover:scale-105 hover:shadow-md 
                    "
                    >
                        Accept
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>
                <DeleteDialog
                    isOpen={deleteOpen}
                    isDangerous={false}
                    isLoading={false}
                    title="Accept Order?"
                    description="Do you want to move this order to Preparing?"
                    confirmText="Yes"
                    onConfirm={() => setDeleteOpen(false)}
                    onCancel={() => setDeleteOpen(false)}
                />
                <ViewOrder
                    isOpen={viewOrder}
                    onClose={() => setViewOrder(false)}
                />
            </CardContent>
        </Card>
    )
}