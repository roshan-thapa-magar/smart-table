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
  const [countdown, setCountdown] = useState(60)

  const { closeModal } = useAuthModal()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const emailRef = useRef<HTMLInputElement>(null)
  const otpRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  /* ✅ Fix iOS viewport (keyboard safe) */
  useEffect(() => {
    const setVH = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      )
    }

    setVH()
    window.addEventListener('resize', setVH)
    return () => window.removeEventListener('resize', setVH)
  }, [])

  /* ✅ Auto scroll focused input into center */
  useEffect(() => {
    const handler = (e: FocusEvent) => {
      const el = e.target as HTMLElement
      setTimeout(() => {
        el.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }, 300)
    }

    document.addEventListener('focusin', handler)
    return () => document.removeEventListener('focusin', handler)
  }, [])

  /* countdown */
  useEffect(() => {
    if (step !== 1 || countdown <= 0) return
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown, step])

  /* autofocus */
  useEffect(() => {
    if (step === 0) emailRef.current?.focus()
    if (step === 1) otpRef.current?.focus()
    if (step === 2) nameRef.current?.focus()
  }, [step])

  const handleSendOtp = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => {
      setStep(1)
      setCountdown(60)
      setLoading(false)
    }, 800)
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      closeModal()
    }, 800)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      closeModal()
    }, 800)
  }

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true)
    setTimeout(() => setLoadingGoogle(false), 1200)
  }

  const FormContent = () => (
    <CardContent>
      {step === 0 && (
        <form onSubmit={handleSendOtp}>
          <FieldGroup>
            <Field>
              <FieldLabel>Email Address</FieldLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  ref={emailRef}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  className="pl-9 h-11"
                />
              </div>
            </Field>

            <Button className="w-full h-11" disabled={loading}>
              {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}
              Login with OTP
            </Button>

            <Button type="button" variant="outline" onClick={handleGoogleLogin} className="w-full h-11">
              {loadingGoogle ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <IoLogoGoogle />}
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

          <Button className="w-full mt-4" disabled={loading || !otp}>
            {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : 'Verify & Continue'}
          </Button>

          <Button type="button" variant="outline" onClick={() => setStep(0)} className="w-full mt-2">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleRegister}>
          <FieldGroup>
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-9 h-11"
                />
              </div>
            </Field>

            <Button className="w-full h-11" disabled={loading}>
              {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : 'Complete Registration'}
            </Button>
          </FieldGroup>
        </form>
      )}
    </CardContent>
  )

  if (isDesktop) {
    return (
      <div className={cn('flex flex-col gap-6', className)} {...props}>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>
              {step === 0 && 'Welcome Back'}
              {step === 1 && 'Check OTP'}
              {step === 2 && 'Complete Profile'}
            </CardTitle>
            <CardDescription>
              {step === 0 && 'Login with email or Google'}
              {step === 1 && `OTP sent to ${email}`}
              {step === 2 && 'Finish registration'}
            </CardDescription>
          </CardHeader>
          {FormContent()}
        </Card>
      </div>
    )
  }

  return (
    <Drawer open onOpenChange={closeModal}>
      <DrawerContent className="max-h-[90dvh] flex flex-col">
        <DrawerHeader className="text-center">
          <DrawerTitle>
            {step === 0 ? 'Welcome Back' : step === 1 ? 'Check OTP' : 'Complete Profile'}
          </DrawerTitle>
          <DrawerDescription>
            {step === 0
              ? 'Login with email or Google'
              : step === 1
              ? `OTP sent to ${email}`
              : 'Finish registration'}
          </DrawerDescription>
        </DrawerHeader>

        {/* ✅ KEY FIX AREA */}
        <div className="flex-1 overflow-y-auto pb-36 px-4 overscroll-contain max-h-[calc(var(--vh,1vh)*80)]">
          {FormContent()}
        </div>
      </DrawerContent>
    </Drawer>
  )
}