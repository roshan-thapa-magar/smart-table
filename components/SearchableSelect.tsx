"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";

interface Option {
    label: string;
    value: string;
}

interface SearchableSelectProps {
    label: string;
    value: string;
    options: Option[];
    onChange: (val: string) => void;
}

export default function SearchableSelect({
    label,
    value,
    options = [],
    onChange,
}: SearchableSelectProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        return options.filter((opt) =>
            opt.label.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, options]);

    const selectedLabel =
        options.find((o) => o.value === value)?.label || `Select ${label}`;

    return (
        <div className="relative w-full">
            {/* Trigger */}
            <div
                className="border rounded-md p-2 cursor-pointer bg-white"
                onClick={() => setOpen((prev) => !prev)}
            >
                {selectedLabel}
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 w-full mt-1 border rounded-md bg-white shadow-md">
                    {/* Search */}
                    <div className="p-2 border-b">
                        <Input
                            placeholder={`Search ${label}`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Options */}
                    <div className="max-h-40 overflow-auto">
                        {filtered.length === 0 ? (
                            <div className="p-2 text-sm text-gray-500">
                                No results found
                            </div>
                        ) : (
                            filtered.map((opt, index) => (
                                <div
                                    key={`${opt.value}-${opt.label}-${index}`}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        onChange(opt.value);
                                        setOpen(false);
                                        setSearch("");
                                    }}
                                >
                                    {opt.label}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}