"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import GoogleLogo from "@/pages/login/GoogleLogo"
import { login, setAuthState } from "@/redux/features/auth/authSlice"
import { loadStateFromLocalStorage } from "@/redux/features/auth/helper"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import ReCAPTCHA from "react-google-recaptcha"
import { useForm } from "react-hook-form"
import { toast, ToastContainer } from "react-toastify"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/logo"

import "react-toastify/dist/ReactToastify.css"

import { RootState } from "@/redux/store"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})

const Login01Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  })
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector((state: RootState) => state.auth.isLogin)

  // ✅ reCAPTCHA v2 (checkbox)
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const token = recaptchaRef.current?.getValue() // 🔹 Lấy token từ checkbox
      if (!token) {
        toast.error("Please verify the reCAPTCHA.", { position: "top-center" })
        return
      }
      setRecaptchaToken(token)

      const result = await dispatch(login({ ...data, recaptchaToken: token }))
      if (login.rejected.match(result)) {
        const errorMessage = result.payload || "Login failed"
        console.log("🚀 ~ onSubmit ~ result.payload:", result)
        toast.error(errorMessage, { position: "top-center" })
      }
    } catch (error) {
      console.error("🚀 ~ onSubmit ~ error:", error)
      toast.error("Login failed", { position: "top-center" })
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const authState = loadStateFromLocalStorage()
      if (authState) {
        dispatch(setAuthState(authState))
      }
    }
  }, [dispatch])

  useEffect(() => {
    if (isLogin) {
      router.push("/")
    }
  }, [isLogin, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-xs w-full flex flex-col items-center">
        <Link href="/">
          <Logo className="text-2xl" />
        </Link>
        <p className="mt-4 text-xl font-bold tracking-tight">Log in to Yody</p>

        <Button className="mt-8 w-full gap-3">
          <GoogleLogo />
          Continue with Google
        </Button>

        <div className="my-7 w-full flex items-center justify-center overflow-hidden">
          <Separator />
          <span className="text-sm px-2">OR</span>
          <Separator />
        </div>

        <Form {...form}>
          <form
            className="w-full space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="email"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ✅ Hiển thị reCAPTCHA Checkbox */}
            <div className="flex justify-center mt-2">
              {/* <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} // 🔹 Thay bằng Site Key của bạn
              /> */}
            </div>

            <Button type="submit" className="mt-4 w-full">
              Continue with Email
            </Button>
          </form>
        </Form>

        <div className="mt-5 space-y-5">
          <Link
            href="#"
            className="text-sm block underline text-muted-foreground text-center"
          >
            Forgot your password?
          </Link>
          <p className="text-sm text-center">
            Don&apos;t have an account?
            <Link
              href="/signup"
              className="ml-1 underline text-muted-foreground"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login01Page
