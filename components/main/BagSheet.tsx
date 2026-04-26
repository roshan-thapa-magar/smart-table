"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ShoppingBag } from "lucide-react";

const BagSheet = () => {
  return (
    <Sheet>
      {/* Trigger */}
      <SheetTrigger asChild>
        <button className="relative cursor-pointer">
          <ShoppingBag className="w-5 h-5" />
        </button>
      </SheetTrigger>

      {/* Empty Right Side Sheet */}
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Your Bag</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default BagSheet;