import { Status } from "../Enums/Status"

export interface Discount {
  id: number
  title: string
  percentage: number
  expiresOn: string
  createdAt: string
  updatedAt: string
  status: Status
}

export interface CreateDiscountDto {
  title: string
  percentage: number
  expiresOn: string
  status: Status
}