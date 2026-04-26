"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Bell } from "lucide-react";

const NotificationSheet = () => {
  return (
    <Sheet>
      {/* Trigger */}
      <SheetTrigger asChild>
        <button className="relative cursor-pointer">
          <Bell className="w-5 h-5" />
        </button>
      </SheetTrigger>

      {/* Empty Right Side Sheet */}
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationSheet;