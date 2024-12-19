import { Status } from "../Enums/Status"

export interface Merchant {
    id: number
    name: string
    VAT: string
    address: Address
    email: string
    phone: string
    createdAt: string
    updatedAt: string
    status: Status
}

export interface CreateMerchantDto {
    name: string
    VAT: string
    address: Address
    email: string
    phone: string
    status: Status
}

export interface Address {
    address1: string
    address2: string | null
    city: string
    country: string
    countryCode: string
    zipCode: string
}


