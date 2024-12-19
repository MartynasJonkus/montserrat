import { OrderStatus } from "../Enums/OrderStatus"
import { Price } from "./Price"

export interface Order {
    id: number
    orderDiscountId: number | null
    status: OrderStatus
    totalAmount: Price
    createdAt: string
    updatedAt: string
    orderItems: OrderItem[]
}

export interface OrderItem {
    id: number
    productVariantId: number
    quantity: number
    price: Price
}