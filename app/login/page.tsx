"use client"

import { useState } from "react"
import {
    ArrowUpLeft,
    Smartphone,
    TabletSmartphone,
    Users,
    QrCode,
    TrendingUp,
} from "lucide-react"

import { LoginForm } from "@/components/login-form"
import { SignupForm } from "@/components/signup-form"

type Mode = "login" | "signup"

export default function AuthPage() {
    const [mode, setMode] = useState<Mode>("login")

    return (
        <div className="grid min-h-svh lg:grid-cols-2">

            {/* LEFT SIDE - BRAND */}
            <div className="relative hidden flex-col justify-between bg-gradient-to-br from-primary/5 via-primary/10 to-background p-8 lg:flex">
                <div className="absolute inset-0 bg-grid-primary/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
                <div className="relative z-10 flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
                        <TabletSmartphone className="size-5" />
                    </div>
                    <span className="text-xl font-semibold tracking-tight">SmartTable</span>
                </div>

                <div className="relative z-10 space-y-8">
                    <div className="space-y-3">
                        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                            Welcome to <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">SmartTable</span>
                        </h1>
                        <p className="max-w-md text-muted-foreground">
                            The complete solution for modern tables. Manage orders, track customers, and grow your business with QR-powered technology.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4">
                        <div className="rounded-2xl border bg-background/50 backdrop-blur-sm p-4 shadow-sm">
                            <Users className="mb-2 h-5 w-5 text-primary" />
                            <div className="text-2xl font-bold">1,234</div>
                            <div className="text-xs text-muted-foreground">Total Clients</div>
                        </div>
                        <div className="rounded-2xl border bg-background/50 backdrop-blur-sm p-4 shadow-sm">
                            <Users className="mb-2 h-5 w-5 text-primary" />
                            <div className="text-2xl font-bold">5,678</div>
                            <div className="text-xs text-muted-foreground">Total Customers</div>
                        </div>
                        <div className="rounded-2xl border bg-background/50 backdrop-blur-sm p-4 shadow-sm">
                            <QrCode className="mb-2 h-5 w-5 text-primary" />
                            <div className="text-2xl font-bold">4,521</div>
                            <div className="text-xs text-muted-foreground">QR Scans</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                        <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm">
                            <Smartphone className="h-3.5 w-3.5" />
                            Table QR
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm">
                            <TrendingUp className="h-3.5 w-3.5" />
                            Online Platform
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm">
                            Real-time Analytics
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-xs text-muted-foreground">
                    © 2025 SmartTable. All rights reserved.
                </div>
            </div>

            {/* RIGHT SIDE - AUTH */}
            <div className="flex flex-col p-6 md:p-10">

                {/* TOP BAR */}
                <div className="flex items-center justify-between">

                    <a href="/" className="flex items-center gap-2 font-medium">
                        <ArrowUpLeft className="size-4" />
                        Home
                    </a>
                </div>

                {/* FORM AREA */}
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md">

                        {mode === "login" ? (
                            <LoginForm setMode={setMode} />
                        ) : (
                            <SignupForm setMode={setMode} />
                        )}

                    </div>
                </div>

            </div>
        </div>
    )
}