"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Category,
  CategoryList,
} from "@/pages/dashboard/categories/categories.validate"
import {
  currencyOptions,
  ProductFormValues,
  productSchema,
} from "@/pages/dashboard/products/products.validate"
import {
  categoryDashboardService,
  fileService,
  productDashboardService,
} from "@/services"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover"
import { HexColorPicker } from "react-colorful"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function CreateProductForm({
  onFileSelect,
}: {
  onFileSelect?: (file: File) => Promise<string>
}) {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      currency: "VND",
      category: "",
      stock: 0,
      colors: [],
      thumb: "",
    },
  })

  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [listCategories, setListCategories] = useState<CategoryList>([])

  const { fields, append, remove } = useFieldArray({
    control,
    name: "colors",
  })

  const onSubmit = async (data: ProductFormValues) => {
    console.log("Form submitted:", data)
    try {
      await productDashboardService.createProduct(data)
      toast.success("Sản phẩm đã được tạo thành công", {
        position: "top-center",
      })
      router.push("/dashboard/products")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error(String(error), { position: "top-center" })
    }
  }

  const handleUpload = async (file: File, folder: string) => {
    if (!file) return ""
    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", folder)

    try {
      setUploading(true)
      if (onFileSelect) {
        return await onFileSelect(file) // Sử dụng callback nếu có
      } else {
        const { url } = await fileService.uploadFile(formData)
        return url
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      return ""
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setPreview(URL.createObjectURL(file))

    const url = await handleUpload(file, "products")
    if (url) {
      setValue("thumb", url)
      setPreview(null) // Ẩn preview khi đã có ảnh thật
    }
  }

  const handleRemoveImage = () => {
    setValue("thumb", "")
    setPreview(null)
  }

  const handleColorFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    const url = await handleUpload(file, "product-colors")
    if (url) setValue(`colors.${index}.image`, url)
  }

  useEffect(() => {
    const listCategories = async () => {
      try {
        const { items } = await categoryDashboardService.getCategories({
          limit: 100,
          skip: 0,
        })
        setListCategories(items)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }
    listCategories()
  }, [])

  return (
    <Card className="w-full max-w-4xl lg:max-w-5xl mx-auto p-4 md:p-6 border-none">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Thêm sản phẩm</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label>Tên sản phẩm</Label>
            <Input {...register("name")} placeholder="Nhập tên sản phẩm" />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label>Mô tả</Label>
            <Textarea
              {...register("description")}
              placeholder="Nhập mô tả sản phẩm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Giá</Label>
              <Input
                type="number"
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            <div>
              <Label>Loại tiền</Label>
              <Select {...register("currency")}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại tiền" />
                </SelectTrigger>
                <SelectContent>
                  {currencyOptions.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.currency && (
                <p className="text-red-500 text-sm">
                  {errors.currency.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label>Danh mục</Label>
            <Select {...register("category")}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                {listCategories.map((category: Category) => (
                  <SelectItem key={category._id} value={category._id || ""}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <div>
            <Label>Tồn kho</Label>
            <Input
              type="number"
              {...register("stock", { valueAsNumber: true })}
            />
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock.message}</p>
            )}
          </div>

          <div>
            <Label>Ảnh sản phẩm</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="cursor-pointer"
            />

            <div className="mt-2 relative">
              {/* Image Container - Always present */}
              <div
                className={`relative h-32 w-32 border rounded overflow-hidden ${!preview && !watch("thumb") ? "border-dashed bg-gray-50 flex items-center justify-center" : ""}`}
              >
                {!preview && !watch("thumb") && (
                  <span className="text-gray-400">Chưa có ảnh</span>
                )}

                {/* Preview image with transition */}
                {preview && !watch("thumb") && (
                  <div className="absolute inset-0 transition-opacity duration-300">
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-cover transition-all duration-300"
                    />
                    {uploading && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                )}

                {/* Uploaded image with transition */}
                {watch("thumb") && (
                  <div className="absolute inset-0 transition-opacity duration-300">
                    <Image
                      src={watch("thumb")}
                      alt="Uploaded"
                      fill
                      className="object-cover transition-all duration-300"
                    />
                    <Button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                      size="sm"
                    >
                      ✕
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* colors */}
          <div>
            <Label className="text-base font-medium block mb-3">Màu sắc</Label>
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center p-3 border rounded-md"
                >
                  <div className="md:col-span-2">
                    <Label className="text-sm block mb-1">Tên màu</Label>
                    <Input
                      {...register(`colors.${index}.color`)}
                      placeholder="Tên màu"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <Label className="text-sm block mb-1">Mã màu</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className="w-full h-10 border rounded"
                          style={{
                            backgroundColor: watch(`colors.${index}.code`),
                          }}
                        />
                      </PopoverTrigger>
                      <PopoverContent>
                        <HexColorPicker
                          color={watch(`colors.${index}.code`)}
                          onChange={(newColor) =>
                            setValue(`colors.${index}.code`, newColor)
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="md:col-span-3">
                    <Label className="text-sm block mb-1">Giá riêng</Label>
                    <Input
                      type="number"
                      {...register(`colors.${index}.price`, {
                        valueAsNumber: true,
                        onChange: (e) => {
                          // If empty, reset to main price
                          if (e.target.value === "") {
                            setValue(`colors.${index}.price`, watch("price"))
                          }
                        },
                      })}
                      placeholder={watch("price").toString()}
                      defaultValue={watch("price")}
                      className="w-full"
                    />
                  </div>
                  <div className="md:col-span-4">
                    <Label className="text-sm block mb-1">Hình ảnh</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleColorFileChange(e, index)}
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="md:col-span-1 flex justify-center">
                    {watch(`colors.${index}.image`) && (
                      <div className="relative">
                        <Image
                          src={watch(`colors.${index}.image`)}
                          alt="Color Preview"
                          width={64}
                          height={64}
                          className="rounded border object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-1 flex justify-end">
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      variant="destructive"
                      className="h-10 w-10 p-0"
                    >
                      X
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  append({
                    color: "",
                    code: "#000000",
                    image: "",
                    price: watch("price"),
                  })
                }
                variant="secondary"
                className="mt-3"
              >
                + Thêm màu
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Lưu sản phẩm
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
