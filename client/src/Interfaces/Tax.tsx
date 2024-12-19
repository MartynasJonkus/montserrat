import { Status } from "../Enums/Status"

export interface Tax {
  id: number
  title: string
  percentage: number
  createdAt: string
  updatedAt: string
  status: Status
}

export interface CreateTaxDto {
  title: string
  percentage: number
  status: Status
}
