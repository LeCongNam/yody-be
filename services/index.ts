import { CategoryDashboardService } from "./dashboard/category.dashboard.service"
import { ProductDashboardService } from "./dashboard/product.dashboard.service"
import { FileService } from "./file.service"
import { ProductService } from "./product.service"
import { UserService } from "./user.service"

const userService = new UserService()
const productService = new ProductService()
const fileService = new FileService()
const productDashboardService = new ProductDashboardService()
const categoryDashboardService = new CategoryDashboardService()

export {
  categoryDashboardService,
  fileService,
  productDashboardService,
  productService,
  userService,
}
