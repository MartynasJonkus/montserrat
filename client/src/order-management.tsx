import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import TopNav from './top-nav.tsx';
import './order-management.css';
import { useEffect, useState } from "react";
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

const fetchOrderData = async (pageNumber: number, pageSize: number, sortOrder: string, orderStatus?: number): Promise<OrderResponse[]> => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.get<OrderResponse[]>(`${API_BASE_URL}/api/orders`, {
        params: {
            pageNumber,
            pageSize,
            orderStatus,
            sortOrder,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log(response.data);
    return response.data.map((order) => ({
        id: order.id,
        merchantId: order.merchantId,
        orderDiscountId: order.orderDiscountId,
        orderItems: order.orderItems,
        status: order.status,
        updatedAt: order.updatedAt,
    }));
}

const deleteOrder = async (orderId: number): Promise<void> => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.delete<void>(`${API_BASE_URL}/api/orders/${orderId}`, {
        params: { orderId },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log("order deleted" + response.data);
    window.location.reload();
}

const changeStatus = async (order: OrderResponse, newStatus: number): Promise<void> => {
    const token = localStorage.getItem("jwtToken");

    const data = {
        orderDiscountId: order.orderDiscountId,
        status: newStatus,
        orderItems: order.orderItems,
    }

    const response = await axios.put<void>(`${API_BASE_URL}/api/orders/${order.id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log("order status updated" + response.data);
    window.location.reload();
}


function OrderMng() {
    const [orders, setOrders] = useState<OrderResponse[]>([]);

    const navigate = useNavigate();

    const navigateToOrderPage = (orderId: number) => {
        navigate('/ordercreation', { state: { id: orderId } });
    }

    useEffect(() => {
        handleFetchOrderData();
    }, []);

    const handleFetchOrderData = async () => {
        try {
            const data = await fetchOrderData(1, 10, "desc");
            setOrders(data);
        } catch (err) {
            console.error(err);
        }
    }

    const handleStatusChange = async (orderId: number) => {
        const input = prompt("New order status:");

        if (input.length <= 0 || isNaN(input)) {
            alert("Invalid input");
        }
        else {
            const orderToEdit = orders.find((order) => order.id === orderId);
            if (orderToEdit != undefined) {
                await changeStatus(orderToEdit, parseInt(input));
            }   
        }
        
    }

    const allOrders = orders.map(order => 
        <div className="all-orders">
            <div className="active-order-left">
                <div className="order-detail">ID: {order.id}</div>
                <div className="order-detail">Merchant: {order.merchantId}</div>
                <div className="order-detail">Discount: {order.orderDiscountId}</div>
                <div className="order-detail">Status: {order.status}</div>
                <div className="order-detail">Items: {order.orderItems.map(item => <div className="item-list">ID: {item.id} x{item.quantity} </div> )} </div>
                <div className="order-detail">Last updated: {order.updatedAt}</div>
            </div>
            <div className="active-order-right">
                <button onClick={() => navigateToOrderPage(order.id)} className="page-button">Edit</button>
                <button onClick={() => handleStatusChange(order.id) } className="page-button">Change status</button>
                <button onClick={() => deleteOrder(order.id)} className="page-button">Delete</button>
            </div>
        </div>
    )



    return (
        <>
            <TopNav />
            <div id="order-mng-container">
                <div id="order-mng-container-top">
                    <div id="order-mng-title">Order management</div>
                </div>
                <div id="order-mng-container-middle">
                    <div id="all-orders-container">
                        <div id="all-orders-search">
                            <FaSearch />
                            <input type="search" placeholder="Search..." />
                        </div>
                        <div id="all-orders-list">
                            {allOrders}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderMng
