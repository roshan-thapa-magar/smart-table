"use client";

import { useMemo, useState } from "react";
import DataTable, { type ColumnDefinition } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, MoreHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { DeleteDialog } from "@/components/delete-dialog";
import FormBuilder, { FormField } from "@/components/form-builder";
import Image from "next/image";

/** TYPE */
interface Sales {
  id?: string;

  orderId: string;

  customerName: string;
  orderType: "Dine In" | "Online";

  tableNo?: string;

  items: string;

  quantity: number | string;
  totalAmount: number | string;

  paymentMethod: "Cash" | "Card" | "Online";

  paymentStatus: "Paid" | "Pending" | "Failed";

  orderStatus: "Completed" | "Preparing" | "Cancelled";

  orderDate: string;

  image?: string;

  createdAt?: string;
  updatedAt?: string;
}

/** FORM FIELDS */
const salesFields: FormField[] = [
  { name: "orderId", label: "Order ID", type: "text" },
  { name: "customerName", label: "Customer Name", type: "text" },

  {
    name: "orderType",
    label: "Order Type",
    type: "select",
    options: [
      { label: "Dine In", value: "Dine In" },
      { label: "Online", value: "Online" },
    ],
  },

  { name: "tableNo", label: "Table No (Optional)", type: "text" },

  { name: "quantity", label: "Total Quantity", type: "text" },
  { name: "totalAmount", label: "Total Amount", type: "text" },

  {
    name: "paymentMethod",
    label: "Payment Method",
    type: "select",
    options: [
      { label: "Cash", value: "Cash" },
      { label: "Card", value: "Card" },
      { label: "Online", value: "Online" },
    ],
  },

  {
    name: "paymentStatus",
    label: "Payment Status",
    type: "select",
    options: [
      { label: "Paid", value: "Paid" },
      { label: "Pending", value: "Pending" },
      { label: "Failed", value: "Failed" },
    ],
  },

  {
    name: "orderStatus",
    label: "Order Status",
    type: "select",
    options: [
      { label: "Completed", value: "Completed" },
      { label: "Preparing", value: "Preparing" },
      { label: "Cancelled", value: "Cancelled" },
    ],
  },

  { name: "orderDate", label: "Order Date", type: "datetime" },
  { name: "items", label: "Items (comma separated)", type: "textarea" },

  { name: "image", label: "Customer Image", type: "image" },
];

/** SAMPLE DATA */
const initialSales: Sales[] = [
  {
    id: "1",
    orderId: "ORD-1001",
    customerName: "Ram Sharma",
    orderType: "Dine In",
    tableNo: "T-5",
    items: "Momo, Coke",
    quantity: 2,
    totalAmount: 500,
    paymentMethod: "Cash",
    paymentStatus: "Paid",
    orderStatus: "Completed",
    orderDate: "2026-04-22",
    image: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    orderId: "ORD-1002",
    customerName: "Sita Rai",
    orderType: "Online",
    tableNo: "",
    items: "Burger, Fries",
    quantity: 2,
    totalAmount: 800,
    paymentMethod: "Online",
    paymentStatus: "Pending",
    orderStatus: "Preparing",
    orderDate: "2026-04-23",
    image: "https://github.com/shadcn.png",
  },
];

export default function SalesReportPage() {
  const [data, setData] = useState(initialSales);

  const [editing, setEditing] = useState<Sales | null>(null);
  const [selected, setSelected] = useState<Sales | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  /** CREATE */
  const handleCreate = async (values: Sales): Promise<void> => {
    const now = new Date().toISOString().split("T")[0];

    const newSale: Sales = {
      ...values,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };

    setData((prev) => [newSale, ...prev]);
    setFormOpen(false);
  };

  /** UPDATE */
  const handleUpdate = async (values: Sales): Promise<void> => {
    const now = new Date().toISOString().split("T")[0];

    setData((prev) =>
      prev.map((item) =>
        item.id === editing?.id
          ? { ...item, ...values, updatedAt: now }
          : item
      )
    );

    setEditing(null);
    setFormOpen(false);
  };

  /** DELETE */
  const handleDelete = async (): Promise<void> => {
    setData((prev) => prev.filter((item) => item.id !== selected?.id));
    setSelected(null);
    setDeleteOpen(false);
  };

  /** COLUMNS */
  const columns: ColumnDefinition<Sales>[] = useMemo(
    () => [
      {
        id: "image",
        name: "Image",
        render: (row) => (
          <Image
            src={row.image || "/images/image.png"}
            alt={row.customerName}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full object-cover"
          />
        ),
      },

      { id: "orderId", name: "Order ID" },
      { id: "customerName", name: "Customer" },
      { id: "orderType", name: "Type" },
      { id: "tableNo", name: "Table" },
      { id: "items", name: "Items" },
      { id: "quantity", name: "Qty" },

      {
        id: "totalAmount",
        name: "Total",
        render: (row) => <b>Rs {row.totalAmount}</b>,
      },

      { id: "paymentMethod", name: "Payment" },
      { id: "paymentStatus", name: "Payment Status" },
      { id: "orderStatus", name: "Order Status" },
      { id: "orderDate", name: "Date" },

      {
        id: "action",
        name: "Action",
        align: "center",
        render: (row) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => {
                  setEditing(row);
                  setFormOpen(true);
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-500"
                onClick={() => {
                  setSelected(row);
                  setDeleteOpen(true);
                }}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [editing, selected]
  );

  const initialColumnVisibility = {
    image: true,
    orderId: true,
    customerName: true,
    orderType: true,
    tableNo: true,
    items: true,
    quantity: true,
    totalAmount: true,
    paymentMethod: true,
    paymentStatus: true,
    orderStatus: true,
    orderDate: true,
    action: true,
  };

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        initialColumnVisibility={initialColumnVisibility}
        searchKey="orderId"
        searchPlaceholder="Search sales..."
        addLabel="Add Sale"
        onAddClick={() => {
          setEditing(null);
          setFormOpen(true);
        }}
      />

      {/* FORM */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogTitle>
            {editing ? "Edit Sale" : "Add Sale"}
          </DialogTitle>

          <FormBuilder
            title=""
            fields={salesFields}
            defaultValues={
              editing || {
                orderId: "",
                customerName: "",
                orderType: "Dine In",
                tableNo: "",
                items: "",
                quantity: "",
                totalAmount: "",
                paymentMethod: "Cash",
                paymentStatus: "Pending",
                orderStatus: "Preparing",
                orderDate: "",
                image: "",
              }
            }
            onSubmit={editing ? handleUpdate : handleCreate}
          />
        </DialogContent>
      </Dialog>

      {/* DELETE */}
      <DeleteDialog
        isOpen={deleteOpen}
        isLoading={false}
        title="Delete Sale?"
        description={`"${selected?.orderId}" will be removed.`}
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </>
  );
}