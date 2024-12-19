import { EmployeeType } from "../Enums/EmployeeType"
import { Status } from "../Enums/Status"

export interface Employee {
  id: number
  firstName: string
  lastName: string
  employeeType: EmployeeType
  username: string
  password: string
  createdAt: string
  updatedAt: string
  status: Status
}

export interface CreateEmployeeDto {
  firstName: string
  lastName: string
  employeeType: EmployeeType
  username: string
  password: string
  status: Status
}
