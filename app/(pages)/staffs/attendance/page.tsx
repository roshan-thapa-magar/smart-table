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
interface Attendance {
  id: string;
  staffName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: string;
  salaryStatus: string;
  receiptImage?: string;
  description?: string; // ✅ ADDED
}

/** FORM FIELDS */
const attendanceFields: FormField[] = [
  {
    name: "staffName",
    label: "Staff Name",
    type: "select",
    options: [
      { label: "Roshan Thapa", value: "Roshan Thapa" },
      { label: "Sita Gurung", value: "Sita Gurung" },
      { label: "John Doe", value: "John Doe" },
    ],
  },

  { name: "date", label: "Date", type: "date" },
  { name: "checkIn", label: "Check In Time", type: "time" },
  { name: "checkOut", label: "Check Out Time", type: "time" },

  {
    name: "status",
    label: "Attendance Status",
    type: "select",
    options: [
      { label: "Present", value: "Present" },
      { label: "Absent", value: "Absent" },
      { label: "Late", value: "Late" },
    ],
  },

  {
    name: "salaryStatus",
    label: "Salary Status",
    type: "select",
    options: [
      { label: "Paid", value: "Paid" },
      { label: "Unpaid", value: "Unpaid" },
      { label: "Pending", value: "Pending" },
    ],
  },

  {
    name: "description", // ✅ ADDED
    label: "Description",
    type: "textarea",
  },

  {
    name: "receiptImage",
    label: "Payment Receipt",
    type: "image",
  },
];

/** SAMPLE DATA */
const initialAttendance: Attendance[] = [
  {
    id: "1",
    staffName: "Roshan Thapa",
    date: "2026-04-20",
    checkIn: "09:00 AM",
    checkOut: "06:00 PM",
    status: "Present",
    salaryStatus: "Paid",
    description: "Full shift completed without issues.",
    receiptImage: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    staffName: "Sita Gurung",
    date: "2026-04-20",
    checkIn: "09:30 AM",
    checkOut: "05:30 PM",
    status: "Late",
    salaryStatus: "Pending",
    description: "Arrived late due to traffic.",
    receiptImage: "https://github.com/shadcn.png",
  },
];

export default function StaffAttendancePage() {
  const [data, setData] = useState<Attendance[]>(initialAttendance);

  const [editing, setEditing] = useState<Attendance | null>(null);
  const [selected, setSelected] = useState<Attendance | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  /** CREATE */
  const handleCreate = async (values: Attendance) => {
    const newItem: Attendance = {
      ...values,
      id: Date.now().toString(),
    };

    setData((prev) => [newItem, ...prev]);
    setFormOpen(false);
  };

  /** UPDATE */
  const handleUpdate = async (values: Attendance) => {
    if (!editing) return;

    setData((prev) =>
      prev.map((item) =>
        item.id === editing.id ? { ...item, ...values } : item
      )
    );

    setEditing(null);
    setFormOpen(false);
  };

  /** DELETE */
  const handleDelete = async () => {
    if (!selected) return;

    setData((prev) => prev.filter((item) => item.id !== selected.id));

    setSelected(null);
    setDeleteOpen(false);
  };

  /** COLUMNS */
  const columns: ColumnDefinition<Attendance>[] = useMemo(
    () => [
      { id: "staffName", name: "Staff Name" },
      { id: "date", name: "Date" },
      { id: "checkIn", name: "Check In" },
      { id: "checkOut", name: "Check Out" },

      {
        id: "status",
        name: "Attendance",
        render: (row) => (
          <span
            className={
              row.status === "Present"
                ? "text-green-600"
                : row.status === "Late"
                ? "text-yellow-600"
                : "text-red-600"
            }
          >
            {row.status}
          </span>
        ),
      },

      {
        id: "salaryStatus",
        name: "Salary",
        render: (row) => (
          <span
            className={
              row.salaryStatus === "Paid"
                ? "text-green-600"
                : row.salaryStatus === "Pending"
                ? "text-yellow-600"
                : "text-red-600"
            }
          >
            {row.salaryStatus}
          </span>
        ),
      },

      {
        id: "description", // ✅ ADDED COLUMN
        name: "Description",
        render: (row) => (
          <span className="text-sm text-gray-600 line-clamp-1">
            {row.description || "-"}
          </span>
        ),
      },

      {
        id: "receiptImage",
        name: "Receipt",
        render: (row) =>
          row.receiptImage ? (
            <Image
              src={row.receiptImage}
              alt="receipt"
              width={40}
              height={40}
              className="w-8 h-8 rounded-md object-cover"
            />
          ) : (
            <span className="text-gray-400 text-sm">No Image</span>
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
    []
  );

  /** COLUMN VISIBILITY */
  const initialColumnVisibility = {
    staffName: true,
    date: true,
    checkIn: true,
    checkOut: true,
    status: true,
    salaryStatus: true,
    description: true, // ✅ ADDED
    receiptImage: true,
    action: true,
  };

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        initialColumnVisibility={initialColumnVisibility}
        searchKey="staffName"
        searchPlaceholder="Search attendance..."
        addLabel="Add Attendance"
        onAddClick={() => {
          setEditing(null);
          setFormOpen(true);
        }}
      />

      {/* FORM */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogTitle>
            {editing ? "Edit Attendance" : "Add Attendance"}
          </DialogTitle>

          <FormBuilder
            title=""
            fields={attendanceFields}
            defaultValues={
              editing || {
                staffName: "",
                date: "",
                checkIn: "",
                checkOut: "",
                status: "Present",
                salaryStatus: "Pending",
                description: "",
                receiptImage: "",
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
        title="Delete Attendance?"
        description={`"${selected?.staffName}" record will be removed.`}
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </>
  );
}