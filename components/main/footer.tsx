import Link from "next/link"
import { Mail, Coffee, Heart } from "lucide-react"
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Contact Us",
      links: [
        { label: "Kapan, Kathmandu", href: "#" },
        { label: "9813329678", href: "https://wa.me/9813329678" },
      ],
    },
    {
      title: "About Smart Table",
      links: [
        { label: "About", href: "#" },
        { label: "Delivery Charge", href: "#" },
      ],
    },
    {
      title: "Learn More",
      links: [
        { label: "Terms & Conditions", href: "#" },
        { label: "Privacy Policy", href: "#" },
      ],
    },
    {
      title: "Get Help",
      links: [
        { label: "Help & Support", href: "/" },
      ],
    },
  ]

  const socialLinks = [
    { icon: FaInstagram, href: "https://www.instagram.com/kyirmu_cafe", label: "Instagram", color: "hover:text-pink-600" },
    { icon: FaFacebook, href: "#", label: "Facebook", color: "hover:text-blue-600" },
    { icon: FaTiktok, href: "https://www.tiktok.com/@cafekyirmu?is_from_webapp=1&sender_device=pc", label: "TikTok", color: "hover:text-black dark:hover:text-white" },
    { icon: Mail, href: "mailto:cafekyirmu@gmail.com", label: "Email", color: "hover:text-amber-600" }
  ]

  return (
    <footer className="relative border-t border-border bg-gradient-to-b from-background to-secondary/5 mt-12 md:mt-16 overflow-hidden">

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

        {/* MAIN GRID */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 mb-12">

          {/* BRAND */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                <span className="text-primary-foreground font-bold text-sm">ST</span>
                <Coffee className="absolute -top-1 -right-1 w-3 h-3 text-amber-400" />
              </div>

              <div>
                <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  SMART TABLE
                </span>
                <p className="text-xs text-muted-foreground">Restaurant System</p>
              </div>
            </div>

            {/* SOCIAL */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg bg-secondary/50 text-muted-foreground ${social.color} transition hover:scale-110`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* SECTIONS */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section - Enhanced */}
        <div className="relative border-t border-border/60 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          {/* Decorative line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <p className="text-muted-foreground text-center sm:text-left flex flex-wrap items-center justify-center gap-1">
            <span>&copy; {currentYear} Cloud by Kyirmu. All rights reserved.</span>
            <span className="hidden sm:inline mx-2">•</span>
            <span className="flex items-center gap-1">
              Developed with <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> by
              <span className="font-semibold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Roshan Thapa Magar
              </span>
            </span>
            <span className="hidden sm:inline mx-2">•</span>
            <a href="tel:+9779742531161" className="hover:text-foreground transition-colors flex items-center gap-1">
              <span className="text-xs">📞</span> +977 9742531161
            </a>
          </p>

          <div className="flex gap-6">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm relative group"
            >
              Sitemap
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm relative group"
            >
              Status
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
          </div>
        </div>

        {/* Badge */}
        <div className="absolute bottom-4 right-4 opacity-70 hover:opacity-100 transition-opacity">
          <div className="text-[10px] text-muted-foreground bg-secondary/30 px-2 py-1 rounded-full border border-border/50 flex items-center gap-1">
            <span className="w-1 h-1 bg-primary rounded-full" />
            Kathmandu, Nepal  {/* More complete location */}
          </div>
        </div>
      </div>
    </footer>
  )
}