"use client";

import { useMemo, useState } from "react";
import DataTable, { type ColumnDefinition } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash, MoreHorizontal, PrinterCheck } from "lucide-react";
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

/** ===================== TYPE ===================== */
interface Order {
    id: string;
    user: {
        name: string;
        phone: string;
        email?: string;
    };
    address: string;
    items: {
        name: string;
        qty: number;
        price: number;
    }[];
    total: number;
    status: string;
    paymentStatus: string;
    createdAt: string;
}

/** ===================== FORM ===================== */
const orderFields: FormField[] = [
    {
        name: "status",
        label: "Order Status",
        type: "select",
        options: [
            { label: "Pending", value: "Pending" },
            { label: "Preparing", value: "Preparing" },
            { label: "Completed", value: "Completed" },
        ],
    },
    {
        name: "paymentStatus",
        label: "Payment Status",
        type: "select",
        options: [
            { label: "Paid", value: "Paid" },
            { label: "Unpaid", value: "Unpaid" },
        ],
    },
];

/** ===================== SAMPLE DATA ===================== */
const initialOrders: Order[] = [
    {
        id: "ORD001",
        user: { name: "Ram Bahadur", phone: "9800000000" },
        address: "Kathmandu",
        items: [
            { name: "Momo", qty: 2, price: 150 },
            { name: "Coke", qty: 1, price: 100 },
        ],
        total: 400,
        status: "Pending",
        paymentStatus: "Unpaid",
        createdAt: "2026-04-25 10:30 AM",
    },
    {
        id: "ORD002",
        user: { name: "Sita Lama", phone: "9811111111" },
        address: "Lalitpur",
        items: [{ name: "Chowmein", qty: 1, price: 200 }],
        total: 200,
        status: "Preparing",
        paymentStatus: "Paid",
        createdAt: "2026-04-25 11:00 AM",
    },
];

/** ===================== PAGE ===================== */
export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const [userModal, setUserModal] = useState(false);
    const [orderModal, setOrderModal] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    /** ===================== HANDLERS ===================== */
    const handleUpdate = async (values: any) => {
        if (!selectedOrder) return;

        setOrders((prev) =>
            prev.map((o) =>
                o.id === selectedOrder.id ? { ...o, ...values } : o
            )
        );

        setFormOpen(false);
    };

    const handleDelete = () => {
        if (!selectedOrder) return;

        setOrders((prev) =>
            prev.filter((o) => o.id !== selectedOrder.id)
        );

        setDeleteOpen(false);
    };

    /** ===================== COLUMNS ===================== */
    const columns: ColumnDefinition<Order>[] = useMemo(
        () => [
            { id: "id", name: "Order ID" },

            {
                id: "user",
                name: "User Info",
                render: (order) => (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                            setSelectedOrder(order);
                            setUserModal(true);
                        }}
                    >
                        View User
                    </Button>
                ),
            },

            {
                id: "items",
                name: "Order Info",
                render: (order) => (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                            setSelectedOrder(order);
                            setOrderModal(true);
                        }}
                    >
                        View Items
                    </Button>
                ),
            },

            { id: "address", name: "Address" },

            {
                id: "total",
                name: "Total",
                render: (o) => `Rs. ${o.total}`,
            },

            { id: "status", name: "Status" },
            { id: "paymentStatus", name: "Payment" },
            { id: "createdAt", name: "Date & Time" },

            {
                id: "action",
                name: "Action",
                render: (order) => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DropdownMenuItem>
                                <PrinterCheck /> Print
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => {
                                    setSelectedOrder(order);
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
                                    setSelectedOrder(order);
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

    /** ===================== COLUMN VISIBILITY ===================== */
    const initialColumnVisibility = {
        id: true,
        user: true,
        items: true,
        address: true,
        total: true,
        status: true,
        paymentStatus: true,
        createdAt: false,
        action: true,
    };

    return (
        <>
            {/* ===================== TABLE ===================== */}
            <DataTable
                data={orders}
                columns={columns}
                searchKey="id"
                searchPlaceholder="Search order..."
                initialColumnVisibility={initialColumnVisibility}
                onAddClick={() => { }}
            />

            {/* ===================== USER MODAL ===================== */}
            <Dialog open={userModal} onOpenChange={setUserModal}>
                <DialogContent>
                    <DialogTitle>User Info</DialogTitle>

                    <div className="space-y-2 text-sm">
                        <p><b>Name:</b> {selectedOrder?.user.name}</p>
                        <p><b>Phone:</b> {selectedOrder?.user.phone}</p>
                        <p><b>Email:</b> {selectedOrder?.user.email || "-"}</p>
                        <p><b>Address:</b> {selectedOrder?.address}</p>
                    </div>
                </DialogContent>
            </Dialog>

            {/* ===================== ORDER MODAL ===================== */}
            <Dialog open={orderModal} onOpenChange={setOrderModal}>
                <DialogContent>
                    <DialogTitle>Order Items</DialogTitle>

                    <div className="space-y-2">
                        {selectedOrder?.items.map((item, i) => (
                            <div key={i} className="flex justify-between">
                                <span>{item.name} x {item.qty}</span>
                                <span>Rs. {item.qty * item.price}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>Rs. {selectedOrder?.total}</span>
                    </div>
                </DialogContent>
            </Dialog>

            {/* ===================== EDIT ===================== */}
            <Dialog open={formOpen} onOpenChange={setFormOpen}>
                <DialogContent>
                    <DialogTitle>Edit Order</DialogTitle>

                    <FormBuilder
                        title=""
                        fields={orderFields}
                        defaultValues={selectedOrder || {}}
                        onSubmit={handleUpdate}
                    />
                </DialogContent>
            </Dialog>

            {/* ===================== DELETE ===================== */}
            <DeleteDialog
                isOpen={deleteOpen}
                isLoading={false}
                title="Delete Order?"
                description={`Order "${selectedOrder?.id}" will be removed.`}
                confirmText="Delete"
                onConfirm={handleDelete}
                onCancel={() => setDeleteOpen(false)}
            />
        </>
    );
}