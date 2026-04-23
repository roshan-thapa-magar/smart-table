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
interface RestaurantCategory {
  name: string;
  status: string;
  description?: string;
}

/** FORM FIELDS */
const restaurantCategoryFields: FormField[] = [
  {
    name: "name",
    label: "Category Name",
    placeholder: "Enter category (e.g. 5 Star Restaurant)",
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
    placeholder: "Enter category description",
    type: "textarea",
  },

];

/** SAMPLE DATA */
const initialRestaurantCategories: RestaurantCategory[] = [
  {
    name: "5 Star Restaurant",
    status: "Active",
    description: "Premium luxury dining experience",
  },
  {
    name: "4 Star Restaurant",
    status: "Active",
    description: "High-quality dining with excellent service",
  },
  {
    name: "3 Star Restaurant",
    status: "Active",
    description: "Standard dining experience",
  },
  {
    name: "Budget Restaurant",
    status: "Active",
    description: "Affordable and quick meals",
  },
];

export default function RestaurantCategoryPage() {
  const [editing, setEditing] = useState<RestaurantCategory | null>(null);
  const [selected, setSelected] = useState<RestaurantCategory | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  /** HANDLERS */
  const handleCreate = async (values: RestaurantCategory) => {
    console.log("Create:", values);
  };

  const handleUpdate = async (values: RestaurantCategory) => {
    console.log("Update:", values);
  };

  const handleDelete = async () => {
    console.log("Delete:", selected);
    setDeleteOpen(false);
  };

  /** COLUMNS */
  const columns: ColumnDefinition<RestaurantCategory>[] = useMemo(
    () => [
      {
        id: "name",
        name: "Category Name",
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
    status: true,
    description: true,
    action: true,
  };

  return (
    <>
      {/* TABLE */}
      <DataTable
        data={initialRestaurantCategories}
        columns={columns}
        initialColumnVisibility={initialColumnVisibility}
        searchKey="name"
        searchPlaceholder="Search restaurant category..."
        addLabel="Add Category"
        onAddClick={() => {
          setEditing(null);
          setFormOpen(true);
        }}
      />

      {/* FORM */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent >
          <DialogTitle>
            {editing ? "Edit Category" : "Add Category"}
          </DialogTitle>

          <FormBuilder
            title=""
            fields={restaurantCategoryFields}
            defaultValues={editing || {}}
            onSubmit={editing ? handleUpdate : handleCreate}
          />
        </DialogContent>
      </Dialog>

      {/* DELETE */}
      <DeleteDialog
        isOpen={deleteOpen}
        isLoading={false}
        title="Delete Category?"
        description={`"${selected?.name}" will be removed.`}
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </>
  );
}