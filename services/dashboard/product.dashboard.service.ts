import { ProductFormValues } from "@/pages/dashboard/products/products.validate"

import HttpClient from "@/lib/HtttpClient"

export class ProductDashboardService extends HttpClient {
  constructor() {
    super()
  }

  private _PREFIX = "/dashboard/products"

  public async getProducts(filter: {
    skip: number
    limit: number
    [key: string]: unknown
  }): Promise<{
    count: number
    items: ProductFormValues[]
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

  public createProduct(data: ProductFormValues): Promise<unknown> {
    return this.post(this._PREFIX, data)
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.delete(`${this._PREFIX}/${id}`)
  }

  async getDetail(id: string): Promise<ProductFormValues> {
    return this.get(`${this._PREFIX}/${id}`)
  }

  public update(id: string, data: ProductFormValues): Promise<unknown> {
    return this.put(`${this._PREFIX}/${id}`, data)
  }
}
