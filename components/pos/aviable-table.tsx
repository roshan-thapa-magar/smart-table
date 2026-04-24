"use client"

import React from "react"
import { TABLE_STATUS } from "@/constants/table-status"

/* ================= DATA ================= */

const departments = [
  {
    id: 1,
    name: "Floor",
    tables: [
      { id: 1, name: "T-1", status: "blank" },
      { id: 2, name: "T-2", status: "new" },
      { id: 3, name: "T-3", status: "preparing" },
      { id: 4, name: "T-5", status: "blank" },
      { id: 5, name: "T-6", status: "new" },
      { id: 6, name: "T-7", status: "preparing" },
      { id: 8, name: "T-8", status: "blank" },
      { id: 9, name: "T-9", status: "new" },
      { id: 10, name: "T-10", status: "preparing" },
      { id: 11, name: "T-11", status: "blank" },
      { id: 12, name: "T-12", status: "new" },
      { id: 13, name: "T-13", status: "preparing" },
    ],
  },
  {
    id: 2,
    name: "AC Room",
    tables: [
      { id: 4, name: "T-4", status: "ready" },
      { id: 5, name: "T-5", status: "served" },
      { id: 6, name: "T-7", status: "preparing" },
      { id: 8, name: "T-8", status: "blank" },
      { id: 9, name: "T-9", status: "new" },
      { id: 10, name: "T-10", status: "preparing" },
      { id: 11, name: "T-11", status: "blank" },
      { id: 12, name: "T-12", status: "new" },
      { id: 13, name: "T-13", status: "preparing" },
    ],
  },
  {
    id: 3,
    name: "Rooftop",
    tables: [
      { id: 6, name: "T-6", status: "billing" },
      { id: 7, name: "T-7", status: "new" },
      { id: 8, name: "T-8", status: "ready" },
      { id: 9, name: "T-9", status: "blank" },
      { id: 10, name: "T-10", status: "preparing" },
      { id: 11, name: "T-11", status: "blank" },
      { id: 12, name: "T-12", status: "new" },
      { id: 13, name: "T-13", status: "preparing" },
      { id: 14, name: "T-14", status: "new" },
      { id: 15, name: "T-15", status: "blank" },
      { id: 16, name: "T-16", status: "served" },

    ],
  },
  {
    id: 4,
    name: "top",
    tables: [
      { id: 6, name: "T-6", status: "billing" },
      { id: 7, name: "T-7", status: "new" },
      { id: 8, name: "T-8", status: "ready" },
      { id: 9, name: "T-9", status: "blank" },
      { id: 10, name: "T-10", status: "preparing" },
      { id: 11, name: "T-11", status: "blank" },
      { id: 12, name: "T-12", status: "new" },
      { id: 13, name: "T-13", status: "preparing" },
      { id: 14, name: "T-14", status: "new" },
      { id: 15, name: "T-15", status: "blank" },
      { id: 16, name: "T-16", status: "served" },

    ],
  },
  {
    id: 5,
    name: "Window",
    tables: [
      { id: 6, name: "T-6", status: "billing" },
      { id: 7, name: "T-7", status: "new" },
      { id: 8, name: "T-8", status: "ready" },
      { id: 9, name: "T-9", status: "blank" },
      { id: 10, name: "T-10", status: "preparing" },
      { id: 11, name: "T-11", status: "blank" },
      { id: 12, name: "T-12", status: "new" },
      { id: 13, name: "T-13", status: "preparing" },
      { id: 14, name: "T-14", status: "new" },
      { id: 15, name: "T-15", status: "blank" },
      { id: 16, name: "T-16", status: "served" },

    ],
  },
]

/* ================= COMPONENT ================= */

export default function AvailableTables() {
  return (
    <div className="h-full overflow-y-auto hide-scrollbar p-3 space-y-6">
      {departments.map((dept) => (
        <div key={dept.id}>
          {/* Department Header */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">{dept.name}</h2>

            <span className="text-sm text-muted-foreground">
              {dept.tables.length} Tables
            </span>
          </div>

          {/* Table Grid */}
          <div className="grid custom-grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 2xl:grid-cols-8 gap-4">
            {dept.tables.map((table) => {
              const status =
                TABLE_STATUS[
                table.status as keyof typeof TABLE_STATUS
                ]

              return (
                <div
                  key={table.id}
                  className={`
                    aspect-square
                    flex flex-col items-center justify-center
                    rounded-xl border shadow-sm
                    cursor-pointer transition-all duration-200
                    hover:scale-[1.05]
                    active:scale-95
                    ${status.className}
                  `}
                >
                  <span className="text-lg font-bold">
                    {table.name}
                  </span>

                  <span className="text-xs mt-1 opacity-80">
                    {status.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}