import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios"

// Define error response type for better type safety
interface ApiErrorResponse {
  status: number
  message: string
}

class HttpClient {
  protected readonly instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    })

    this._initializeRequestInterceptor()
    this._initializeResponseInterceptor()
  }

  // Interceptor để thêm access token vào headers
  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      (config) => {
        // Check if we're in a browser environment before using localStorage
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("access_token")
          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          }
        }
        return config
      },
      (error) => Promise.reject(error)
    )
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    )
  }

  private _handleResponse = ({ data }: AxiosResponse) => data

  protected _handleError = (error: AxiosError): Promise<ApiErrorResponse> => {
    // Remove console.error in production or use proper logging service

    const response = error?.response

    if (response) {
      // Safe access to response.data
      const responseData = response.data as { message?: string }

      return Promise.reject<ApiErrorResponse>({
        status: response.status,
        message: responseData?.message || "Request failed",
      })
    }

    return Promise.reject<ApiErrorResponse>({
      status: 0,
      message: "Network error or server not reachable",
    })
  }

  // CRUD methods
  protected get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config)
  }

  protected post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.post(url, data, config)
  }

  protected put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.put(url, data, config)
  }

  protected delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config)
  }
}

export default HttpClient
