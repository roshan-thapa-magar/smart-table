"use client"

import * as React from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type ViewOrderProps = {
    isOpen: boolean
    onClose: () => void
    title?: string
    description?: string
    order?: any
}

export default function ViewOrder({
    isOpen,
    onClose,
    title = "Order Details",
    description,
    order,
}: ViewOrderProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl rounded-2xl">
                {/* Header */}
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        {title}
                    </DialogTitle>
                    {description && (
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>

                {/* Order Info */}
                <div className="space-y-4 mt-4">
                    {/* Order Meta */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-sm font-medium">
                                Order #1024
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                10 Apr 2026 • 10:20 AM
                            </p>
                        </div>

                        <Badge>Pending</Badge>
                    </div>

                    {/* Table Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-3 rounded-xl border bg-muted/30">
                            <p className="text-muted-foreground text-xs">Table</p>
                            <p className="font-medium">T5 • VIP</p>
                        </div>

                        <div className="p-3 rounded-xl border bg-muted/30">
                            <p className="text-muted-foreground text-xs">Order Type</p>
                            <p className="font-medium">Dine In</p>
                        </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold">Items</h3>

                        <div className="border rounded-xl divide-y">
                            <div className="flex justify-between p-3 text-sm">
                                <span>Chicken Burger × 2</span>
                                <span>Rs 500</span>
                            </div>

                            <div className="flex justify-between p-3 text-sm">
                                <span>Coke × 1</span>
                                <span>Rs 100</span>
                            </div>
                        </div>
                    </div>

                    {/* Note */}
                    <div className="text-sm">
                        <p className="text-muted-foreground text-xs mb-1">
                            Special Note
                        </p>
                        <p className="p-3 rounded-xl border bg-muted/30">
                            Extra spicy, no onions
                        </p>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center pt-2 border-t">
                        <span className="font-medium">Total</span>
                        <span className="font-semibold">Rs 600</span>
                    </div>
                </div>

                {/* Footer */}
                <DialogFooter className="mt-6 flex gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>

                    <Button>
                        Print Order
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}