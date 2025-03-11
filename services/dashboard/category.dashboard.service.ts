import {
  CategoryFormValues,
  CategoryList,
} from "@/pages/dashboard/categories/categories.validate"
import { ProductFormValues } from "@/pages/dashboard/products/products.validate"

import HttpClient from "@/lib/HtttpClient"

export class CategoryDashboardService extends HttpClient {
  constructor() {
    super()
  }

  private _PREFIX = "/dashboard/categories"

  public async getCategories(filter: {
    skip: number
    limit: number
    [key: string]: unknown
  }): Promise<{
    count: number
    items: CategoryList
  }> {
    const query = new URLSearchParams(
      Object.entries(filter).reduce(
        (acc, [key, value]) => {
          acc[key] = String(value)
          return acc
        },
        {} as Record<string, string>
      )
    ).toString()
    return await this.get(`${this._PREFIX}?${query}`)
  }

  public createCategory(data: CategoryFormValues): Promise<unknown> {
    return this.post(this._PREFIX, data)
  }

  async deleteCategory(id: string): Promise<boolean> {
    return this.delete(`${this._PREFIX}/${id}`)
  }

  async getDetail(id: string): Promise<ProductFormValues> {
    return this.get(`${this._PREFIX}/${id}`)
  }

  public update(id: string, data: ProductFormValues): Promise<unknown> {
    return this.put(`${this._PREFIX}/${id}`, data)
  }
}
