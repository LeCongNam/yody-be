"use client"

import { useEffect } from "react"
import { loadStateFromLocalStorage } from "@/redux/features/auth/helper"
import { userService } from "@/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
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

import { setAuthState, updateUser } from "../../redux/features/auth/authSlice"
import { AppDispatch, RootState } from "../../redux/store"

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  avatar: z.string().url("Invalid URL").nullable(),
})

function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.auth.user)

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      username: "",
      email: "",
      avatar: "",
    },
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const authState = loadStateFromLocalStorage()
      console.log("🚀 ~ useEffect ~ authState:", authState)
      if (authState) {
        dispatch(setAuthState(authState))
      }
    }
  }, [dispatch])

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        if (user) {
          const userProfile = await userService.getUserById(user._id)
          form.reset({
            username: userProfile.username,
            email: userProfile.email,
            avatar: userProfile.avatar || "",
          })
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error)
      }
    }

    getUserProfile()
  }, [user, form])

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    dispatch(updateUser(data))
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Username"
                    {...field}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...field}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar URL</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Avatar URL"
                    {...field}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full py-2 rounded-md">
            Save
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ProfilePage
