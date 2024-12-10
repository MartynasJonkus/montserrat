import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import TopNav from './top-nav.tsx';
import './order-managment.css';

function Dashboard() {
    const navigate = useNavigate();

    const navigateToOrderPage = (/*orderId*/) => {
        navigate('/ordercreation'/*, { state: { id: orderId } }*/);
    }


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
                            <div className="all-orders">
                                <div className="active-order-left">
                                    <div className="order-customer-name">Customer Name</div>
                                    <div className="order-service-name">Service Name</div>
                                    <div className="active-order-details">Details</div>
                                    <div className="order-status">Status</div>
                                </div>
                                <div className="active-order-right">
                                    <button onClick={() => navigateToOrderPage()} className="page-button">Edit</button>
                                    <button className="page-button">Change status</button>
                                    <button className="page-button">Delete</button>
                                </div>
                            </div>
                            <div className="all-orders">
                                <div className="active-order-left">
                                    <div className="order-customer-name">Customer Name</div>
                                    <div className="order-service-name">Service Name</div>
                                    <div className="active-order-details">Details</div>
                                    <div className="order-status">Status</div>
                                </div>
                                <div className="active-order-right">
                                    <button onClick={() => navigateToOrderPage()} className="page-button">Edit</button>
                                    <button className="page-button">Change status</button>
                                    <button className="page-button">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard