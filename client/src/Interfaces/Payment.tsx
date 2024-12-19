import { PaymentMethod } from "../Enums/PaymentMethod"
import { PaymentType } from "../Enums/PaymentType"
import { Price } from "./Price"

export interface Payment {
  id: number
  reservationId: number | null
  orderId: number | null
  giftCardId: number | null
  refundId: number | null
  tipAmount: number
  totalAmount: number
  currency: string
  method: PaymentMethod
  paymentType: PaymentType
  createdAt: string
}

export interface CreatePaymentDto {
  reservationId: number | null
  orderId: number | null
  giftCardId: number | null
  tipAmount: number
  totalAmount: number
  currency: string
  method: PaymentMethod
  paymentType: PaymentType
}

export interface Refund {
  id: number
  paymentId: number
  refundAmount: Price
  reason: string
  createdAt: string
}

export interface CreateRefundDto {
  paymentId: number
  refundAmount: Price
  reason: string
}
