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

  const emailRef = useRef<HTMLInputElement>(null)
  const otpRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (step !== 1 || countdown <= 0) return
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown, step])

  useEffect(() => {
    if (step === 0) emailRef.current?.focus()
    if (step === 1) otpRef.current?.focus()
    if (step === 2) nameRef.current?.focus()
  }, [step])

  // ---- MOCK LOGIC ----

  const handleSendOtp = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!email) return toast('Email required')

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(1)
      setCountdown(60)
      toast('OTP sent (mock)')
    }, 800)
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp) return toast('Enter OTP')

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (otp === "000000") {
        setStep(2)
      } else {
        toast('Login success (mock)')
        closeModal()
      }
    }, 800)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) return toast('Fill all fields')

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast('Registered (mock)')
      closeModal()
    }, 800)
  }

  const handleGoogleLogin = () => {
    setLoadingGoogle(true)
    setTimeout(() => {
      setLoadingGoogle(false)
      toast('Google login (mock)')
      closeModal()
    }, 800)
  }

  // ---- FORM ----

  return (
    <div className={cn("min-h-screen flex items-center justify-center px-4", className)} {...props}>
      <Card className="w-full max-w-md shadow-2xl border-0 bg-muted">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            {step === 0 && 'Welcome Back'}
            {step === 1 && 'Check Your Email'}
            {step === 2 && 'Complete Profile'}
          </CardTitle>
          <CardDescription>
            {step === 0 && 'Sign in with email or Google'}
            {step === 1 && `We've sent a code to ${email}`}
            {step === 2 && 'Tell us about yourself'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === 0 && (
            <form onSubmit={handleSendOtp}>
              <FieldGroup>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      ref={emailRef}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="pl-9 h-11"
                      placeholder="you@example.com"
                    />
                  </div>
                </Field>

                <Button className="w-full h-11" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}
                  Login with OTP
                </Button>

                <div className="relative">
                  <div className="border-t" />
                  <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-background px-2 text-xs text-muted-foreground">
                    OR
                  </span>
                </div>

                <Button variant="outline" onClick={handleGoogleLogin} className="w-full h-11">
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
                    {[0, 1, 2].map(i => <InputOTPSlot key={i} index={i} />)}
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    {[3, 4, 5].map(i => <InputOTPSlot key={i} index={i} />)}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button className="w-full mt-3 h-11" disabled={loading}>
                Verify
              </Button>

              <Button variant="outline" onClick={() => setStep(0)} className="w-full mt-2">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleRegister}>
              <FieldGroup>
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input value={name} onChange={e => setName(e.target.value)} />
                </Field>

                <Field>
                  <FieldLabel>Phone</FieldLabel>
                  <Input value={phone} onChange={e => setPhone(e.target.value)} />
                </Field>

                <Button className="w-full">Complete</Button>
              </FieldGroup>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}