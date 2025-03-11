import React from "react"
import Link from "next/link"
import { AppSidebar } from "@/pages/profile/AppSidebar"
import { ArrowLeft } from "lucide-react"
import { Toaster } from "sonner"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const ProfileLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Link href="/">
          <div className="flex items-center gap-3 ml-2">
            <ArrowLeft />
            <p>Back to Home</p>
          </div>
        </Link>
        {children}
        <Toaster />
      </main>
    </SidebarProvider>
  )
}

export default ProfileLayout
