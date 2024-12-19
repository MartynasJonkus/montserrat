import { Status } from "../Enums/Status"

export interface ProductVariant {
  id: number
  title: string
  additionalPrice: number
  quantity: number
  createdAt: string
  updatedAt: string
  status: Status
}

export interface CreateProductVariantDto {
  title: string
  additionalPrice: number
  quantity: number
  status: Status
}
