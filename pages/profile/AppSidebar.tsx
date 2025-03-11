"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChartBarStacked,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  List,
  PlusCircle,
  Settings,
  ShoppingBag,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Logo } from "@/components/logo"

export function AppSidebar() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // Function to toggle expanded state
  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    )
  }

  // Menu items with nested structure
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Products",
      icon: ShoppingBag,
      children: [
        {
          title: "Products List",
          url: "/dashboard/products",
          icon: List,
        },
        {
          title: "Add Product",
          url: "/dashboard/products/add",
          icon: PlusCircle,
        },
      ],
    },
    {
      title: "Categories",
      icon: ChartBarStacked,
      children: [
        {
          title: "Category List",
          url: "/dashboard/categories",
          icon: List,
        },
        {
          title: "Add Category",
          url: "/dashboard/categories/add",
          icon: PlusCircle,
        },
      ],
    },
    {
      title: "Settings",
      url: "/profile/settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="pt-5">
            <div className="w-32 mx-auto mb-5">
              <Link href="/dashboard">
                <Logo />
              </Link>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.children ? (
                    <>
                      <SidebarMenuButton
                        onClick={() => toggleExpand(item.title)}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                        {expandedItems.includes(item.title) ? (
                          <ChevronDown className="ml-auto h-4 w-4" />
                        ) : (
                          <ChevronRight className="ml-auto h-4 w-4" />
                        )}
                      </SidebarMenuButton>

                      {expandedItems.includes(item.title) && (
                        <div className="pl-6 mt-1">
                          <SidebarMenu>
                            {item.children.map((child) => (
                              <SidebarMenuItem key={child.title}>
                                <SidebarMenuButton asChild>
                                  <Link href={child.url}>
                                    <child.icon />
                                    <span>{child.title}</span>
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        </div>
                      )}
                    </>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
