'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Mail, ArrowLeft, ArrowRight, User, Phone, Loader2 } from "lucide-react"
import { useAuthModal } from "@/context/auth-modal-context"
import { toast } from "sonner"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
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

  // ✅ REAL iOS keyboard safe focus handler
  useEffect(() => {
    const handleFocus = (e: any) => {
      const el = e.target

      setTimeout(() => {
        el?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest"
        })
      }, 250)
    }

    document.addEventListener("focusin", handleFocus)
    return () => document.removeEventListener("focusin", handleFocus)
  }, [])

  // autofocus per step
  useEffect(() => {
    if (step === 0) emailRef.current?.focus()
    if (step === 1) otpRef.current?.focus()
    if (step === 2) nameRef.current?.focus()
  }, [step])

  // ---------------- HANDLERS ----------------

  const handleSendOtp = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!email) return toast.error('Email required')

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(1)
      toast.success('OTP sent (mock)')
    }, 800)
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp) return toast.error('Enter OTP')

    setLoading(true)
    setTimeout(() => {
      setLoading(false)

      if (otp === "123456") {
        toast.success('Login successful (mock)')
        closeModal()
      } else {
        toast.error('User not found → register')
        setStep(2)
      }
    }, 800)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone || !email) return toast.error('Fill all fields')

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success('Registered successfully (mock)')
      closeModal()
    }, 1000)
  }

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true)
    setTimeout(() => {
      setLoadingGoogle(false)
      toast.success('Google login success (mock)')
      closeModal()
    }, 1000)
  }

  // ---------------- FORM UI ----------------

  const FormContent = () => (
    <CardContent className="space-y-5">
      {step === 0 && (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel>Email Address</FieldLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="pl-9 h-11"
                />
              </div>
            </Field>

            <Button type="submit" disabled={loading} className="w-full h-11">
              {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}
              Login with OTP
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={loadingGoogle}
              className="w-full h-11"
            >
              {loadingGoogle ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <IoLogoGoogle />}
              Continue with Google
            </Button>
          </FieldGroup>
        </form>
      )}

      {step === 1 && (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
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

          <Button type="submit" disabled={loading} className="w-full h-11">
            {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : 'Verify & Continue'}
          </Button>

          <Button type="button" variant="outline" onClick={() => setStep(0)} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleRegister} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  ref={nameRef}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="pl-9 h-11"
                />
              </div>
            </Field>

            <Field>
              <FieldLabel>Phone Number</FieldLabel>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="98XXXXXXXX"
                  className="pl-9 h-11"
                />
              </div>
            </Field>

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 h-11">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>

              <Button type="submit" disabled={loading} className="flex-1 h-11">
                {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : 'Complete'}
              </Button>
            </div>
          </FieldGroup>
        </form>
      )}
    </CardContent>
  )

  // ---------------- RENDER ----------------

  return isDesktop ? (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-muted">
        <CardHeader className="text-center">
          <CardTitle>
            {step === 0 ? 'Welcome Back' : step === 1 ? 'Check Email' : 'Complete Profile'}
          </CardTitle>
        </CardHeader>
        {FormContent()}
      </Card>
    </div>
  ) : (
    <Drawer open onOpenChange={closeModal}>
      <DrawerContent className="flex flex-col max-h-[90vh]">

        {/* HEADER (fixed) */}
        <DrawerHeader className="shrink-0 text-center">
          <DrawerTitle>
            {step === 0 ? 'Welcome Back' : step === 1 ? 'Check Email' : 'Complete Profile'}
          </DrawerTitle>
        </DrawerHeader>

        {/* SCROLL AREA (ONLY ONE) */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-2 pb-10">
          <div className="max-w-md mx-auto w-full">
            {FormContent()}
          </div>
        </div>

      </DrawerContent>
    </Drawer>
  )
}