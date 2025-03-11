import { ProductFormValues } from "@/pages/dashboard/products/products.validate"

import HttpClient from "@/lib/HtttpClient"

export class ProductService extends HttpClient {
  constructor() {
    super()
  }

  private _PREFIX = "/products"

  public async getProducts(filter: {
    skip: number
    limit: number
    [key: string]: any
  }): Promise<{
    count: number
    items: ProductFormValues[]
  }> {
    return await this.get(this._PREFIX)
  }
}
