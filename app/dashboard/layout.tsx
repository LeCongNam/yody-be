"use client"

import React, { memo, useEffect, useRef, useState } from "react"
import { AppSidebar } from "@/pages/profile/AppSidebar"
import { Bell, CheckCircle, LogOut, Trash2, User } from "lucide-react"
import { Toaster } from "sonner"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/navbar-02/toggle-theme"

type Notification = {
  id: number
  title: string
  body: string
  read: boolean
}

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState(false)
  const [notifs, setNotifs] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)

  const toggleTheme = () => setDarkMode(!darkMode)
  const markAllRead = () => setNotifs(notifs.map((n) => ({ ...n, read: true })))
  const clearNotifications = () => setNotifs([])

  // Infinite scroll logic
  const containerRef = useRef<HTMLDivElement>(null)

  // Fake API gọi thêm dữ liệu
  const fetchMoreNotifications = (offset: number) => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: offset + i + 1,
      title: `Thông báo ${offset + i + 1}`,
      body: `Nội dung chi tiết của thông báo ${offset + i + 1}.`,
      read: false,
    }))
  }

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current
        if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
          setLoading(true)
          setTimeout(() => {
            setNotifs((prev) => [
              ...prev,
              ...fetchMoreNotifications(prev.length),
            ])
            setLoading(false)
          }, 1000) // Giả lập API delay
        }
      }
    }

    const div = containerRef.current
    if (div) {
      div.addEventListener("scroll", handleScroll)
    }
    return () => {
      if (div) div.removeEventListener("scroll", handleScroll)
    }
  }, [loading])

  useEffect(() => {
    const initialNotifications = [
      {
        id: 1,
        title: "Đơn hàng mới",
        body: "Đơn hàng mới vừa được đặt!",
        read: false,
      },
      {
        id: 2,
        title: "User mới",
        body: "User mới đã đăng ký tài khoản.",
        read: false,
      },
      {
        id: 3,
        title: "Kho sắp hết hàng",
        body: "Sản phẩm trong kho sắp hết hàng.",
        read: true,
      },
      {
        id: 1,
        title: "Đơn hàng mới",
        body: "Đơn hàng mới vừa được đặt!",
        read: false,
      },
      {
        id: 2,
        title: "User mới",
        body: "User mới đã đăng ký tài khoản.",
        read: false,
      },
      {
        id: 3,
        title: "Kho sắp hết hàng",
        body: "Sản phẩm trong kho sắp hết hàng.",
        read: true,
      },

      {
        id: 1,
        title: "Đơn hàng mới",
        body: "Đơn hàng mới vừa được đặt!",
        read: false,
      },
      {
        id: 2,
        title: "User mới",
        body: "User mới đã đăng ký tài khoản.",
        read: false,
      },
      {
        id: 3,
        title: "Kho sắp hết hàng",
        body: "Sản phẩm trong kho sắp hết hàng.",
        read: true,
      },

      {
        id: 1,
        title: "Đơn hàng mới",
        body: "Đơn hàng mới vừa được đặt!",
        read: false,
      },
      {
        id: 2,
        title: "User mới",
        body: "User mới đã đăng ký tài khoản.",
        read: false,
      },
      {
        id: 3,
        title: "Kho sắp hết hàng",
        body: "Sản phẩm trong kho sắp hết hàng.",
        read: true,
      },
    ]
    setNotifs(initialNotifications)
  }, [])

  return (
    <SidebarProvider>
      {/* Sidebar */}
      <AppSidebar />

      <div className="flex flex-col w-full">
        {/* Navbar */}
        <nav className="w-full bg-white dark:bg-gray-900 shadow-md p-4 flex items-center justify-between">
          <SidebarTrigger />

          {/* Navbar Actions */}
          <div className="flex items-center gap-4">
            {/* Notification Icon */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
                  <Bell className="w-6 h-6" />
                  {notifs.some((n) => !n.read) && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      9+
                    </span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-96 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold">Thông báo</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={markAllRead}>
                      <CheckCircle className="w-4 h-4 mr-1" /> Read All
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={clearNotifications}
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Clear All
                    </Button>
                  </div>
                </div>
                {/* Scrollable List */}
                <div
                  ref={containerRef}
                  className="h-72 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600"
                >
                  {notifs.length > 0 ? (
                    notifs.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 rounded-md transition-opacity duration-200 hover:opacity-60 cursor-pointer ${notif.read ? "text-gray-400" : "font-bold"}`}
                      >
                        <p className="text-sm font-semibold">{notif.title}</p>
                        <p className="text-xs">{notif.body}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">
                      Không có thông báo nào.
                    </p>
                  )}
                  {loading && (
                    <p className="text-center text-gray-500">Đang tải...</p>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            {/* Toggle Theme */}
            <ModeToggle />
            {/* Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
                  <Avatar>
                    <AvatarImage
                      src="https://i.pravatar.cc/40"
                      alt="User Avatar"
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg"
              >
                <DropdownMenuItem className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" /> My Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-500">
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>

        {/* Main Content */}
        <main className="p-6">{children}</main>
      </div>

      <Toaster />
    </SidebarProvider>
  )
}

export default memo(DashboardLayout)
