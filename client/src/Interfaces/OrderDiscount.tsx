import { Status } from "../Enums/Status"

export interface OrderDiscount {
    id: number
    title: string
    percentage: number
    createdAt: string
    updatedAt: string
    status: Status
  }
  
  export interface CreateOrderDiscountDto {
    title: string
    percentage: number
  }