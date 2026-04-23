"use client";

import { useMemo, useState, useCallback } from "react";
import DataTable, { type ColumnDefinition } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, MoreHorizontal } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

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
interface User {
  id: string;
  userName: string;
  email: string;
  phone: string;
  image?: string;

  level: string;
  duration: string;

  paymentDate: string;
  lastDate: string;

  status: "Active" | "Pending" | "Suspended";

  createdAt: string;
  updatedAt: string;
}

/** FORM FIELDS */
const userFields: FormField[] = [
  { name: "userName", label: "User Name", type: "text" },
  { name: "email", label: "Email", type: "text" },

  // ✅ NEW PASSWORD FIELD
  { name: "password", label: "Password", type: "text" },

  { name: "phone", label: "Phone", type: "text" },

  { name: "image", label: "Profile Image", type: "image" },

  {
    name: "level",
    label: "Level",
    type: "select",
    options: [
      { label: "Gold", value: "Gold" },
      { label: "Silver", value: "Silver" },
      { label: "Bronze", value: "Bronze" },
    ],
  },

  { name: "duration", label: "Duration", type: "text" },

  { name: "paymentDate", label: "Payment Date", type: "datetime" },
  { name: "lastDate", label: "Last Date", type: "datetime" },

  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Active", value: "Active" },
      { label: "Pending", value: "Pending" },
      { label: "Suspended", value: "Suspended" },
    ],
  },
];

/** SAMPLE DATA */
const initialUsers: User[] = [
  {
    id: "1",
    userName: "John Doe",
    email: "john@example.com",
    phone: "9800000001",
    image: "https://github.com/shadcn.png",

    level: "Gold",
    duration: "1 Year",

    paymentDate: "2026-04-01",
    lastDate: "2027-04-01",

    status: "Active",

    createdAt: "2026-04-01",
    updatedAt: "2026-04-01",
  },
];

const emptyUser: Partial<User> = {
  userName: "",
  email: "",
  phone: "",
  image: "",
  level: "",
  duration: "",
  paymentDate: "",
  lastDate: "",
  status: "Pending",
};

export default function UsersPage() {
  const [data, setData] = useState<User[]>(initialUsers);

  const [editing, setEditing] = useState<User | null>(null);
  const [selected, setSelected] = useState<User | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  /** CREATE */
  const handleCreate = useCallback(async (values: User): Promise<void> => {
    const now = new Date().toISOString().split("T")[0];

    const newUser: User = {
      ...values,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };

    setData((prev) => [newUser, ...prev]);
    setFormOpen(false);
  }, []);

  /** UPDATE */
  const handleUpdate = useCallback(
    async (values: User): Promise<void> => {
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
    },
    [editing]
  );

  /** DELETE */
  const handleDelete = useCallback(async (): Promise<void> => {
    setData((prev) => prev.filter((item) => item.id !== selected?.id));
    setSelected(null);
    setDeleteOpen(false);
  }, [selected]);

  /** COLUMNS */
  const columns: ColumnDefinition<User>[] = useMemo(
    () => [
      { id: "userName", name: "User Name" },
      { id: "email", name: "Email" },
      { id: "phone", name: "Phone" },
      { id: "level", name: "Level" },
      { id: "duration", name: "Duration" },
      { id: "paymentDate", name: "Payment Date" },
      { id: "lastDate", name: "Last Date" },
      { id: "status", name: "Status" },
      { id: "createdAt", name: "Created" },
      { id: "updatedAt", name: "Updated" },
      {
        id: "image",
        name: "Image",
        render: (user) => (
          <Image
            src={user.image || "/images/image.png"}
            alt={user.userName}
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
    []
  );

  const initialColumnVisibility = useMemo(
    () => ({
      image: true,
      userName: true,
      email: true,
      phone: true,
      level: true,
      duration: true,
      paymentDate: true,
      lastDate: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      action: true,
    }),
    []
  );

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        initialColumnVisibility={initialColumnVisibility}
        searchKey="userName"
        searchPlaceholder="Search user..."
        addLabel="Add User"
        onAddClick={() => {
          setEditing(null);
          setFormOpen(true);
        }}
      />

      {/* FORM */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="w-full md:min-w-xl">
          <DialogTitle>
            {editing ? "Edit User" : "Add User"}
          </DialogTitle>

          <FormBuilder
            title=""
            fields={userFields}
            defaultValues={editing || emptyUser}
            onSubmit={editing ? handleUpdate : handleCreate}
          />
        </DialogContent>
      </Dialog>

      {/* DELETE */}
      <DeleteDialog
        isOpen={deleteOpen}
        isLoading={false}
        title="Delete User?"
        description={`"${selected?.userName ?? ""}" will be removed.`}
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </>
  );
}