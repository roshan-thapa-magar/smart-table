"use client"

import React from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Utensils, Globe, ShoppingBag } from "lucide-react"
import { Button } from "../ui/button"

export default function TableOrderDetails() {
  const items = [
    { name: "Chicken Burger", qty: 2, price: 200 },
    { name: "Pizza", qty: 1, price: 500 },
    { name: "Cold Drink", qty: 3, price: 100 },
    { name: "French Fries", qty: 2, price: 150 },
    { name: "Momo", qty: 4, price: 120 },
    { name: "Coffee", qty: 2, price: 180 },
    { name: "Chicken Burger", qty: 2, price: 200 },
    { name: "Pizza", qty: 1, price: 500 },
    { name: "Cold Drink", qty: 3, price: 100 },
    { name: "French Fries", qty: 2, price: 150 },
    { name: "Momo", qty: 4, price: 120 },
    { name: "Coffee", qty: 2, price: 180 },
    { name: "Chicken Burger", qty: 2, price: 200 },
    { name: "Pizza", qty: 1, price: 500 },
    { name: "Cold Drink", qty: 3, price: 100 },
    { name: "French Fries", qty: 2, price: 150 },
    { name: "Momo", qty: 4, price: 120 },
    { name: "Coffee", qty: 2, price: 180 },
  ]

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="dine" className="w-full flex flex-col h-full">

        {/* TOP TABS */}
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="dine" className="flex gap-2 items-center">
            <Utensils size={16} />
            Dine In
          </TabsTrigger>

          <TabsTrigger value="online" className="flex gap-2 items-center">
            <Globe size={16} />
            Online
          </TabsTrigger>

          <TabsTrigger value="takeaway" className="flex gap-2 items-center">
            <ShoppingBag size={16} />
            Takeaway
          </TabsTrigger>
        </TabsList>

        {/* ================= DINE IN ================= */}
        <TabsContent value="dine" className="flex-1 min-h-0">
          <Card className="rounded-2xl h-full flex flex-col overflow-hidden">
            <CardContent className=" flex flex-col h-full min-h-0">

              {/* HEADER */}
              <div className="flex justify-between items-center mb-3 shrink-0">
                <h3 className="font-semibold text-lg">Table T-1</h3>
                <Badge>Active</Badge>
              </div>

              {/* TABLE AREA (ONLY SCROLLABLE) */}
              <div className="flex-1 min-h-0 border rounded-xl overflow-hidden px-4 pb-4">
                <div className="h-full overflow-y-auto hide-scrollbar">

                  <table className="w-full text-sm table-fixed">

                    {/* HEADER (STICKY) */}
                    <thead className="sticky top-0 bg-background z-10 border-b text-muted-foreground">
                      <tr>
                        <th className="text-left py-3 px-2 w-[40px]">SN</th>
                        <th className="text-left py-3 px-2">Item</th>
                        <th className="text-center py-3 px-2 w-[60px]">Qty</th>
                        <th className="text-right py-3 px-2 w-[80px]">Price</th>
                        <th className="text-right py-3 px-2 w-[80px]">Total</th>
                      </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                      {items.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b last:border-0 hover:bg-muted/40"
                        >
                          <td className="py-2 px-2">{index + 1}</td>
                          <td className="py-2 px-2">{item.name}</td>
                          <td className="text-center py-2 px-2">{item.qty}</td>
                          <td className="text-right py-2 px-2">{item.price}</td>
                          <td className="text-right py-2 px-2 font-medium">
                            {item.qty * item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              </div>

              {/* ================= SUMMARY (FIXED BOTTOM) ================= */}
              <div className="mt-4 border-t pt-3 space-y-2 text-sm shrink-0">

                <div className="flex justify-between">
                  <span>Sub Total</span>
                  <span>1200</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>120</span>
                </div>

                <div className="flex justify-between font-semibold text-base border-t pt-2">
                  <span>Total Amount</span>
                  <span>1220</span>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1">
                    Print Bill
                  </Button>

                  <Button variant="default" className="flex-1 bg-green-600 hover:bg-green-700">
                    Settle Bill
                  </Button>
                </div>
              </div>

            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}