"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
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

/** Department type */
interface Department {
  departmentName: string;
  status: string;
  image: string;
  description?: string;
}

/** Form fields */
const departmentFields: FormField[] = [
  {
    name: "departmentName",
    label: "Department Name",
    placeholder: "Enter department name",
    type: "text",
  },
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
   name: "description",
   label: "Description",
   placeholder: "Enter department description",
   type: "textarea",
 },
  {
    name: "image",
    label: "Department Image",
    placeholder: "Select Image",
    type: "image",
  },
];

export default function DepartmentsPage() {
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const initialDepartments: Department[] = [
    {
      departmentName: "VIP Section",
      description: "Reserved for premium guests only",
      status: "Active",
      image: "https://github.com/shadcn.png",
    },
    {
      departmentName: "First Floor",
      description: "Main dining area with high seating capacity",
      status: "Active",
      image: "https://github.com/shadcn.png",
    },
    {
      departmentName: "Second Floor",
      description: "Family and group dining area",
      status: "Active",
      image: "https://github.com/shadcn.png",
    },
    {
      departmentName: "Outdoor Area",
      description: "Open-air seating with natural view",
      status: "Active",
      image: "https://github.com/shadcn.png",
    },
    {
      departmentName: "Private Dining Room",
      description: "Reserved for events and private bookings",
      status: "Inactive",
      image: "https://github.com/shadcn.png",
    },
    {
      departmentName: "Roof Top",
      description: "Rooftop dining with city view",
      status: "Active",
      image: "https://github.com/shadcn.png",
    },
  ];

  const handleUpdateDepartment = async () => { };
  const handleCreateDepartment = async () => { };
  const handleDelete = async () => {
    console.log("Delete department");
  };

  const columns: ColumnDefinition<Department>[] = useMemo(
    () => [
      {
        id: "departmentName",
        name: "Department Name",
      },
      {
        id: "description",
        name: "Description",
      },
      {
        id: "status",
        name: "Status",
      },
      {
        id: "image",
        name: "Image",
        render: (dept) => (
          <Image
            src={dept.image || "/images/image.png"}
            alt={dept.departmentName}
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
        render: (dept) => (
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
                  setEditingDepartment(dept);
                  setFormOpen(true);
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-red-500"
                onClick={() => {
                  setSelectedDepartment(dept);
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

  const initialColumnVisibility = {
    departmentName: true,
    description: true,
    status: true,
    image: true,
    action: true,
  };

  return (
    <>
      <DataTable
        data={initialDepartments}
        columns={columns}
        initialColumnVisibility={initialColumnVisibility}
        searchPlaceholder="Search by department name..."
        addLabel="Add Department"
        onAddClick={() => {
          setEditingDepartment(null);
          setFormOpen(true);
        }}
        searchKey="departmentName"
      />

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogTitle>
            {editingDepartment ? "Edit Department" : "Add Department"}
          </DialogTitle>

          <FormBuilder
            title=""
            fields={departmentFields}
            defaultValues={editingDepartment || {}}
            onSubmit={
              editingDepartment
                ? handleUpdateDepartment
                : handleCreateDepartment
            }
          />
        </DialogContent>
      </Dialog>

      <DeleteDialog
        isOpen={deleteOpen}
        isLoading={false}
        title="Delete Department?"
        description={`"${selectedDepartment?.departmentName}" will be removed.`}
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </>
  );
}