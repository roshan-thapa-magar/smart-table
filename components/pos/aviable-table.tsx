"use client"

import React from "react"
import { TABLE_STATUS } from "@/constants/table-status"

const tables = [
  { id: 1, name: "T-1", status: "blank" },
  { id: 2, name: "T-2", status: "new" },
  { id: 3, name: "T-3", status: "preparing" },
  { id: 4, name: "T-4", status: "ready" },
  { id: 5, name: "T-5", status: "served" },
  { id: 6, name: "T-6", status: "billing" },
  { id: 7, name: "T-7", status: "new" },
  { id: 8, name: "T-8", status: "ready" },
  { id: 9, name: "T-9", status: "blank" },
]

export default function AviableTable() {
  return (
    <div className="grid custom-grid grid-cols-4 sm:grid-cols-6  lg:grid-cols-4 2xl:grid-cols-8 gap-4 p-2">
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