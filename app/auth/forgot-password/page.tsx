"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // TODO: call API here
    console.log("Reset email sent to:", email)

    setSent(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email to reset your password
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!sent ? (
            <form onSubmit={handleSubmit}>
              <FieldGroup>

                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Field>

                <Field>
                  <Button className="w-full" type="submit">
                    Send Reset Link
                  </Button>
                </Field>

                <FieldDescription className="text-center">
                  Remember your password?{" "}
                  <Link href="/auth/login" className="underline">
                    Login
                  </Link>
                </FieldDescription>

              </FieldGroup>
            </form>
          ) : (
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                If this email exists, a reset link has been sent.
              </p>

              <Link href="/auth/login" className="underline">
                Back to login
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}