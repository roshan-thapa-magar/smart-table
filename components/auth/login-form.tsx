'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Mail, ArrowLeft, ArrowRight, User, Phone, Loader2 } from "lucide-react"
import { useAuthModal } from "@/context/auth-modal-context"
import { toast } from "sonner"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"
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

  // countdown
  useEffect(() => {
    if (step !== 1 || countdown <= 0) return
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown, step])

  // autofocus
  useEffect(() => {
    if (step === 0) emailRef.current?.focus()
    if (step === 1) otpRef.current?.focus()
    if (step === 2) nameRef.current?.focus()
  }, [step])

  // FRONTEND ONLY: fake OTP send
  const handleSendOtp = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!email) return toast('Email required')

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setStep(1)
      setCountdown(60)
      toast.success('OTP sent (mock)')
    }, 800)
  }

  // FRONTEND ONLY: fake OTP verify
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp) return toast('Enter OTP')

    setLoading(true)

    setTimeout(() => {
      setLoading(false)

      // fake rule: if otp is 6 digits continue else go register
      if (otp === "123456") {
        toast.success('Login successful (mock)')
        closeModal()
      } else {
        toast('User not found (mock) → go register')
        setStep(2)
      }
    }, 800)
  }

  // FRONTEND ONLY: fake register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone || !email) return toast('Fill all fields')

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

  const FormContent = () => (
    <CardContent>
      {step === 0 && (
        <form onSubmit={handleSendOtp}>
          <FieldGroup>
            <Field>
              <FieldLabel>Email Address</FieldLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
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

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <Button
              variant="outline"
              type="button"
              onClick={handleGoogleLogin}
              disabled={loadingGoogle}
              className="w-full h-11"
            >
              {loadingGoogle ? (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
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

          <Button type="submit" disabled={loading || !otp} className="w-full h-11 mt-3">
            {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : 'Verify & Continue'}
          </Button>

          <Button variant="outline" type="button" onClick={() => setStep(0)} className="w-full mt-2">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Email
          </Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleRegister}>
          <FieldGroup>
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
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
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
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
                {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : 'Complete Registration'}
              </Button>
            </div>
          </FieldGroup>
        </form>
      )}
    </CardContent>
  )

  return isDesktop ? (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-muted">
        <CardHeader className="text-center">
          <CardTitle>
            {step === 0 && 'Welcome Back'}
            {step === 1 && 'Check Your Email'}
            {step === 2 && 'Complete Profile'}
          </CardTitle>
          <CardDescription>
            {step === 0 && 'Sign in with email or Google'}
            {step === 1 && `Enter OTP sent to ${email}`}
            {step === 2 && 'Complete your profile'}
          </CardDescription>
        </CardHeader>
        {FormContent()}
      </Card>
    </div>
  ) : (
    <Drawer open onOpenChange={closeModal}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="text-center">
          <DrawerTitle>
            {step === 0 ? 'Welcome Back' : step === 1 ? 'Check Email' : 'Complete Profile'}
          </DrawerTitle>
          <DrawerDescription>
            {step === 0
              ? 'Login with email or Google'
              : step === 1
              ? `OTP sent to ${email}`
              : 'Fill your details'}
          </DrawerDescription>
        </DrawerHeader>

        <div className="overflow-y-auto max-h-[80vh] my-8">
          {FormContent()}
        </div>
      </DrawerContent>
    </Drawer>
  )
}