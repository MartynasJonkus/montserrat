import { Status } from "../Enums/Status"
import { Price } from "./Price"
import { ProductVariant } from "./ProductVariant"

export interface Product {
  id: number
  categoryId: number | null
  discountId: number | null
  taxId: number | null
  title: string
  price: Price
  weight: number
  weightUnit: string
  createdAt: string
  updatedAt: string
  status: Status
  productVariants: ProductVariant[]
}

export interface CreateProductDto {
  categoryId: number | null
  discountId: number | null
  taxId: number | null
  title: string
  price: Price
  weight: number
  weightUnit: string
  status: Status
}
