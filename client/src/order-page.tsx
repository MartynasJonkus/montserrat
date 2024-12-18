import { FaRegPlusSquare } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
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

interface ProductResponse {
    id: number;
    merchantId: number;
    categoryId?: number;
    discountId?: number;
    taxId?: number;
    title: string;
    price: {
        amount: number;
        currency: number;
    }
    weight: number;
    weightUnit: string;
    createdAt: string;
    updatedAt: string;
    status: number;
    productVariants: [{
        id: number;
        productId: number;
        title: string;
        additionalPrice: number;
        quantity: number;
        createdAt: string;
        updatedAt: string;
        status: number;
    }]
}

const fetchOrderItems = async (orderId: number): Promise<Item[]> => {
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

const fetchProducts = async (pageNumber: number, pageSize: number): Promise<ProductResponse[]> => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.get<ProductResponse[]>(`${API_BASE_URL}/api/products`, {
        params: {
            pageNumber,
            pageSize,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log(response.data);
    return response.data;
}

const saveOrder = async (orderId: number, orderItems: Item[]): Promise<void> => {

    const token = localStorage.getItem("jwtToken");
    const orderResponse = await axios.get<OrderResponse>(`${API_BASE_URL}/api/orders/${orderId}`, {
        params: {
            orderId,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = {
        orderDiscountId: orderResponse.data.orderDiscountId,
        status: orderResponse.data.status,
        orderItems: orderItems,
    }

    console.log("data:" + data.orderItems);
    console.log("data:" + data.status);
    console.log("data:" + data.orderDiscountId);
    const updateResponse = await axios.put<void>(`${API_BASE_URL}/api/orders/${orderId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log("order status updated" + updateResponse.data);
    window.location.reload();
}

const createOrder = async (orderItems: Item[]): Promise<void> => {
    const token = localStorage.getItem("jwtToken");

    const data = orderItems.map(item => ({
        productVariant: item.id,
        quantity: item.quantity,
    }));

    const response = await axios.post<void>(`${API_BASE_URL}/api/orders`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log("order created" + response.data);
}

function OrderPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const orderId = location.state.id;

    const [orderItems, setOrder] = useState<Item[]>([]);
    const [products, setProduct] = useState<ProductResponse[]>([]);
    const [subtotalAmount, setSubtotal] = useState(0);
    const [discountAmount, setDiscount] = useState(0);
    const [totalAmount, setTotal] = useState(0);

    useEffect(() => {
        if (orderId != undefined) handleFetchOrderById();
        handleFetchProducts();
    }, []);

    const handleFetchOrderById = async () => {
        try {
            const data = await fetchOrderItems(orderId);
            setOrder(data);
        } catch (err) {
            console.error(err);
        }
    }
    const handleFetchProducts = async () => {
        try {
            const data = await fetchProducts(1, 10);
            setProduct(data);

        } catch (err) {
            console.error(err);
        }
    }

    const handleItemAdd = (productId: number, variantId: number) => {
        console.log(variantId + ":" + productId);
        const productToAdd = products.find(product => product.id == productId);

        if (productToAdd != undefined) {
            const existingItem = orderItems.find(item => item.id == productId);
            if (existingItem != undefined) {
                setOrder(prevItems =>
                    prevItems.map(item =>
                        item.id == productId ? { ...item, quantity: item.quantity + 1 } : item
                    )
                );
            }
            else {
                const newItem = {
                    id: productToAdd.id,
                    price: {
                        amount: productToAdd.price.amount,
                        currency: productToAdd.price.currency,
                    },
                    productVariant: variantId,
                    quantity: 1,
                }
                console.log(newItem.id + "variant:" + newItem.productVariant);
                setOrder(prevItems => [...prevItems, newItem]);
            }
        }
    }

    const handleItemRemove = (itemId: number) => {
        setOrder((prevItems) => prevItems.filter((item) => item.id !== itemId));
    }

    const navigateToPayment = () => {
        navigate('/payment', { state: { amount: totalAmount, id: orderId } });
    }

    useEffect(() => {
        const sum = orderItems.reduce((aggr, current) => aggr + (current.price.amount * current.quantity), 0);
        setSubtotal(sum);
        setTotal(subtotalAmount - discountAmount);
    }, [discountAmount, orderItems, subtotalAmount]);


    const handleSaveOrder = () => {
        if (orderId != undefined) {
            saveOrder(orderId, orderItems);
        } else {
            createOrder(orderItems);
        }
    }

    const itemList = orderItems.map(item =>
        <>
            <hr />
            <div className="order-product">
                <div id="order-product-amount">x{item.quantity}</div>
                <div id="order-product-name">ID: {item.id}</div>
                <div id="order-product-price">${item.price.amount}</div>
                <ImCross onClick={() => handleItemRemove(item.id)} />
            </div>
        </>
    );

    const [selectedValues, setSelectedValues] = useState(0);

    const productList = products.map(product =>
        <div className="item">
            <div className="item-name">{product.title} <FaRegPlusSquare onClick={() => handleItemAdd(product.id, selectedValues)} /></div>
            <div className="item-price">${product.price.amount}</div>
            <select value={selectedValues} onChange={(e) => setSelectedValues(parseInt(e.target.value))}>
                <option value="">-</option>
                {product.productVariants.reverse().map(variant =>
                    <option value={variant.id}>{variant.title} +${variant.additionalPrice}</option>
                )}
            </select>
        </div>
    );

    return (
        <>
            <TopNav />

            <div id="order-container">
                <div id="container-left">
                    <div className="container-top" id="back-to-dashboard">
                        <button id="save-order-button" onClick={() => handleSaveOrder()}>Save order</button>
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
                        <button onClick={() => { }} id="payment-split">Split</button>
                        <button onClick={() => navigateToPayment()} id="payment-pay">Pay</button>
                    </div>
                </div>


                <div id="container-right">
                    <div className="container-top">Products</div>
                    <div id="products">
                        <div className="product-group">
                            <div className="group-name"></div>
                            <div className="items">
                                {productList}
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
