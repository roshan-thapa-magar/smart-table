"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
                className="flex justify-between items-center border rounded-md p-1.5 px-2 cursor-pointer dark:bg-muted"
                onClick={() => setOpen((prev) => !prev)}
            >
                {selectedLabel}
                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />

            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 w-full mt-1 border rounded-md bg-background dark:bg-muted shadow-md">
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
                            <div className="p-2 text-sm">
                                No results found
                            </div>
                        ) : (
                            filtered.map((opt, index) => (
                                <div
                                    key={`${opt.value}-${opt.label}-${index}`}
                                    className="flex items-center gap-2 p-2 hover:bg-background/50 cursor-pointer"
                                    onClick={() => {
                                        onChange(opt.value);
                                        setOpen(false);
                                        setSearch("");
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === opt.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
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