"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
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

type Props = React.ComponentProps<"div"> & {
  setMode?: (mode: "login" | "signup") => void
}

export function SignupForm({ className, setMode, ...props }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // 🧠 cleanup memory leak
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Fill the form below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form>
            <FieldGroup>

              {/* IMAGE UPLOAD */}
              <div className="flex flex-col items-center gap-2">
                <label htmlFor="image" className="cursor-pointer">
                  <div className="h-24 w-24 rounded-full border flex items-center justify-center overflow-hidden bg-muted/30">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Upload Photo
                      </span>
                    )}
                  </div>
                </label>

                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

                <FieldDescription>
                  Profile picture (optional)
                </FieldDescription>
              </div>

              {/* NAME */}
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" type="text" placeholder="John Doe" required />
              </Field>

              {/* EMAIL */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              {/* PHONE */}
              <Field>
                <FieldLabel htmlFor="phone">Phone</FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+977 98XXXXXXXX"
                  required
                />
              </Field>

              {/* PASSWORD */}
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" type="password" required />
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input id="confirm-password" type="password" required />
                </Field>
              </div>

              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>

              {/* SUBMIT */}
              <Field>
                <Button type="submit" className="w-full">
                  Create Account
                </Button>

                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode?.("login")}
                    className="underline cursor-pointer"
                  >
                    Sign in
                  </button>
                </FieldDescription>
              </Field>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}