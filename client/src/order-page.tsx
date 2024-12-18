import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import TopNav from './top-nav.tsx';
import './order-page.css';
import { useLocation } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:5282";
interface Item {
    id: number;
    price: {
        amount: number;
        currency: number;
    }
    productVariant: number;
    quantity: number;
}
interface OrderResponse {
    id: number;
    merchantId: number;
    orderDiscountId?: number;
    orderItems: Item[];
    status: number;
    updatedAt: string;
}

const fetchOrderById = async (orderId: number): Promise<Item[]> => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.get<OrderResponse>(`${API_BASE_URL}/api/orders/${orderId}`, {
        params: {
            orderId,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log(response.data);
    return response.data.orderItems.map((item) => ({
        id: item.id,
        price: {
            amount: item.price.amount,
            currency: item.price.currency,
        },
        productVariant: item.productVariant,
        quantity: item.quantity,
    }));
}



function OrderPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const orderId = location.state.id;

    const [orderItems, setOrder] = useState<Item[]>([]);
    const [subtotalAmount, setSubtotal] = useState(0);
    const [discountAmount, setDiscount] = useState(0);
    const [totalAmount, setTotal] = useState(0);

    useEffect(() => {
        if (orderId != undefined) handleFetchOrderById();
    }, []);

    const handleFetchOrderById = async () => {
        try {
            const data = await fetchOrderById(orderId);
            setOrder(data);
        } catch (err) {
            console.error(err);
        }
    }
    const navigateToPayment = () => {
        navigate('/payment', { state: { amount: totalAmount } });
    }

    useEffect(() => {
        const sum = orderItems.reduce((aggr, current) => aggr + current.price.amount, 0);
        setSubtotal(sum);
        setTotal(subtotalAmount - discountAmount);
    }, [discountAmount, orderItems, subtotalAmount]); 

    const itemList = orderItems.map(item =>
        <>
            <hr />
            <div className="order-product">
                <div id="order-product-amount">x{item.quantity}</div>
                <div id="order-product-name">ID: {item.id}</div>
                <div id="order-product-price">${item.price.amount}</div>
            </div>
        </>
    );

    return (
        <>
            <TopNav />

            <div id="order-container">
                <div id="container-left">
                    <div className="container-top" id="back-to-dashboard">
                        {/*<GoArrowLeft id="back-arrow" size={30} onClick={() => navigate("/")} />*/}
                        <button id="save-order-button" onClick={() => { } }>Save order</button>
                    </div>
                    <div id="order-details">
                        <div id="order-top"><b>CURRENT ORDER</b></div>
                        {/*this list need a way to remove items*/}
                        {itemList}
                    </div>
                    <div id="order-price">
                        <div id="prices">
                            <div className="price-component">
                                <div className="component-name">Subtotal</div>
                                <div className="price-amount">${subtotalAmount.toFixed(2)}</div>
                            </div>
                            <div className="price-component">
                                <div className="component-name">Discount</div>
                                <div className="price-amount">${discountAmount.toFixed(2)}</div>
                            </div>
                        </div>
                        <hr />
                        <div id="price-bottom">
                            <div className="component-name">Total</div>
                            <div className="price-amount">${totalAmount.toFixed(2)}</div>
                        </div>
                    </div>
                    <div id="container-bottom">
                        <button onClick={() => { } } id="payment-split">Split</button>
                        <button onClick={() => navigateToPayment()} id="payment-pay">Pay</button>                  
                    </div>
                </div>


                <div id="container-right">
                    <div className="container-top">Products</div>
                    <div id="products">
                        <div className="product-group">
                            <div className="group-name">Coffee</div>
                            <div className="items">
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                            </div>
                        </div>
                        <div className="product-group">
                            <div className="group-name">Cookies</div>
                            <div className="items">
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                            </div>
                        </div>
                        <div className="product-group">
                            <div className="group-name">Coffee</div>
                            <div className="items">
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="container-bottom" />
                </div>
            </div>
        </>
    )
}

export default OrderPage
