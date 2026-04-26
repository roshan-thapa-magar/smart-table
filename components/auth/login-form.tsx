'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@/components/ui/input-otp"
import {
  Mail, ArrowLeft, ArrowRight, User, Phone, Loader2
} from "lucide-react"
import { useAuthModal } from "@/context/auth-modal-context"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { useEffect, useRef, useState } from "react"
import { IoLogoGoogle } from "react-icons/io5";

export function LoginForm() {
  const [step, setStep] = useState<0 | 1 | 2>(0)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)

  const { closeModal } = useAuthModal()

  const emailRef = useRef<HTMLInputElement>(null)
  const otpRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  // ✅ AUTO FOCUS ON STEP CHANGE (important fix)
  useEffect(() => {
    setTimeout(() => {
      if (step === 0) emailRef.current?.focus()
      if (step === 1) otpRef.current?.focus()
      if (step === 2) nameRef.current?.focus()
    }, 120)
  }, [step])

  const handleSendOtp = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!email) return

    setLoading(true)
    setTimeout(() => {
      setStep(1)
      setLoading(false)
    }, 600)
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp) return

    setLoading(true)
    setTimeout(() => {
      setStep(2)
      setLoading(false)
    }, 600)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) return

    setLoading(true)
    setTimeout(() => {
      closeModal()
      setLoading(false)
    }, 600)
  }

  const handleGoogleLogin = () => {
    setLoadingGoogle(true)
    setTimeout(() => {
      closeModal()
      setLoadingGoogle(false)
    }, 600)
  }

  return (
    <Dialog open={true} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-2xl border shadow-2xl">

        {/* HEADER */}
        <DialogHeader className="text-center px-6 pt-6 pb-3 space-y-1">
          <DialogTitle className="text-xl font-semibold">
            {step === 0 && "Welcome back"}
            {step === 1 && "Verify OTP"}
            {step === 2 && "Complete profile"}
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground">
            {step === 0 && "Login with email or Google"}
            {step === 1 && `Enter the code sent to ${email}`}
            {step === 2 && "Just a few details left"}
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5">

          {/* STEP 0 */}
          {step === 0 && (
            <form onSubmit={handleSendOtp} className="space-y-4">

              <FieldGroup>
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    ref={emailRef}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-12 rounded-lg"
                  />
                </Field>
              </FieldGroup>

              <Button className="w-full h-12 rounded-lg">
                {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}
                Continue
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">or</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
                disabled={loadingGoogle}
                className="w-full h-12 rounded-lg gap-2"
              >
                {loadingGoogle ? <Loader2 className="animate-spin w-4 h-4" /> : <IoLogoGoogle />}
                Google
              </Button>
            </form>
          )}

          {/* STEP 1 - OTP (FIXED UX) */}
          {step === 1 && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">

              <div className="flex justify-center">
                <InputOTP
                  value={otp}
                  onChange={setOtp}
                  maxLength={6}
                  autoFocus
                  className="gap-4"   // ✅ FIXED GAP BETWEEN BOXES
                >
                  <InputOTPGroup className="gap-4">
                    {[0, 1, 2].map(i => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        ref={i === 0 ? otpRef : null}
                        className="
                          w-12 h-14 text-lg font-semibold
                          rounded-lg border
                          focus:ring-2 focus:ring-primary/40
                          transition-all
                        "
                      />
                    ))}
                  </InputOTPGroup>

                  <InputOTPSeparator />

                  <InputOTPGroup className="gap-4">
                    {[3, 4, 5].map(i => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="
                          w-12 h-14 text-lg font-semibold
                          rounded-lg border
                          focus:ring-2 focus:ring-primary/40
                          transition-all
                        "
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                type="submit"
                disabled={loading || !otp}
                className="w-full h-12 rounded-lg"
              >
                {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : "Verify OTP"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(0)}
                className="w-full h-12 text-muted-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Change email
              </Button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleRegister} className="space-y-4">

              <FieldGroup>
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    ref={nameRef}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="h-12 rounded-lg"
                    placeholder="John Doe"
                  />
                </Field>

                <Field>
                  <FieldLabel>Phone</FieldLabel>
                  <Input
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="h-12 rounded-lg"
                    placeholder="98XXXXXXXX"
                  />
                </Field>
              </FieldGroup>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 h-12 rounded-lg"
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 h-12 rounded-lg"
                >
                  {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : "Finish"}
                </Button>
              </div>
            </form>
          )}

        </div>
      </DialogContent>
    </Dialog>
  )
}