import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import TopNav from './top-nav.tsx';
import './order-management.css';
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5282";
interface OrderResponse {
    id: number;
    merchantId: number;
    orderDiscountId?: number;
    //orderItems[]: Item;
    status: number;
    updatedAt: Date;
}

const fetchOrderData = async (pageNumber: number, pageSize: number, sortOrder: string, orderStatus?: number): Promise<OrderResponse[]> => {
    const token = localStorage.getItem("jwtToken");
    const responce = await axios.get<OrderResponse[]>(`${API_BASE_URL}/api/orders`, {
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

    console.log(responce.data);
    return responce.data.map((order) => ({
        id: order.id,
        merchantId: order.merchantId,
        orderDiscountId: order.orderDiscountId,
        status: order.status,
        updatedAt: order.updatedAt,
    }));
}

//untested
const deleteOrder = async (orderId: number): Promise<void> => {
    const token = localStorage.getItem("jwtToken");
    const responce = await axios.delete<void>(`${API_BASE_URL}/api/orders/${orderId}`, {
        params: { orderId },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log("order deleted" + responce.data);
}

function OrderMng() {
    const navigate = useNavigate();

    const [orders, setOrders] = useState<OrderResponse[]>([]);

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

    const allOrders = orders.map(order => 
        <div className="all-orders">
            <div className="active-order-left">
                <div className="order-detail">ID: {order.id}</div>
                <div className="order-detail">Merchant: {order.merchantId}</div>
                <div className="order-detail">Discount: {order.orderDiscountId}</div>
                <div className="order-detail">Status: {order.status}</div>
                <div className="order-detail">Last updated: {order.updatedAt}</div>
            </div>
            <div className="active-order-right">
                <button onClick={() => navigateToOrderPage(order.id)} className="page-button">Edit</button>
                <button className="page-button">Change status</button>
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
