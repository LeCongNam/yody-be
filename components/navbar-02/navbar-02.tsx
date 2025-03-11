"use client"

import { useEffect } from "react"
import Link from "next/link"
import { logout, setAuthState } from "@/redux/features/auth/authSlice"
import { loadStateFromLocalStorage } from "@/redux/features/auth/helper"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { RootState } from "@/redux/store"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Logo } from "../logo"
import { NavMenu } from "./nav-menu"
import { NavigationSheet } from "./navigation-sheet"
import { ModeToggle } from "./toggle-theme"

const Navbar02Page = () => {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector((state: RootState) => state.auth.isLogin)
  const username = useAppSelector(
    (state: RootState) => state.auth?.user?.username || null
  )

  const handleLogout = () => {
    dispatch(logout())
  }

  const getUserName = () => {
    if (username) {
      return username[0].toUpperCase()
    } else {
      return "User"
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

  return (
    <nav className="h-16 bg-background border-b">
      <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Logo />
          </Link>
          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />
        </div>

        <div className="flex items-center gap-3">
          {isLogin ? (
            <>
              <Link href="/cart" className="relative">
                <CartIcon className="w-6 h-6" />
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-semibold text-lg hover:cursor-pointer">
                    {getUserName()}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" className="hidden sm:inline-flex">
                  Sign In
                </Button>
              </Link>
              <Button>Sign Up</Button>
              <Link href={isLogin ? "/cart" : "/login"} className="relative">
                <CartIcon className="w-6 h-6" />
              </Link>
            </>
          )}

          <ModeToggle />

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  )
}

const CartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 3h2l.4 2M7 13h10l4-8H5.4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="2" />
    <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="2" />
  </svg>
)

export default Navbar02Page
