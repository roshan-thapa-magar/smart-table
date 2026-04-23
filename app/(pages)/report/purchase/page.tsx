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
interface Purchase {
  id?: string;
  supplierName: string;
  productName: string;
  category: string;
  quantity: number | string;
  unitPrice: number | string;
  totalAmount?: number | string;

  invoiceNo: string;
  purchaseDate: string;

  status: "Pending" | "Completed" | "Cancelled";

  image?: string;
  document?: string;

  createdAt?: string;
  updatedAt?: string;
}

/** FORM FIELDS */
const purchaseFields: FormField[] = [
  { name: "supplierName", label: "Supplier Name", type: "text" },
  { name: "productName", label: "Product Name", type: "text" },

  {
    name: "category",
    label: "Category",
    type: "select",
    options: [
      { label: "Food", value: "Food" },
      { label: "Beverage", value: "Beverage" },
      { label: "Raw Material", value: "Raw Material" },
      { label: "Other", value: "Other" },
    ],
  },

  { name: "quantity", label: "Quantity", type: "text" },
  { name: "unitPrice", label: "Unit Price", type: "text" },

  { name: "invoiceNo", label: "Invoice No", type: "text" },
  { name: "purchaseDate", label: "Purchase Date", type: "datetime" },

  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Pending", value: "Pending" },
      { label: "Completed", value: "Completed" },
      { label: "Cancelled", value: "Cancelled" },
    ],
  },

  { name: "image", label: "Product Image", type: "image" },
  { name: "document", label: "Invoice Document (PDF)", type: "pdf" },
];

/** SAMPLE DATA */
const initialPurchases: Purchase[] = [
  {
    id: "1",
    supplierName: "ABC Suppliers",
    productName: "Rice",
    category: "Food",
    quantity: 50,
    unitPrice: 120,
    invoiceNo: "INV-001",
    purchaseDate: "2026-04-20",
    status: "Completed",
    image: "https://github.com/shadcn.png",
    document: "#",
  },
  {
    id: "2",
    supplierName: "Fresh Mart",
    productName: "Oil",
    category: "Food",
    quantity: 20,
    unitPrice: 300,
    invoiceNo: "INV-002",
    purchaseDate: "2026-04-21",
    status: "Pending",
    image: "https://github.com/shadcn.png",
    document: "#",
  },
];

export default function PurchaseReportPage() {
  const [data, setData] = useState(initialPurchases);

  const [editing, setEditing] = useState<Purchase | null>(null);
  const [selected, setSelected] = useState<Purchase | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  /** CREATE */
  const handleCreate = async (values: Purchase): Promise<void> => {
    const now = new Date().toISOString().split("T")[0];

    const newItem: Purchase = {
      ...values,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };

    setData((prev) => [newItem, ...prev]);
    setFormOpen(false);
  };

  /** UPDATE */
  const handleUpdate = async (values: Purchase): Promise<void> => {
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
  const columns: ColumnDefinition<Purchase>[] = useMemo(
    () => [
      { id: "supplierName", name: "Supplier" },
      { id: "productName", name: "Product" },
      { id: "category", name: "Category" },

      { id: "quantity", name: "Qty" },
      { id: "unitPrice", name: "Unit Price" },

      {
        id: "totalAmount",
        name: "Total",
        render: (row) => {
          const total =
            Number(row.quantity) * Number(row.unitPrice);
          return <span>{total}</span>;
        },
      },

      { id: "invoiceNo", name: "Invoice No" },
      { id: "purchaseDate", name: "Date" },
      { id: "status", name: "Status" },

      {
        id: "document",
        name: "Invoice",
        render: (row) =>
          row.document ? (
            <a
              href={row.document}
              target="_blank"
              className="text-blue-500 underline"
            >
              View PDF
            </a>
          ) : (
            "-"
          ),
      },
      {
        id: "image",
        name: "Image",
        render: (row) => (
          <Image
            src={row.image || "/images/image.png"}
            alt={row.productName}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full object-cover"
          />
        ),
      },

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
    supplierName: true,
    productName: true,
    category: true,
    quantity: true,
    unitPrice: true,
    totalAmount: true,
    invoiceNo: true,
    purchaseDate: true,
    status: true,
    document: true,
    action: true,
  };

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        initialColumnVisibility={initialColumnVisibility}
        searchKey="supplierName"
        searchPlaceholder="Search purchase..."
        addLabel="Add Purchase"
        onAddClick={() => {
          setEditing(null);
          setFormOpen(true);
        }}
      />

      {/* FORM */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogTitle>
            {editing ? "Edit Purchase" : "Add Purchase"}
          </DialogTitle>

          <FormBuilder
            title=""
            fields={purchaseFields}
            defaultValues={
              editing || {
                supplierName: "",
                productName: "",
                category: "",
                quantity: "",
                unitPrice: "",
                invoiceNo: "",
                purchaseDate: "",
                status: "Pending",
                image: "",
                document: "",
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
        title="Delete Purchase?"
        description={`"${selected?.productName}" will be removed.`}
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </>
  );
}