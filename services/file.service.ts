import HttpClient from "@/lib/HtttpClient"

export class FileService extends HttpClient {
  constructor() {
    super()
  }

  private _PREFIX = "/files"

  async uploadFile(formData: FormData): Promise<{ url: string }> {
    return this.post<{ url: string }>(`${this._PREFIX}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }
}
