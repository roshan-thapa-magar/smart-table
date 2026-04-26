import { Badge } from "@/components/ui/badge"
import {
  Smartphone,
  TabletSmartphone,
  Users,
  QrCode,
  TrendingUp,
  ArrowUpLeft,
} from "lucide-react"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">

      {/* LEFT SIDE - FIXED */}
      <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-primary/5 via-primary/10 to-background p-8">

        <div className="absolute inset-0 bg-grid-primary/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />

        {/* LOGO */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
            <TabletSmartphone className="size-5" />
          </div>
          <span className="text-xl font-semibold">SmartTable</span>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 space-y-8">
          <div>
            <h1 className="text-4xl font-bold">
              Welcome to SmartTable
            </h1>
            <p className="text-muted-foreground max-w-md">
              Manage orders, customers and grow your restaurant with QR system.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Stat icon={<Users className="h-5 w-5" />} value="1,234" label="Clients" />
            <Stat icon={<Users className="h-5 w-5" />} value="5,678" label="Customers" />
            <Stat icon={<QrCode className="h-5 w-5" />} value="4,521" label="QR Scans" />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Tag icon={<Smartphone className="h-4 w-4" />} text="Table QR" />
            <Tag icon={<TrendingUp className="h-4 w-4" />} text="Analytics" />
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          © 2025 SmartTable
        </div>
      </div>

      {/* RIGHT SIDE (ROUTED CONTENT) */}
      <div className="relative flex items-center justify-center p-6 md:p-10">

        {/* TOP BAR */}
        <div className="absolute top-4 left-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition"
          >
            <Badge variant="outline" className="p-1">
              <ArrowUpLeft className="h-3.5 w-3.5" />
            </Badge>

            Home
          </Link>
        </div>

        {/* CONTENT */}
        <div className="w-full max-w-md">
          {children}
        </div>

      </div>
    </div>
  )
}

function Stat({ icon, value, label }: any) {
  return (
    <div className="rounded-xl border p-4">
      {icon}
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}

function Tag({ icon, text }: any) {
  return (
    <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full text-sm">
      {icon}
      {text}
    </div>
  )
}