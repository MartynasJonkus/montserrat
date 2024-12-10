import { FaSearch, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router";
import TopNav from './top-nav.tsx';
import './reservation-management.css';


function ReservationMng() {
    const navigate = useNavigate();

    return (
        <>
            <TopNav />
            <div id="order-mng-container">
                <div id="order-mng-container-top">
                    <div id="order-mng-title">Reservation management</div>
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
                                    <div className="reservation-customer-name">Customer Name</div>
                                    <div className="reservation-service-name">Reservation Name</div>
                                    <div className="reservation-date">Reservation date</div>
                                    <div className="reservation-status">Status</div>
                                    <div className="reservation-employee">Employee</div>
                                </div>
                                <div className="active-order-right">
                                    <button onClick={() => { }} className="page-button">Edit</button>
                                    <button className="page-button">Change status</button>
                                    <button className="page-button">Delete</button>
                                </div>
                            </div>
                            <div className="all-orders">
                                <div className="active-order-left">
                                    <div className="reservation-customer-name">Customer Name</div>
                                    <div className="reservation-service-name">Reservation Name</div>
                                    <div className="reservation-date">Reservation date</div>
                                    <div className="reservation-status">Status</div>
                                    <div className="reservation-employee">Employee</div>
                                </div>
                                <div className="active-order-right">
                                    <button onClick={() => { }} className="page-button">Edit</button>
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

export default ReservationMng