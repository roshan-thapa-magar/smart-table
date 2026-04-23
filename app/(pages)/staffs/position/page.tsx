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

/** TYPE */
interface StaffPosition {
  name: string;
  description?: string;
  status: string;
}

/** FORM FIELDS */
const staffPositionFields: FormField[] = [
  {
    name: "name",
    label: "Position Name",
    placeholder: "Enter position (e.g. Manager, Chef)",
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
    placeholder: "Enter position description",
    type: "textarea",
  },
];

/** SAMPLE DATA */
const initialStaffPositions: StaffPosition[] = [
  {
    name: "Manager",
    description: "Handles overall restaurant operations",
    status: "Active",
  },
  {
    name: "Chef",
    description: "Prepares and manages kitchen food quality",
    status: "Active",
  },
  {
    name: "Waiter",
    description: "Serves customers and manages tables",
    status: "Active",
  },
  {
    name: "Cashier",
    description: "Handles billing and payments",
    status: "Inactive",
  },
];

export default function StaffPositionPage() {
  const [editing, setEditing] = useState<StaffPosition | null>(null);
  const [selected, setSelected] = useState<StaffPosition | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  /** HANDLERS */
  const handleCreate = async (values: StaffPosition) => {
    console.log("Create:", values);
  };

  const handleUpdate = async (values: StaffPosition) => {
    console.log("Update:", values);
  };

  const handleDelete = async () => {
    console.log("Delete:", selected);
    setDeleteOpen(false);
  };

  /** COLUMNS */
  const columns: ColumnDefinition<StaffPosition>[] = useMemo(
    () => [
      {
        id: "name",
        name: "Position Name",
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

              <DropdownMenuSeparator />

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
    name: true,
    description: true,
    status: true,
    action: true,
  };

  return (
    <>
      {/* TABLE */}
      <DataTable
        data={initialStaffPositions}
        columns={columns}
        initialColumnVisibility={initialColumnVisibility}
        searchKey="name"
        searchPlaceholder="Search staff position..."
        addLabel="Add Position"
        onAddClick={() => {
          setEditing(null);
          setFormOpen(true);
        }}
      />

      {/* FORM */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogTitle>
            {editing ? "Edit Position" : "Add Position"}
          </DialogTitle>

          <FormBuilder
            title=""
            fields={staffPositionFields}
            defaultValues={editing || {}}
            onSubmit={editing ? handleUpdate : handleCreate}
          />
        </DialogContent>
      </Dialog>

      {/* DELETE */}
      <DeleteDialog
        isOpen={deleteOpen}
        isLoading={false}
        title="Delete Position?"
        description={`"${selected?.name}" will be removed.`}
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </>
  );
}