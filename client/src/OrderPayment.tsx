import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
} from "reactstrap"

import { Order } from "./Interfaces/Order"
import { Discount } from "./Interfaces/Discount"
import { Payment } from "./Interfaces/Payment"
import { PaymentType } from "./Enums/PaymentType.tsx"
import { PaymentMethod } from "./Enums/PaymentMethod.tsx"
import { Currency } from "./Enums/Currency.tsx"
import { OrderStatus } from "./Enums/OrderStatus.tsx"

const API_BASE_URL = "http://localhost:5282"

function OrderPayment() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState<Order | null>(null)
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null)
  const [tipAmount, setTipAmount] = useState<number>(0)
  const [paymentType] = useState<PaymentType>(PaymentType.Order)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.Cash
  )
  const [paymentAmount, setPaymentAmount] = useState<number>(0)
  const [payments, setPayments] = useState<Payment[]>([])

  const getAuthHeader = () => {
    const token = localStorage.getItem("jwtToken")
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails(Number(orderId))
      fetchDiscounts()
      fetchPayments(Number(orderId))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId])

  useEffect(() => {
    if (order?.status === OrderStatus.Paid) {
      navigate(`/order-details/${order.id}`)
    }
  }, [order, navigate])

  const fetchOrderDetails = async (orderId: number) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/orders/${orderId}`,
        {
          headers: getAuthHeader(),
        }
      )
      setOrder(response.data)
    } catch (error) {
      console.error("Error fetching order details:", error)
    }
  }

  const fetchDiscounts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/orderDiscounts`, {
        headers: getAuthHeader(),
      })
      setDiscounts(response.data)
    } catch (error) {
      console.error("Error fetching discounts:", error)
    }
  }

  const fetchPayments = async (orderId: number) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/payment/${orderId}`,
        {
          headers: getAuthHeader(),
        }
      )
      setPayments(response.data)
    } catch (error) {
      console.error("Error fetching payments:", error)
    }
  }

  const handleAddDiscount = async () => {
    if (!selectedDiscount) {
      alert("Please select a discount.")
      return
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/orders/${order?.id}/discount`,
        selectedDiscount, // Passing the discount ID in the request body
        {
          headers: {
            ...getAuthHeader(),
            "Content-Type": "application/json",
          },
        }
      )

      alert("Discount added successfully.")
      setOrder(response.data) // Update the order state with the updated data
    } catch (error) {
      console.error("Error adding discount:", error)
      alert("Failed to add discount.")
    }
  }

  const handleRemoveDiscount = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/orders/${order?.id}/discount`,
        null, // Send null to remove the discount
        {
          headers: {
            ...getAuthHeader(),
            "Content-Type": "application/json",
          },
        }
      )
      alert("Discount removed successfully.")
      setOrder(response.data) // Update the order state with the updated data
    } catch (error) {
      console.error("Error removing discount:", error)
      alert("Failed to remove discount.")
    }
  }

  const handleAddPayment = async () => {
    if (paymentAmount <= 0) {
      alert("Please enter a valid payment amount.")
      return
    }

    try {
      await axios.post(
        `${API_BASE_URL}/api/payment`,
        {
          orderId: order?.id,
          totalAmount: paymentAmount,
          tipAmount,
          method: paymentMethod,
          paymentType,
        },
        { headers: getAuthHeader() }
      )
      alert("Payment processed successfully.")
      setPaymentAmount(0)
      setTipAmount(0)
      fetchPayments(Number(orderId))
      fetchOrderDetails(Number(orderId))
    } catch (error) {
      console.error("Error processing payment:", error)
      alert("Failed to process payment.")
    }
  }

  const calculateRemainingAmount = () => {
    if (!order) return 0
    const paidAmount = payments.reduce(
      (sum, payment) => sum + payment.totalAmount,
      0
    )
    return order.totalAmount.amount - paidAmount
  }

  if (!order) return <div>Loading...</div>

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2>Order Payment</h2>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Order Details</CardTitle>
              <CardText>
                <strong>Order ID:</strong> {order.id}
              </CardText>
              <CardText>
                <strong>Total Amount:</strong> {order.totalAmount.amount}{" "}
                {Currency[order.totalAmount.currency]}
              </CardText>
              <CardText>
                <strong>Remaining Amount:</strong> {calculateRemainingAmount()}{" "}
                {Currency[order.totalAmount.currency]}
              </CardText>
              <CardText>
                <strong>Applied Discount:</strong>{" "}
                {order.orderDiscountId ? (
                  <>
                    {discounts.find((d) => d.id === order.orderDiscountId)
                      ?.title || "Fetching..."}{" "}
                    <Button
                      color="danger"
                      size="sm"
                      onClick={handleRemoveDiscount}
                      className="ms-2"
                    >
                      Remove Discount
                    </Button>
                  </>
                ) : (
                  "None"
                )}
              </CardText>
              <FormGroup>
                <Label for="discountSelect">Add Discount</Label>
                <Input
                  type="select"
                  id="discountSelect"
                  value={selectedDiscount || ""}
                  onChange={(e) => setSelectedDiscount(Number(e.target.value))}
                >
                  <option value="">Select a discount</option>
                  {discounts.map((discount) => (
                    <option key={discount.id} value={discount.id}>
                      {discount.title} ({discount.percentage}%)
                    </option>
                  ))}
                </Input>
                <Button
                  color="primary"
                  className="mt-2"
                  onClick={handleAddDiscount}
                >
                  Add Discount
                </Button>
              </FormGroup>
            </CardBody>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <CardBody>
              <CardTitle tag="h5">Make a Payment</CardTitle>
              <Form>
                <FormGroup>
                  <Label for="tipSelect">Tip Amount</Label>
                  <Input
                    type="select"
                    id="tipSelect"
                    onChange={(e) => setTipAmount(Number(e.target.value))}
                  >
                    <option value="0">No Tip</option>
                    <option value="5">5%</option>
                    <option value="10">10%</option>
                    <option value="15">15%</option>
                    <option value="custom">Custom Flat Amount</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="paymentAmount">Payment Amount</Label>
                  <Input
                    type="number"
                    id="paymentAmount"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="paymentMethod">Payment Method</Label>
                  <Input
                    type="select"
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(Number(e.target.value))}
                  >
                    {Object.keys(PaymentMethod)
                      .filter((key) => isNaN(Number(key)))
                      .map((key, idx) => (
                        <option
                          key={idx}
                          value={
                            PaymentMethod[key as keyof typeof PaymentMethod]
                          }
                        >
                          {key}
                        </option>
                      ))}
                  </Input>
                </FormGroup>

                <Button color="success" onClick={handleAddPayment}>
                  Pay
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h5>Payments</h5>
          <Table bordered>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Amount</th>
                <th>Tip</th>
                <th>Method</th>
                <th>Type</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>
                    {payment.totalAmount} {payment.currency}
                  </td>
                  <td>
                    {payment.tipAmount} {payment.currency}
                  </td>
                  <td>{PaymentMethod[payment.method]}</td>
                  <td>{PaymentType[payment.paymentType]}</td>
                  <td>{new Date(payment.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default OrderPayment
