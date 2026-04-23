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

/** TYPE */
interface Category {
  categoryName: string;
  status: string;
  image: string;
  description?: string;
}

/** FORM FIELDS */
const categoryFields: FormField[] = [
  {
    name: "categoryName",
    label: "Category Name",
    placeholder: "Enter category name",
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
  {
    name: "image",
    label: "Category Image",
    type: "image",
  },
];

/** SAMPLE DATA */
const initialCategories: Category[] = [
  {
    categoryName: "Main Courses",
    status: "Active",
    description: "Includes rice, curry, grilled items",
    image: "https://github.com/shadcn.png",
  },
  {
    categoryName: "Appetizers",
    status: "Active",
    description: "Starters and light snacks",
    image: "https://github.com/shadcn.png",
  },
  {
    categoryName: "Desserts",
    status: "Inactive",
    description: "Sweet dishes and treats",
    image: "https://github.com/shadcn.png",
  },
  {
    categoryName: "Beverages",
    status: "Active",
    description: "Drinks including juice, soda, tea",
    image: "https://github.com/shadcn.png",
  },
  {
    categoryName: "Soups",
    status: "Active",
    description: "Hot and fresh soup varieties",
    image: "https://github.com/shadcn.png",
  },
];

export default function CategoriesPage() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  /** HANDLERS */
  const handleCreateCategory = async (values: Category) => {
    console.log("Create:", values);
  };

  const handleUpdateCategory = async (values: Category) => {
    console.log("Update:", values);
  };

  const handleDelete = async () => {
    console.log("Delete:", selectedCategory);
    setDeleteOpen(false);
  };

  /** COLUMNS */
  const columns: ColumnDefinition<Category>[] = useMemo(
    () => [
      {
        id: "categoryName",
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
        id: "image",
        name: "Image",
        render: (category) => (
          <Image
            src={category.image || "/images/image.png"}
            alt={category.categoryName}
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
        render: (category) => (
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
                  setEditingCategory(category);
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
                  setSelectedCategory(category);
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
    categoryName: true,
    status: true,
    description: true,
    image: true,
    action: true,
  };

  return (
    <>
      {/* TABLE */}
      <DataTable
        data={initialCategories}
        columns={columns}
        initialColumnVisibility={initialColumnVisibility}
        searchPlaceholder="Search by category name..."
        searchKey="categoryName"
        addLabel="Add Category"
        onAddClick={() => {
          setEditingCategory(null);
          setFormOpen(true);
        }}
      />

      {/* FORM */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent >
          <DialogTitle>
            {editingCategory ? "Edit Category" : "Add Category"}
          </DialogTitle>

          <FormBuilder
            title=""
            fields={categoryFields}
            defaultValues={editingCategory || {}}
            onSubmit={
              editingCategory
                ? handleUpdateCategory
                : handleCreateCategory
            }
          />
        </DialogContent>
      </Dialog>

      {/* DELETE */}
      <DeleteDialog
        isOpen={deleteOpen}
        isLoading={false}
        title="Delete Category?"
        description={`"${selectedCategory?.categoryName}" will be removed.`}
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </>
  );
}