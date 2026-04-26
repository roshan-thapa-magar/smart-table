'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Mail, ArrowLeft, ArrowRight, User, Phone, Loader2 } from "lucide-react"
import { useAuthModal } from "@/context/auth-modal-context"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useEffect, useRef, useState } from "react"
import { IoLogoGoogle } from "react-icons/io5";

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

  // refs for autofocus
  const emailRef = useRef<HTMLInputElement>(null)
  const otpRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const formContainerRef = useRef<HTMLDivElement>(null)

  // countdown for OTP resend
  useEffect(() => {
    if (step !== 1 || countdown <= 0) return
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown, step])

  // autofocus input based on step
  useEffect(() => {
    if (step === 0) emailRef.current?.focus()
    if (step === 1) otpRef.current?.focus()
    if (step === 2) nameRef.current?.focus()
  }, [step])

  // Fix iOS body scroll when drawer is open
  useEffect(() => {
    if (!isDesktop) {
      // Store original scroll position
      const scrollY = window.scrollY
      
      // Lock body scroll
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      return () => {
        // Restore scroll position
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [isDesktop])

  // Handle input focus with smooth scrolling
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Small delay to let keyboard start opening
    setTimeout(() => {
      const inputElement = e.target
      const container = formContainerRef.current
      
      if (container) {
        // Calculate position to scroll to
        const inputRect = inputElement.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        const scrollOffset = inputRect.top - containerRect.top - 60 // 60px padding from top
        
        container.scrollTo({
          top: container.scrollTop + scrollOffset,
          behavior: 'smooth'
        })
      } else {
        inputElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    }, 100)
  }

  const handleSendOtp = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      // API call removed
      setStep(1)
      setCountdown(60)
    } catch {
      // Error handling removed
    } finally { setLoading(false) }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp) return
    setLoading(true)
    try {
      // Sign in logic removed
      closeModal()
    } catch {
      // Error handling removed
    } finally { setLoading(false) }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone || !email) return
    setLoading(true)
    try {
      // Registration logic removed
      closeModal()
    } catch {
      // Error handling removed
    } finally { setLoading(false) }
  }

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true)
    try {
      // Google sign in removed
    } catch {
      setLoadingGoogle(false)
    }
  }

  // Input field with fixed iOS styles
  const EmailInput = () => (
    <div className="relative">
      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      <Input
        ref={emailRef}
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="pl-9 h-11"
        style={{ fontSize: '16px' }} // Prevents iOS zoom
        onFocus={handleInputFocus}
        autoComplete="email"
        required
      />
    </div>
  )

  const NameInput = () => (
    <div className="relative">
      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      <Input
        ref={nameRef}
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter full name"
        className="pl-9 h-11"
        style={{ fontSize: '16px' }} // Prevents iOS zoom
        onFocus={handleInputFocus}
        autoComplete="name"
        required
      />
    </div>
  )

  const PhoneInput = () => (
    <div className="relative">
      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      <Input
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder="98XXXXXXXX"
        className="pl-9 h-11"
        style={{ fontSize: '16px' }} // Prevents iOS zoom
        onFocus={handleInputFocus}
        autoComplete="tel"
        type="tel"
        required
      />
    </div>
  )

  // single form rendering function
  const FormContent = () => (
    <div ref={formContainerRef} className="w-full">
      <CardContent className="p-6">
        {step === 0 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel className="text-sm font-medium">Email Address</FieldLabel>
                <EmailInput />
              </Field>
              <Button type="submit" disabled={loading} className="w-full h-11 text-base">
                {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}
                Login with OTP
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">or</span>
                </div>
              </div>
              <Button variant="outline" type="button" onClick={handleGoogleLogin} disabled={loadingGoogle} className="w-full h-11 text-base">
                {loadingGoogle ? (
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                ) : (
                  <IoLogoGoogle className="w-5 h-5 mr-2" />
                )}
                Continue with Google
              </Button>
            </FieldGroup>
          </form>
        )}

        {step === 1 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="flex justify-center py-4">
              <InputOTP 
                value={otp} 
                onChange={setOtp} 
                maxLength={6} 
                className="gap-2"
                onFocus={handleInputFocus as any}
              >
                <InputOTPGroup>
                  {[0, 1, 2].map(i => (
                    <InputOTPSlot 
                      key={i} 
                      index={i} 
                      className="w-12 h-12 text-lg font-semibold"
                      style={{ fontSize: '20px' }} // Prevents iOS zoom
                    />
                  ))}
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  {[3, 4, 5].map(i => (
                    <InputOTPSlot 
                      key={i} 
                      index={i} 
                      className="w-12 h-12 text-lg font-semibold"
                      style={{ fontSize: '20px' }} // Prevents iOS zoom
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button type="submit" disabled={loading || !otp} className="w-full h-11 text-base mt-2">
              {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : 'Verify & Continue'}
            </Button>
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => setStep(0)} 
              className="w-full h-11 text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Email
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleRegister} className="space-y-4">
            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel className="text-sm font-medium">Full Name</FieldLabel>
                <NameInput />
              </Field>
              <Field>
                <FieldLabel className="text-sm font-medium">Phone Number</FieldLabel>
                <PhoneInput />
              </Field>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 h-11 text-base">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button type="submit" disabled={loading} className="flex-1 h-11 text-base">
                  {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : 'Complete Registration'}
                </Button>
              </div>
            </FieldGroup>
          </form>
        )}
      </CardContent>
    </div>
  )

  // Desktop view
  if (isDesktop) {
    return (
      <div className={cn('flex flex-col gap-6', className)} {...props}>
        <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-muted">
          <CardHeader className="space-y-2 text-center pb-4">
            <CardTitle className="text-2xl font-bold tracking-tight">
              {step === 0 && 'Welcome Back'}
              {step === 1 && 'Check Your Email'}
              {step === 2 && 'Complete Profile'}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {step === 0 && 'Sign in with email or continue with Google'}
              {step === 1 && `We've sent a 6-digit code to ${email}`}
              {step === 2 && 'Tell us a bit about yourself'}
            </CardDescription>
          </CardHeader>
          {FormContent()}
        </Card>
      </div>
    )
  }

  // Mobile view (Drawer) with iOS fixes
  return (
    <Drawer open={true} onOpenChange={closeModal}>
      <DrawerContent 
        className="max-h-[90vh] rounded-t-3xl"
        style={{
          transform: 'translateZ(0)', // Force GPU acceleration
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <DrawerHeader className="text-center pt-6 pb-2">
          <DrawerTitle className="text-xl font-bold">
            {step === 0 ? 'Welcome Back' : step === 1 ? 'Check Your Email' : 'Complete Profile'}
          </DrawerTitle>
          <DrawerDescription className="text-sm text-muted-foreground mt-1">
            {step === 0 ? 'Sign in with email or continue with Google' : step === 1 ? `We've sent a 6-digit code to ${email}` : 'Tell us a bit about yourself'}
          </DrawerDescription>
        </DrawerHeader>
        <div 
          className="overflow-y-auto max-h-[70vh] pb-6"
          style={{
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
          }}
        >
          {FormContent()}
        </div>
      </DrawerContent>
    </Drawer>
  )
}