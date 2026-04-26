import { Badge } from "@/components/ui/badge"
import {
  TabletSmartphone,
  Users,
  QrCode,
  TrendingUp,
  ArrowUpLeft,
  UtensilsCrossed,
  Truck,
  Store,
} from "lucide-react"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-background">

      {/* LEFT SIDE - BRAND / INFO */}
      <div className="relative hidden lg:flex items-center justify-center px-10">

        {/* background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <div className="absolute inset-0 bg-grid-primary/10 [mask-image:radial-gradient(circle_at_center,white,transparent)]" />

        <div className="relative z-10 max-w-md space-y-10">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
              <TabletSmartphone className="size-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              SmartTable
            </span>
          </div>

          {/* HEADLINE */}
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight">
              Run your restaurant smarter with QR dining and online orders
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A unified system to manage table-side QR ordering, kitchen flow, and online customers — all in one dashboard.
            </p>
          </div>

          {/* MODES */}
          <div className="space-y-3">

            <FeatureCard
              icon={<UtensilsCrossed className="size-4" />}
              title="QR Table Ordering"
              desc="Guests scan a QR at their table and place orders instantly — no waiting staff needed"
            />

            <FeatureCard
              icon={<Truck className="size-4" />}
              title="Online Ordering System"
              desc="Accept delivery and pickup orders from your website or customers remotely"
            />

            <FeatureCard
              icon={<Store className="size-4" />}
              title="Restaurant Dashboard"
              desc="Manage menu, staff, tables, orders, and reports in real time"
            />

          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-3">
            <Stat icon={<Users className="size-4" />} value="1.2k+" label="Active Users" />
            <Stat icon={<QrCode className="size-4" />} value="4.5k+" label="QR Orders" />
            <Stat icon={<TrendingUp className="size-4" />} value="92%" label="Efficiency" />
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2">
            <Tag text="QR Dining" />
            <Tag text="Online Orders" />
            <Tag text="Kitchen System" />
            <Tag text="Real-time Sync" />
          </div>

          <p className="text-xs text-muted-foreground pt-4">
            © 2026 SmartTable — Built for modern restaurant operations
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - AUTH */}
      <div className="relative flex items-center justify-center px-6 md:px-10">

        {/* top nav */}
        <div className="absolute top-5 left-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition"
          >
            <Badge variant="outline" className="p-1">
              <ArrowUpLeft className="size-3.5" />
            </Badge>
            Back to Home
          </Link>
        </div>

        {/* auth container */}
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}

/* ================= UI COMPONENTS ================= */

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="flex gap-3 rounded-xl border bg-background/60 backdrop-blur-sm p-4 hover:bg-background/80 transition">
      <div className="text-primary mt-0.5">{icon}</div>
      <div className="space-y-1">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground leading-relaxed">
          {desc}
        </div>
      </div>
    </div>
  )
}

function Stat({ icon, value, label }: any) {
  return (
    <div className="rounded-xl border bg-background/60 p-3 text-center space-y-1">
      <div className="flex justify-center text-muted-foreground">
        {icon}
      </div>
      <div className="text-sm font-semibold">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  )
}

function Tag({ text }: any) {
  return (
    <div className="rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
      {text}
    </div>
  )
}