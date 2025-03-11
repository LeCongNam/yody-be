import { z } from "zod"

export const currencyOptions = ["VND", "USD", "EUR"] as const

export const categorySchema = z.object({
  name: z.string().min(1, "Tên sản phẩm không được để trống"),
  description: z.string().optional(),
  _id: z.string().optional(),
})

export type CategoryFormValues = z.infer<typeof categorySchema>
export type CategoryList = z.infer<typeof categorySchema>[]
export type Category = z.infer<typeof categorySchema>
