'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@/components/ui/input-otp"
import {
  Mail,
  ArrowLeft,
  ArrowRight,
  User,
  Phone,
  Loader2
} from "lucide-react"
import { useAuthModal } from "@/context/auth-modal-context"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription
} from "@/components/ui/drawer"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useEffect, useRef, useState } from "react"
import { IoLogoGoogle } from "react-icons/io5"

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [step, setStep] = useState<0 | 1 | 2>(0)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)

  const { closeModal } = useAuthModal()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const emailRef = useRef<HTMLInputElement>(null)
  const otpRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  // autofocus
  useEffect(() => {
    if (step === 0) emailRef.current?.focus()
    if (step === 1) otpRef.current?.focus()
    if (step === 2) nameRef.current?.focus()
  }, [step])

  // scroll focused input into view (mobile fix)
  useEffect(() => {
    const handler = (e: FocusEvent) => {
      const el = e.target as HTMLElement
      setTimeout(() => {
        el.scrollIntoView({
          block: "center",
          behavior: "smooth",
        })
      }, 200)
    }

    document.addEventListener("focusin", handler)
    return () => document.removeEventListener("focusin", handler)
  }, [])

  const handleSendOtp = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => {
      setStep(1)
      setLoading(false)
    }, 600)
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      closeModal()
    }, 600)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      closeModal()
    }, 600)
  }

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true)
    setTimeout(() => setLoadingGoogle(false), 1000)
  }

  // ---------------------------
  // Divider FIX (your issue)
  // ---------------------------
  const Divider = () => (
    <div className="flex items-center gap-3 my-4">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs uppercase text-muted-foreground">or</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  )

  const FormContent = () => (
    <CardContent className="pb-6">
      {step === 0 && (
        <form onSubmit={handleSendOtp}>
          <FieldGroup>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                <Input
                  ref={emailRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 h-11"
                  type="email"
                />
              </div>
            </Field>

            <Button className="w-full h-11" disabled={loading}>
              {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <ArrowRight />}
              Login with OTP
            </Button>

            <Divider />

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="w-full h-11"
            >
              {loadingGoogle ? (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              ) : (
                <IoLogoGoogle />
              )}
              Continue with Google
            </Button>
          </FieldGroup>
        </form>
      )}

      {step === 1 && (
        <form onSubmit={handleVerifyOtp}>
          <div className="flex justify-center">
            <InputOTP value={otp} onChange={setOtp} maxLength={6}>
              <InputOTPGroup>
                {[0, 1, 2].map(i => (
                  <InputOTPSlot key={i} index={i} ref={i === 0 ? otpRef : null} />
                ))}
              </InputOTPGroup>

              <InputOTPSeparator />

              <InputOTPGroup>
                {[3, 4, 5].map(i => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button className="w-full mt-4" disabled={loading}>
            {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : "Verify"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => setStep(0)}
            className="w-full mt-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleRegister}>
          <FieldGroup>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                <Input
                  ref={nameRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-9 h-11"
                />
              </div>
            </Field>

            <Field>
              <FieldLabel>Phone</FieldLabel>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-9 h-11"
                />
              </div>
            </Field>

            <Button className="w-full h-11" disabled={loading}>
              {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : "Complete"}
            </Button>
          </FieldGroup>
        </form>
      )}
    </CardContent>
  )

  // ---------------------------
  // Desktop
  // ---------------------------
  if (isDesktop) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Login</CardTitle>
            <CardDescription>Sign in to continue</CardDescription>
          </CardHeader>
          {FormContent()}
        </Card>
      </div>
    )
  }

  // ---------------------------
  // Mobile Drawer (FIXED)
  // ---------------------------
  return (
    <Drawer open onOpenChange={closeModal}>
      <DrawerContent className="flex flex-col">
        <DrawerHeader className="text-center">
          <DrawerTitle>Login</DrawerTitle>
          <DrawerDescription>Continue with email or Google</DrawerDescription>
        </DrawerHeader>

        {/* ONLY ONE SCROLL CONTAINER */}
        <div className="flex-1 overflow-y-auto px-4 pb-32">
          {FormContent()}
        </div>
      </DrawerContent>
    </Drawer>
  )
}