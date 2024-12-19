import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { OrderStatus } from "./Enums/OrderStatus"
import { formatDate } from "./utils/dateUtils"
import { Order, OrderItem } from "./Interfaces/Order"
import { ProductVariant } from "./Interfaces/ProductVariant"
import { Product } from "./Interfaces/Product"
import { Discount } from "./Interfaces/Discount"
import { Payment } from "./Interfaces/Payment"
import { PaymentType } from "./Enums/PaymentType.tsx"
import { PaymentMethod } from "./Enums/PaymentMethod.tsx"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Table,
} from "reactstrap"

const API_BASE_URL = "http://localhost:5282";

// Fetch Discount by ID
const fetchDiscount = async (discountId: number): Promise<Discount | null> => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.get<Discount>(`${API_BASE_URL}/api/discounts/${discountId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

// Fetch Product Variant by ID
const fetchProductVariant = async (variantId: number): Promise<ProductVariant> => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.get<ProductVariant>(`${API_BASE_URL}/api/variants/${variantId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

// Fetch Product by ID
const fetchProduct = async (productId: number): Promise<Product> => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.get<Product>(`${API_BASE_URL}/api/products/${productId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

// Fetch Order by ID
const fetchOrder = async (orderId: number): Promise<Order> => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.get<Order>(`${API_BASE_URL}/api/orders/${orderId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

// Fetch Payments by Order ID
const fetchPayments = async (orderId: number): Promise<Payment[]> => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.get<Payment[]>(`${API_BASE_URL}/api/payment/${orderId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

function OrderDetails() {
    const { orderId } = useParams();  // Get orderId from the URL
    const [order, setOrder] = useState<Order | null>(null);
    const [productDetails, setProductDetails] = useState<Map<number, string>>(new Map());
    const [discountDetails, setDiscountDetails] = useState<Discount | null>(null);
    const [payments, setPayments] = useState<Payment[]>([]);  // State for payments
    const navigate = useNavigate();

    useEffect(() => {
        if (orderId) {
            handleFetchOrderData(Number(orderId));
        }
    }, [orderId]);

    const handleFetchOrderData = async (orderId: number) => {
        try {
            const orderData = await fetchOrder(orderId);
            setOrder(orderData);
            if (orderData.orderDiscountId) {
                const discountData = await fetchDiscount(orderData.orderDiscountId);
                setDiscountDetails(discountData);
            }
            await fetchProductVariantsAndProducts(orderData);
            await fetchOrderPayments(orderId);  // Fetch payments associated with the order
        } catch (err) {
            console.error(err);
        }
    }

    const fetchProductVariantsAndProducts = async (order: Order) => {
        const newProductDetails = new Map<number, string>();

        for (const item of order.orderItems) {
            const productVariant = await fetchProductVariant(item.productVariantId);
            const product = await fetchProduct(productVariant.productId);
            newProductDetails.set(item.productVariantId, `${product.title} (${productVariant.title})`);
        }

        setProductDetails(newProductDetails);
    }

    const fetchOrderPayments = async (orderId: number) => {
        const paymentData = await fetchPayments(orderId);
        setPayments(paymentData);
    }

    const handleBack = () => {
        navigate(-1);  // Go back to the previous page
    }

    if (!order) return <div>Loading...</div>;

    return (
        <Container>
            <Row className="mb-4">
                <Col>
                    <h2>Order Details</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="order-card">
                        <CardBody>
                            <CardTitle tag="h5">Order ID: {order.id}</CardTitle>
                            <CardText><strong>Status:</strong> {OrderStatus[order.status]}</CardText>
                            <CardText><strong>Created At:</strong> {formatDate(order.createdAt)}</CardText>
                            <CardText><strong>Last Updated:</strong> {formatDate(order.updatedAt)}</CardText>

                            {discountDetails && order.orderDiscountId ? (
                                <CardText>
                                    <strong>Discount:</strong> {discountDetails.title} ({discountDetails.percentage}%)
                                </CardText>
                            ) : (
                                <CardText><strong>No Discount</strong></CardText>
                            )}

                            <CardText><strong>Total Amount:</strong> {order.totalAmount.amount} {order.totalAmount.currency}</CardText>

                            <h5>Order Items:</h5>
                            <Table bordered>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.orderItems.map((item: OrderItem) => (
                                        <tr key={item.productVariantId}>
                                            <td>{productDetails.get(item.productVariantId)}</td>
                                            <td>{item.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <h5>Payments:</h5>
                            {payments.length > 0 ? (
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>Payment ID</th>
                                            <th>Amount</th>
                                            <th>Tip</th>
                                            <th>Method</th>
                                            <th>Payment Type</th>
                                            <th>Created At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payments.map((payment) => (
                                            <tr key={payment.id}>
                                                <td>{payment.id}</td>
                                                <td>{payment.totalAmount} {payment.currency}</td>
                                                <td>{payment.tipAmount} {payment.currency}</td>
                                                <td>{PaymentMethod[payment.method]}</td>
                                                <td>{PaymentType[payment.paymentType]}</td>
                                                <td>{formatDate(payment.createdAt)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ) : (
                                <CardText>No Payments</CardText>
                            )}

                            <Button color="primary" onClick={handleBack}>Back to Orders</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default OrderDetails;
