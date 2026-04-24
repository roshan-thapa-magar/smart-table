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
import FormBuilder, { FormField } from "@/components/form-builder";
import { Input } from "../ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Label } from "@/components/ui/label"

const billFields: FormField[] = [
  {
    name: "categoryName",
    label: "Category Name",
    placeholder: "Enter category name",
    type: "text",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },
    ],
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter category description",
    type: "textarea",
  },
  {
    name: "image",
    label: "Category Image",
    type: "image",
  },
];
export default function TableOrderDetails() {
  const items = [
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
        <TabsList className="grid w-full grid-cols-3 mb-3 bg-muted p-1 rounded-xl">
          <TabsTrigger value="dine" className="flex gap-2 items-center rounded-lg">
            <Utensils size={16} />
            Dine In
          </TabsTrigger>

          <TabsTrigger value="online" className="flex gap-2 items-center rounded-lg">
            <Globe size={16} />
            Online
          </TabsTrigger>

          <TabsTrigger value="takeaway" className="flex gap-2 items-center rounded-lg">
            <ShoppingBag size={16} />
            Takeaway
          </TabsTrigger>
        </TabsList>

        {/* ================= DINE IN ================= */}
        <TabsContent value="dine" className="flex-1 min-h-0">
          <Card className="rounded-2xl h-full flex flex-col shadow-sm border">
            <CardContent className="flex flex-col h-full min-h-0">

              {/* HEADER */}
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="font-semibold text-lg">Table T-1</h3>
                  <p className="text-xs text-muted-foreground">
                    2 Guests • 45 mins
                  </p>
                </div>

                <Badge className="bg-green-100 text-green-700 border-0">
                  Active
                </Badge>
              </div>

              {/* TABLE AREA */}
              <div className="flex-1 min-h-0 border rounded-xl overflow-hidden bg-muted/20">
                <div className="h-full overflow-y-auto">

                  <table className="w-full text-sm">

                    {/* HEADER */}
                    <thead className="sticky top-0 bg-background border-b text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th className="text-left py-3 px-3 w-[40px]">#</th>
                        <th className="text-left py-3 px-3">Item</th>
                        <th className="text-center py-3 px-3 w-[60px]">Qty</th>
                        <th className="text-right py-3 px-3 w-[80px]">Price</th>
                        <th className="text-right py-3 px-3 w-[90px]">Total</th>
                      </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                      {items.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b last:border-0 hover:bg-muted/40 transition"
                        >
                          <td className="py-3 px-3 text-muted-foreground">
                            {index + 1}
                          </td>

                          <td className="py-3 px-3 font-medium">
                            {item.name}
                          </td>

                          <td className="text-center py-3 px-3">
                            <span className="px-2 py-1 text-xs rounded-md bg-muted">
                              {item.qty}
                            </span>
                          </td>

                          <td className="text-right py-3 px-3 text-muted-foreground">
                            Rs {item.price}
                          </td>

                          <td className="text-right py-3 px-3 font-semibold">
                            Rs {item.qty * item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-2 space-y-2 text-sm">

                {/* SUMMARY */}
                <div className="border rounded-lg p-2 bg-muted/20 space-y-1">

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sub Total</span>
                    <span>Rs 1200</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>Rs 120</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Discount</span>
                    <div className="flex items-center gap-2">
                      <Input className="w-14 h-7 text-xs" type="number" placeholder="0" />
                      <span>Rs 120</span>
                    </div>
                  </div>

                  <div className="border-t pt-1 flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-green-600">Rs 1320</span>
                  </div>

                </div>

                {/* PAYMENT */}
                <div className="border rounded-lg p-2">
                  <div className="flex justify-between gap-2 text-xs">

                    {["Cash", "Card", "UPI", "Other"].map((label) => (
                      <label key={label} className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          className="accent-green-600"
                        />
                        {label}
                      </label>
                    ))}

                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 h-8 text-xs">
                    🖨️ Print
                  </Button>
                  <Button className="flex-1 h-8 bg-green-600 text-xs">
                    ✓ Settle
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