import { Status } from "../Enums/Status"
import { Price } from "./Price"

export interface Service {
  id: number
  employeeId: number | null
  categoryId: number | null
  discountId: number | null
  taxId: number | null
  title: string
  price: Price
  durationMins: number
  createdAt: string
  updatedAt: string
  status: Status
}

export interface CreateServiceDto {
  id: number
  employeeId: number | null
  categoryId: number | null
  discountId: number | null
  taxId: number | null
  title: string
  price: Price
  durationMins: number
  status: Status
}
