"use client"

import React, { useState } from "react"
import { StatusCard } from "@/components/kds/status-card"
import OrderDisplay from "@/components/kds/order-details"

const statuses = [
  {
    key: "pending",
    label: "Pending Order",
    count: 4,
    bg: "bg-yellow-500",
    text: "text-yellow-500",
  },
  {
    key: "preparing",
    label: "Preparing Order",
    count: 5,
    bg: "bg-blue-500",
    text: "text-blue-500",
  },
  {
    key: "ready",
    label: "Ready & Serve",
    count: 10,
    bg: "bg-purple-500",
    text: "text-purple-500",
  },
  {
    key: "cancel",
    label: "Cancel Order",
    count: 9,
    bg: "bg-red-500",
    text: "text-red-500",
  },
  {
    key: "complete",
    label: "Complete Order",
    count: 5,
    bg: "bg-green-500",
    text: "text-green-500",
  },
]

export default function Page() {
  const [active, setActive] = useState("pending")

  return (
    <div className="overflow-y-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {statuses.map((status) => (
          <StatusCard
            key={status.key}
            label={status.label}
            count={status.count}
            bg={status.bg}
            text={status.text}
            isActive={active === status.key}
            onClick={() => setActive(status.key)}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-3 mt-4">
        <OrderDisplay/>
      </div>
    </div>
  )
}