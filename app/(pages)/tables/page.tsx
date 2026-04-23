"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
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

/** Table type */
interface RestaurantTable {
  tableName: string;
  department: string;
  qr: string;
  status: string;
  isPortable: string;
}

/** Form fields */
const tableFields: FormField[] = [
  {
    name: "tableName",
    label: "Table Name",
    type: "text",
    placeholder: "Enter table name",
  },
  {
    name: "department",
    label: "Department",
    type: "select",
    options: [
      { label: "VIP Section", value: "VIP Section" },
      { label: "First Floor", value: "First Floor" },
      { label: "Second Floor", value: "Second Floor" },
      { label: "Outdoor Area", value: "Outdoor Area" },
      { label: "Private Dining Room", value: "Private Dining Room" },
    ],
  },
  {
    name: "isPortable",
    label: "Is Portable",
    type: "select",
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" },
    ],
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
    name: "qr",
    label: "Table QR",
    type: "image",
    placeholder: "Upload QR Image",
  },
];

export default function TablesPage() {
  const [editingTable, setEditingTable] = useState<RestaurantTable | null>(null);
  const [selectedTable, setSelectedTable] = useState<RestaurantTable | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const initialTables: RestaurantTable[] = [
    {
      tableName: "T-01",
      department: "VIP Section",
      qr: "https://github.com/shadcn.png",
      status: "Active",
      isPortable: "No",
    },
    {
      tableName: "T-02",
      department: "First Floor",
      qr: "https://github.com/shadcn.png",
      status: "Active",
      isPortable: "Yes",
    },
    {
      tableName: "T-03",
      department: "Outdoor Area",
      qr: "https://github.com/shadcn.png",
      status: "Inactive",
      isPortable: "Yes",
    },
  ];

  const handleCreate = async () => {};
  const handleUpdate = async () => {};
  const handleDelete = async () => {
    console.log("Delete table");
  };

  const columns: ColumnDefinition<RestaurantTable>[] = useMemo(
    () => [
      {
        id: "tableName",
        name: "Table Name",
      },
      {
        id: "department",
        name: "Department",
      },
      {
        id: "qr",
        name: "Table QR",
        render: (row) => (
          <Image
            src={row.qr || "/images/image.png"}
            alt={row.tableName}
            width={40}
            height={40}
            className="w-8 h-8 rounded object-cover"
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
                  setEditingTable(row);
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
                  setSelectedTable(row);
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
    tableName: true,
    department: true,
    qr: true,
    status: true,
    isPortable: true,
    action: true,
  };

  return (
    <>
      <DataTable
        data={initialTables}
        columns={columns}
        initialColumnVisibility={initialColumnVisibility}
        searchPlaceholder="Search table..."
        addLabel="Add Table"
        searchKey="tableName"
        onAddClick={() => {
          setEditingTable(null);
          setFormOpen(true);
        }}
      />

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogTitle>
            {editingTable ? "Edit Table" : "Add Table"}
          </DialogTitle>

          <FormBuilder
            title=""
            fields={tableFields}
            defaultValues={editingTable || {}}
            onSubmit={editingTable ? handleUpdate : handleCreate}
          />
        </DialogContent>
      </Dialog>

      <DeleteDialog
        isOpen={deleteOpen}
        isLoading={false}
        title="Delete Table?"
        description={`"${selectedTable?.tableName}" will be removed.`}
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </>
  );
}