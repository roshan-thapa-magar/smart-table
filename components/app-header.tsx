"use client";
import { usePathname } from "next/navigation";
import { Bell, Globe } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle"
import UserAvatar from "./UserAvatar";

const routeNames: Record<string, string> = {
    "/home": "Home",
    "/pos": "Point Of Sales",
    "/kds": "Kitchen Dispaly System",
    "/user/categories": "User Categories",
    "/user": "Users",
    "/tables": "Tables",
    "/tables/departments": "Table Sections",
    "/menu/categories": "Menu Categories",
    "/menu/stocks": "Inventory",
    "/staffs": "Staff Management",
    "/staffs/position": "Roles",
    "/staffs/attendance": "Attendance",
    "/report/sales": "Sales Report",
    "/report/purchase": "Purchase Report",
    "/user/setting": "Settings",
    "/user/profile": "Profile",
};

export function AppHeader() {
    const pathname = usePathname();
    const currentPage = routeNames[pathname] || "Dashboard";

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-2">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">Smart Table</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{currentPage}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            {/* Right-side icons */}
            <div className="flex items-center gap-2">
                {/* <ThemeToggle /> */}
                <Button variant="ghost" size="icon">
                    <Bell className="h-4 w-4" />
                </Button>
                <UserAvatar />
            </div>
        </header>
    );
}