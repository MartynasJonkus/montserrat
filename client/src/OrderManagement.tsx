import "./OrderManagement.css"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios"
import { OrderStatus } from "./Enums/OrderStatus"
import { formatDate } from "./utils/dateUtils"
import { Order, OrderItem } from "./Interfaces/Order"
import { ProductVariant } from "./Interfaces/ProductVariant"
import { Product } from "./Interfaces/Product"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardHeader,
} from "reactstrap"

const API_BASE_URL = "http://localhost:5282"

// Fetch the ProductVariant by variantId
const fetchProductVariant = async (
  variantId: number
): Promise<ProductVariant> => {
  const token = localStorage.getItem("jwtToken")
  const response = await axios.get<ProductVariant>(
    `${API_BASE_URL}/api/variants/${variantId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}

// Fetch the Product by productId
const fetchProduct = async (productId: number): Promise<Product> => {
  const token = localStorage.getItem("jwtToken")
  const response = await axios.get<Product>(
    `${API_BASE_URL}/api/products/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}

// Fetch orders from the API with pagination parameters
const fetchOrderData = async (
  pageNumber: number,
  pageSize: number,
  sortOrder: string,
  orderStatus?: number
): Promise<Order[]> => {
  const token = localStorage.getItem("jwtToken")
  const response = await axios.get<Order[]>(`${API_BASE_URL}/api/orders`, {
    params: {
      pageNumber,
      pageSize,
      orderStatus,
      sortOrder,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data // returning orders
}

function OrderMng() {
  const [orders, setOrders] = useState<Order[]>([])
  const [productDetails, setProductDetails] = useState<Map<number, string>>(
    new Map()
  )

  const navigate = useNavigate()

  const navigateToPage = (orderId: number, orderStatus: number) => {
    // Conditional navigation based on the order status
    if (orderStatus === OrderStatus.Opened) {
      //navigate(`/orderpage/${orderId}`) // Opened orders go to OrderPage
      navigate('/ordercreation', { state: { id: orderId } });
    } else if (orderStatus === OrderStatus.PartiallyPaid) {
      navigate(`/payment/${orderId}`) // PartiallyPaid orders go to Payment
    } else {
      navigate(`/order-details/${orderId}`) // All other statuses go to OrderDetails
    }
  }

  useEffect(() => {
    handleFetchOrderData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fetch orders data based on current page and other parameters
  const handleFetchOrderData = async () => {
    try {
      const data = await fetchOrderData(1, 10, "desc")
      if (data.length === 0) {
        alert("No orders found on this page.")
      }
      setOrders(data)

      // Fetch product variants and their associated products
      await fetchProductVariantsAndProducts(data)
    } catch (err) {
      console.error(err)
    }
  }

  // Fetch product variants and products for the orders
  const fetchProductVariantsAndProducts = async (orders: Order[]) => {
    const newProductDetails = new Map<number, string>()

    for (const order of orders) {
      for (const item of order.orderItems) {
        const productVariant = await fetchProductVariant(item.productVariantId)
        const product = await fetchProduct(productVariant.productId)
        newProductDetails.set(
          item.productVariantId,
          `${product.title} (${productVariant.title})`
        ) // Map product variant ID to product title and variant title
      }
    }

    setProductDetails(newProductDetails) // Update state with the fetched product names and variant titles
  }

  // Orders displayed in pairs (two per row)
  const allOrders = orders.map((order, index) => {
    if (index % 2 === 0) {
      return (
        <Row key={order.id} className="mb-4">
          <Col md={6}>
            <Card
              className="order-card"
              onClick={() => navigateToPage(order.id, order.status)}
            >
              <CardHeader className="order-card-header">
                <CardTitle tag="h5">Order ID: {order.id}</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={6}>
                    <CardText>
                      <strong>Status:</strong> {OrderStatus[order.status]}
                    </CardText>
                    <CardText>
                      <strong>Last updated:</strong>{" "}
                      {formatDate(order.updatedAt)}
                    </CardText>
                  </Col>
                  <Col md={6}>
                    <CardText>
                      <strong>Items:</strong>
                    </CardText>
                    {order.orderItems.slice(0, 3).map((item: OrderItem) => (
                      <div key={item.productVariantId}>
                        {productDetails.get(item.productVariantId)}:{" "}
                        {item.quantity}
                      </div>
                    ))}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md={6}>
            {orders[index + 1] && (
              <Card
                className="order-card"
                onClick={() => navigateToPage(orders[index + 1].id, orders[index + 1].status)}
              >
                <CardHeader className="order-card-header">
                  <CardTitle tag="h5">
                    Order ID: {orders[index + 1].id}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={6}>
                      <CardText>
                        <strong>Status:</strong>{" "}
                        {OrderStatus[orders[index + 1].status]}
                      </CardText>
                      <CardText>
                        <strong>Last updated:</strong>{" "}
                        {formatDate(orders[index + 1].updatedAt)}
                      </CardText>
                    </Col>
                    <Col md={6}>
                      <CardText>
                        <strong>Items:</strong>
                      </CardText>
                      {orders[index + 1].orderItems
                        .slice(0, 3)
                        .map((item: OrderItem) => (
                          <div key={item.productVariantId}>
                            {productDetails.get(item.productVariantId)}:{" "}
                            {item.quantity}
                          </div>
                        ))}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
      )
    }
    return null
  })

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Orders</h1>
        </Col>
      </Row>
      <Row>
        <Col>{allOrders}</Col>
      </Row>
    </Container>
  )
}

export default OrderMng
