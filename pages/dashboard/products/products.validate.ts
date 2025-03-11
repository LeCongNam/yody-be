import { z } from "zod"

export const currencyOptions = ["VND", "USD", "EUR"] as const

export const colorSchema = z.object({
  color: z.string().min(1, "Màu sắc không được để trống"),
  code: z.string().min(1, "Mã màu không được để trống"),
  image: z.string().url("Hình ảnh phải là URL hợp lệ"),
  price: z.number().min(0, "Giá không hợp lệ"),
})

export const productSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm không được để trống"),
  description: z.string().optional(),
  price: z.number().min(0, "Giá không hợp lệ"),
  currency: z.enum(currencyOptions),
  category: z.string().optional(),
  stock: z.number().min(0, "Tồn kho không hợp lệ"),
  colors: z.array(colorSchema),
  thumb: z.string(),
  _id: z.string().optional(),
  sku: z.string().optional(),
  status: z.string().optional(),
})

export type ProductFormValues = z.infer<typeof productSchema>

export type ProductList = z.infer<typeof productSchema>[]

export type Product = z.infer<typeof productSchema>
