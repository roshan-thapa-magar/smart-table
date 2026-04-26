"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerHeader,
  DrawerClose,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ListFilterPlus, X } from "lucide-react";

type FilterOption = {
  label: string;
  value: string;
};

interface FilterProps {
  title: string;
  options: FilterOption[];
  selected: string[];
  onChange: (values: string[]) => void;
}

export function Filter({
  title,
  options,
  selected,
  onChange,
}: FilterProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const toggleValue = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  // =======================
  // 📦 DESKTOP CONTENT
  // =======================
  const DesktopContent = (
    <>
      <div className="mb-3 pb-2 border-b">
        <p className="font-semibold text-sm">Filter</p>
      </div>

      <div className="h-[300px] overflow-y-auto hide-scrollbar ">
        <div className="grid grid-cols-3 gap-2">
          {options.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2 cursor-pointer text-sm"
            >
              <Checkbox
                checked={selected.includes(opt.value)}
                onCheckedChange={() => toggleValue(opt.value)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <Button className="w-full mt-4">Apply</Button>
    </>
  );

  // =======================
  // 📱 MOBILE CONTENT (FLEX WRAP CHIPS)
  // =======================
  const MobileContent = (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isActive = selected.includes(opt.value);

          return (
            <label
              key={opt.value}
              className={`flex items-center gap-2 cursor-pointer border rounded-full px-3 py-1 text-sm transition
              ${
                isActive
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              <Checkbox
                checked={isActive}
                onCheckedChange={() => toggleValue(opt.value)}
              />
              <span>{opt.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );

  // =======================
  // 🖥 DESKTOP (Dropdown)
  // =======================
  if (isDesktop) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline"><ListFilterPlus />{title}</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[420px] p-3">
          {DesktopContent}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // =======================
  // 📱 MOBILE (Drawer)
  // =======================
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline"><ListFilterPlus />{title}</Button>
      </DrawerTrigger>

      <DrawerContent className="h-[90vh] flex flex-col">
        <DrawerHeader className="border-b">
          <div className="flex justify-between items-center">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerClose asChild>
              <button>
                <X size={20} />
              </button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <DrawerTitle className="sr-only">
          {title} Filter
        </DrawerTitle>

        {/* scrollable area */}
        <div className="flex-1 overflow-y-auto p-4">
          {MobileContent}
        </div>

        {/* sticky footer */}
        <div className="border-t p-4 bg-background">
          <Button className="w-full">Apply</Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}