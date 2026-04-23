"use client"

import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "./theme-toggle"

const UserAvatar = () => {
  // 🔹 Static UI data (no backend)
  const user = {
    name: "Roshan",
    image: "https://github.com/shadcn.png",
    role: "owner", // change manually for testing
  }


  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-6 h-6 cursor-pointer">
              <AvatarImage src={user.image} />
              <AvatarFallback>
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuItem asChild>
              <Link href="/user/profile">View Profile</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <div className="flex justify-between items-center px-2 py-2">
              <p>Theme</p>
              <ThemeToggle />
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-500 cursor-pointer"
              onClick={() => alert("Logged out")}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="block md:hidden">
        <Link href="/user/profile">
          <Avatar className="w-6 h-6 cursor-pointer">
            <AvatarImage src={user.image} />
            <AvatarFallback>
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </>
  )
}

export default UserAvatar