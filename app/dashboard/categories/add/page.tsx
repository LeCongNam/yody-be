"use client"

import { useRouter } from "next/navigation"
import {
  CategoryFormValues,
  categorySchema,
} from "@/pages/dashboard/categories/categories.validate"
import { categoryDashboardService } from "@/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function CreateCategoryForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const onSubmit = async (data: CategoryFormValues) => {
    console.log("Form submitted:", data)
    try {
      await categoryDashboardService.createCategory(data)
      toast.success("Danh mục đã được tạo thành công", {
        position: "top-center",
      })
      router.push("/dashboard/categories")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error(String(error), { position: "top-center" })
    }
  }

  return (
    <Card className="w-full max-w-4xl lg:max-w-5xl mx-auto p-4 md:p-6 border-none">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Thêm danh mục</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label>Tên danh mục</Label>
            <Input {...register("name")} placeholder="Nhập tên danh mục" />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label>Mô tả</Label>
            <Textarea
              {...register("description")}
              placeholder="Nhập mô tả danh mục"
            />
          </div>

          <Button type="submit" className="w-full">
            Lưu danh mục
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
