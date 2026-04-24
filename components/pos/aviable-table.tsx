"use client"

import React from "react"
import { TABLE_STATUS } from "@/constants/table-status"

// generate 40 tables
const tables = Array.from({ length: 100 }, (_, i) => {
  const statuses = ["blank", "new", "preparing", "ready", "served", "billing"]

  return {
    id: i + 1,
    name: `T-${i + 1}`,
    status: statuses[i % statuses.length],
  }
})

export default function AviableTable() {
  return (
    <div className="grid custom-grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 2xl:grid-cols-8 gap-4 p-2 ">
      {tables.map((table) => {
        const status =
          TABLE_STATUS[table.status as keyof typeof TABLE_STATUS]

        return (
          <div
            key={table.id}
            className={`
              aspect-square
              flex flex-col items-center justify-center
              rounded-xl border shadow-sm
              cursor-pointer transition
              hover:scale-[1.03]
              active:scale-95
              ${status.className}
            `}
          >
            <span className="text-lg font-bold">{table.name}</span>
            <span className="text-xs mt-1 opacity-80">
              {status.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}