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
import DineIn from "./dine-in"
import Online from "./online"

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
          <DineIn />
        </TabsContent>

        <TabsContent value="online" className="flex-1 min-h-0">
          <Online/>
        </TabsContent>

        <TabsContent value="takeaway" className="flex-1 min-h-0">
          <DineIn />
        </TabsContent>


      </Tabs>
    </div>
  )
}