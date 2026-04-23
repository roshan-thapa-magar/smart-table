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
interface Staff {
  name: string;
  email: string;
  phone: string;
  password?: string;
  address?: string;
  position: string;
  department: string;
  salary?: number | string;
  image?: string;
  experienceDoc?: string;
  joinedDate: string;
  status: string;
}

/** FORM FIELDS */
const staffFields: FormField[] = [
  { name: "name", label: "Staff Name", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "phone", label: "Phone", type: "text" },
  { name: "password", label: "Password", type: "text" },

  {
    name: "position",
    label: "Position",
    type: "select",
    options: [
      { label: "Manager", value: "Manager" },
      { label: "Chef", value: "Chef" },
      { label: "Waiter", value: "Waiter" },
      { label: "Cashier", value: "Cashier" },
    ],
  },

  {
    name: "department",
    label: "Department",
    type: "select",
    options: [
      { label: "Management", value: "Management" },
      { label: "Kitchen", value: "Kitchen" },
      { label: "Service", value: "Service" },
      { label: "Accounts", value: "Accounts" },
    ],
  },

  { name: "salary", label: "Salary", type: "text" },

  { name: "joinedDate", label: "Joined Date", type: "datetime" },

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
    name: "experienceDoc",
    label: "Experience Document (PDF)",
    type: "pdf",
  },
  { name: "address", label: "Address", type: "textarea" },
  { name: "image", label: "Staff Image", type: "image" },

];

/** SAMPLE DATA */
const initialStaff: Staff[] = [
  {
    name: "Roshan Thapa",
    email: "roshan@example.com",
    phone: "9800000000",
    password: "123456",
    address: "Kathmandu, Nepal",
    position: "Manager",
    department: "Management",
    salary: 50000,
    image: "https://github.com/shadcn.png",
    experienceDoc: "abc",
    joinedDate: "2024-01-10",
    status: "Active",
  },
  {
    name: "Sita Gurung",
    email: "sita@example.com",
    phone: "9811111111",
    password: "123456",
    address: "Lalitpur, Nepal",
    position: "Chef",
    department: "Kitchen",
    salary: 35000,
    image: "https://github.com/shadcn.png",
    experienceDoc: "abc",
    joinedDate: "2024-02-15",
    status: "Active",
  },
];

export default function StaffDetailsPage() {
  const [data, setData] = useState(initialStaff);

  const [editing, setEditing] = useState<Staff | null>(null);
  const [selected, setSelected] = useState<Staff | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  /** CREATE */
  const handleCreate = async (values: Staff): Promise<void> => {
    setData((prev) => [values, ...prev]);
    setFormOpen(false);
  };

  /** UPDATE */
  const handleUpdate = async (values: Staff): Promise<void> => {
    setData((prev) =>
      prev.map((item) =>
        item === editing ? { ...item, ...values } : item
      )
    );

    setEditing(null);
    setFormOpen(false);
  };

  /** DELETE */
  const handleDelete = async (): Promise<void> => {
    setData((prev) => prev.filter((item) => item !== selected));
    setSelected(null);
    setDeleteOpen(false);
  };

  /** COLUMNS */
  const columns: ColumnDefinition<Staff>[] = useMemo(
    () => [
      { id: "name", name: "Name" },
      { id: "email", name: "Email" },
      { id: "phone", name: "Phone" },
      { id: "position", name: "Position" },
      { id: "department", name: "Department" },
      { id: "salary", name: "Salary" },
      { id: "joinedDate", name: "Joined Date" },
      { id: "status", name: "Status" },

      {
        id: "experienceDoc",
        name: "Experience",
        render: (row) =>
          row.experienceDoc ? (
            <a
              href={row.experienceDoc}
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
        render: (user) => (
          <Image
            src={user.image || "/images/image.png"}
            alt={user.image || "staff"}
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
    name: true,
    email: true,
    phone: true,
    position: true,
    department: true,
    salary: true,
    joinedDate: true,
    status: true,
    experienceDoc: true,
    action: true,
  };

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        initialColumnVisibility={initialColumnVisibility}
        searchKey="name"
        searchPlaceholder="Search staff..."
        addLabel="Add Staff"
        onAddClick={() => {
          setEditing(null);
          setFormOpen(true);
        }}
      />

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="w-full min-w-xl">
          <DialogTitle>
            {editing ? "Edit Staff" : "Add Staff"}
          </DialogTitle>

          <FormBuilder
            title=""
            fields={staffFields}
            defaultValues={
              editing || {
                name: "",
                email: "",
                phone: "",
                password: "",
                address: "",
                position: "",
                department: "",
                salary: "",
                image: "",
                experienceDoc: "",
                joinedDate: "",
                status: "Active",
              }
            }
            onSubmit={editing ? handleUpdate : handleCreate}
          />
        </DialogContent>
      </Dialog>

      <DeleteDialog
        isOpen={deleteOpen}
        isLoading={false}
        title="Delete Staff?"
        description={`"${selected?.name}" will be permanently removed.`}
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </>
  );
}