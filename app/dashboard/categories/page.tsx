"use client"

import { useState } from "react"
import Link from "next/link"
import { Category } from "@/pages/dashboard/categories/categories.validate"
import { categoryDashboardService } from "@/services"
import { Edit, Trash2 } from "lucide-react"
import { ToastContainer } from "react-toastify"
import { toast } from "sonner"

import DataTable from "@/components/DataTable"

export default function CategoriesPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Define columns for the DataTable using the expected format
  const columns = [
    {
      key: "#",
      label: "#",
      render: (row, index) => (currentPage - 1) * 10 + (index + 1),
    },
    {
      key: "id",
      label: "ID",
    },
    {
      key: "name",
      label: "Name",
    },
    {
      key: "description",
      label: "Description",
    },
    {
      key: "status",
      label: "Status",
      render: (row: Category & { status: string }) => {
        const status = getStatusBadge(row.status)
        return (
          <span
            className={`px-2 py-1 rounded text-xs bg-${status.color}-100 text-${status.color}-800`}
          >
            {status.text}
          </span>
        )
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: Category & { id: string }) => (
        <div className="flex space-x-2">
          <Link
            href={`/dashboard/categories/edit/${row._id}`}
            className="p-1 text-blue-600 hover:text-blue-800 rounded"
            title="Edit"
          >
            <Edit className="h-5 w-5" />
          </Link>
          <button
            onClick={() => handleDeleteCategory(row)}
            className="p-1 text-red-600 hover:text-red-800 rounded"
            title="Delete"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ]

  const handleDeleteCategory = (category: Category) => {
    toast.custom(
      (t: any) => (
        <div className="flex flex-col gap-4 p-4 dark:bg-black rounded shadow-lg border">
          <p className="font-medium">
            Are you sure you want to delete {category.name}?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => toast.dismiss(t._id)}
              className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => confirmDeleteCategory(t._id, category)}
              className="px-3 py-2 bg-red-500  rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    )
  }

  const confirmDeleteCategory = async (toastId: string, category: Category) => {
    // Đóng hộp thoại xác nhận
    toast.dismiss(toastId)

    // Hiển thị trạng thái loading
    const loadingToast = toast.loading(`Deleting ${category.name}...`)

    try {
      if (category._id)
        await categoryDashboardService.deleteCategory(category._id)
      else console.log("No category ID found")

      // Hiển thị thành công
      toast.success(`Successfully deleted ${category.name}`, {
        id: loadingToast,
      })

      // Refresh dữ liệu
      await fetchData({ page: currentPage, limit: 10 }) // Đảm bảo truyền đúng giá trị page
    } catch (error) {
      console.error("Error deleting category:", error)

      // Hiển thị lỗi
      toast.error(`Failed to delete ${category.name}`, { id: loadingToast })
    }
  }

  // Get status badge based on category status
  const getStatusBadge = (status?: string) => {
    if (!status) return { color: "gray", text: "Unknown" }

    switch (status) {
      case "Active":
        return { color: "green", text: "Active" }
      case "Inactive":
        return { color: "red", text: "Inactive" }
      default:
        return { color: "gray", text: status }
    }
  }

  // Create fetchData function with loading state management
  const fetchData = async ({
    page,
    limit,
    search,
  }: {
    page: number
    limit: number
    search?: string
  }) => {
    try {
      setIsLoading(true)
      // Add a slight delay to ensure loading state is visible
      // This helps users perceive the loading state
      await new Promise((r) => setTimeout(r, 200))
      setCurrentPage(page)
      const response = await categoryDashboardService.getCategories({
        skip: page - 1,
        limit: limit,
        ...(search ? { search } : {}),
      })

      return {
        items: response?.items || [],
        total: response?.count || 0,
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
      return { items: [], total: 0 }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Categories</h1>
      </div>

      <DataTable
        columns={columns}
        fetchData={fetchData}
        itemsPerPage={10}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        className={isLoading ? "opacity-70 pointer-events-none" : ""}
      />

      <ToastContainer />
    </div>
  )
}
