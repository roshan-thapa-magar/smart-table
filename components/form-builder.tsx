"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import SearchableSelect from "@/components/SearchableSelect";

export interface FormField {
    name: string;
    label: string;
    type:
        | "text"
        | "textarea"
        | "select"
        | "date"
        | "time"
        | "datetime"
        | "image"
        | "pdf";

    placeholder?: string;
    options?: { label: string; value: string }[];
    accept?: string;
}

interface FormBuilderProps {
    title: string;
    fields: FormField[];
    defaultValues?: any;
    onSubmit: (values: any) => Promise<void>;
}

export default function FormBuilder({
    title,
    fields,
    defaultValues = {},
    onSubmit,
}: FormBuilderProps) {
    const [formData, setFormData] = useState<any>(defaultValues);
    const [loading, setLoading] = useState(false);
    const [filePreviews, setFilePreviews] = useState<Record<string, string>>(
        {}
    );

    useEffect(() => {
        setFormData(defaultValues);

        const previews: Record<string, string> = {};

        fields.forEach((field) => {
            if (
                (field.type === "image" || field.type === "pdf") &&
                defaultValues?.[field.name]
            ) {
                previews[field.name] =
                    typeof defaultValues[field.name] === "string"
                        ? defaultValues[field.name]
                        : defaultValues[field.name]?.file;
            }
        });

        setFilePreviews(previews);
    }, [defaultValues, fields]);

    useEffect(() => {
        return () => {
            Object.values(filePreviews).forEach((url) => {
                if (url?.startsWith("blob:")) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [filePreviews]);

    const handleChange = (name: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (name: string, file: File) => {
        const url = URL.createObjectURL(file);

        handleChange(name, {
            file: url,
            type: file.type,
            name: file.name,
        });

        setFilePreviews((prev) => ({
            ...prev,
            [name]: url,
        }));
    };

    const handleSubmit = async () => {
        for (const field of fields) {
            if (!formData[field.name]) {
                toast.error(`${field.label} is required`);
                return;
            }
        }

        setLoading(true);
        try {
            await onSubmit(formData);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">{title}</h2>

            {/* GRID WRAPPER */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] md:max-h-none overflow-y-auto md:overflow-visible pr-1">
                {fields.map((field) => (
                    <div key={field.name} className="space-y-1">
                        <label className="text-sm font-medium">
                            {field.label}
                        </label>

                        {/* TEXT */}
                        {field.type === "text" && (
                            <Input
                                placeholder={field.placeholder}
                                value={formData[field.name] || ""}
                                onChange={(e) =>
                                    handleChange(field.name, e.target.value)
                                }
                            />
                        )}

                        {/* TEXTAREA */}
                        {field.type === "textarea" && (
                            <textarea
                                placeholder={field.placeholder}
                                value={formData[field.name] || ""}
                                onChange={(e) =>
                                    handleChange(field.name, e.target.value)
                                }
                                className="w-full min-h-[100px] border rounded-md p-2 text-sm"
                            />
                        )}

                        {/* DATE */}
                        {field.type === "date" && (
                            <Input
                                type="date"
                                value={formData[field.name] || ""}
                                onChange={(e) =>
                                    handleChange(field.name, e.target.value)
                                }
                            />
                        )}

                        {/* TIME */}
                        {field.type === "time" && (
                            <Input
                                type="time"
                                value={formData[field.name] || ""}
                                onChange={(e) =>
                                    handleChange(field.name, e.target.value)
                                }
                            />
                        )}

                        {/* DATETIME */}
                        {field.type === "datetime" && (
                            <div className="flex gap-2">
                                <Input
                                    type="date"
                                    className="flex-1"
                                    value={formData[field.name]?.date || ""}
                                    onChange={(e) =>
                                        handleChange(field.name, {
                                            ...formData[field.name],
                                            date: e.target.value,
                                        })
                                    }
                                />

                                <Input
                                    type="time"
                                    className="flex-1"
                                    value={formData[field.name]?.time || ""}
                                    onChange={(e) =>
                                        handleChange(field.name, {
                                            ...formData[field.name],
                                            time: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        )}

                        {/* SELECT */}
                        {field.type === "select" && (
                            <SearchableSelect
                                label={field.label}
                                value={formData[field.name] || ""}
                                options={field.options || []}
                                onChange={(val) =>
                                    handleChange(field.name, val)
                                }
                            />
                        )}

                        {/* IMAGE */}
                        {field.type === "image" && (
                            <>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e: any) =>
                                        e.target.files &&
                                        handleFileChange(
                                            field.name,
                                            e.target.files[0]
                                        )
                                    }
                                />

                                {filePreviews[field.name] && (
                                    <img
                                        src={filePreviews[field.name]}
                                        className="mt-2 w-32 h-32 object-cover rounded border"
                                    />
                                )}
                            </>
                        )}

                        {/* PDF */}
                        {field.type === "pdf" && (
                            <>
                                <Input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e: any) =>
                                        e.target.files &&
                                        handleFileChange(
                                            field.name,
                                            e.target.files[0]
                                        )
                                    }
                                />

                                {filePreviews[field.name] && (
                                    <a
                                        href={filePreviews[field.name]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 block text-blue-500 underline text-sm"
                                    >
                                        📄 View PDF
                                    </a>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* SUBMIT */}
            <Button
                className="w-full mt-4"
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <span className="flex items-center gap-2">
                        Saving <Loader2 className="w-4 h-4 animate-spin" />
                    </span>
                ) : (
                    "Submit"
                )}
            </Button>
        </div>
    );
}