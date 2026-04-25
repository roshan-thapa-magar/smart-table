import AviableTable from '@/components/pos/aviable-table'
import TableOrderDetails from '@/components/pos/table-order-details'
import React from 'react'

export default function page() {
  return (
    <div className="flex h-full ">
      
      {/* Left Side - Tables */}
      <div className="w-full lg:w-1/2 overflow-y-auto">
        <AviableTable />
      </div>

      {/* Right Side - Order Details */}
      <div className="w-1/2 overflow-y-auto border rounded-lg p-2 hidden lg:block">
        <TableOrderDetails />
      </div>
    </div>
  )
}