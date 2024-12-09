import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import { FaSearch, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router";
import TopNav from './top-nav.tsx';
import './dashboard.css';

function Dashboard() {
    const navigate = useNavigate();

    const navigateToOrderCreation = () => {
        navigate('/ordercreation');
    }

    return (
        <>
            <TopNav />

            <div id="dashboard-container">
                <div id="dashboard-top">
                    DASHBOARD
                </div>

                <div id="dashboard-middle">
                    <div id="dashboard-left">
                        <div id="reservations-container">
                            <div id="reservations-title">Nearest reservations</div>
                            <div id="reservations-search">
                                <FaSearch />
                                <input type="search" placeholder="Search..." />
                            </div>

                            <div id="reservations-calendar">
                                <div id="calendar-top">
                                    <GoTriangleLeft />
                                    <div id="current-date">March 2024</div>
                                    <GoTriangleRight />
                                </div>
                                <div id="calendar-middle">
                                    <div className="calendar-day">
                                        <div className="weekday-abb">Mon</div>
                                        <div className="weekday-num">8</div>
                                    </div>
                                    <div className="calendar-day">
                                        <div className="weekday-abb">Tue</div>
                                        <div className="weekday-num">9</div>
                                    </div>
                                    <div className="calendar-day">
                                        <div className="weekday-abb">Wed</div>
                                        <div className="weekday-num">9</div>
                                    </div>
                                    <div className="calendar-day" id="current-day">
                                        <div className="weekday-abb">Thr</div>
                                        <div className="weekday-num">10</div>
                                    </div>
                                    <div className="calendar-day">
                                        <div className="weekday-abb">Fri</div>
                                        <div className="weekday-num">11</div>
                                    </div>
                                    <div className="calendar-day">
                                        <div className="weekday-abb">Sat</div>
                                        <div className="weekday-num">12</div>
                                    </div>
                                    <div className="calendar-day">
                                        <div className="weekday-abb">Sun</div>
                                        <div className="weekday-num">13</div>
                                    </div>
                                </div>
                            </div>

                            <div id="reservations-by-day">
                                <div id="reservations-day">Today</div>
                                <hr />
                                <div id="reservation-list">
                                    <div className="reservations-by-hour">
                                        <div className="reservation-time">3:00</div>

                                        <div className="reservation">
                                            <div className="reservation-left">
                                                <div className="customer-name">JW</div>
                                                <div className="service-name">Manicure</div>
                                            </div>
                                            <div className="reservation-right">
                                                <FaUser />
                                                <div className="employee-name">Employee 1</div>
                                            </div>
                                        </div>

                                        <div className="reservation">
                                            <div className="reservation-left">
                                                <div className="customer-name">JW</div>
                                                <div className="service-name">Manicure</div>
                                            </div>
                                            <div className="reservation-right">
                                                <FaUser />
                                                <div className="employee-name">Employee 1</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="reservations-by-hour">
                                        <div className="reservation-time">4:00</div>

                                        <div className="reservation">
                                            <div className="reservation-left">
                                                <div className="customer-name">JW</div>
                                                <div className="service-name">Manicure</div>
                                            </div>
                                            <div className="reservation-right">
                                                <FaUser />
                                                <div className="employee-name">Employee 1</div>
                                            </div>
                                        </div>

                                        <div className="reservation">
                                            <div className="reservation-left">
                                                <div className="customer-name">JW</div>
                                                <div className="service-name">Manicure</div>
                                            </div>
                                            <div className="reservation-right">
                                                <FaUser />
                                                <div className="employee-name">Employee 1</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="reservations-by-hour">
                                        <div className="reservation-time">5:00</div>

                                        <div className="reservation">
                                            <div className="reservation-left">
                                                <div className="customer-name">JW</div>
                                                <div className="service-name">Manicure</div>
                                            </div>
                                            <div className="reservation-right">
                                                <FaUser />
                                                <div className="employee-name">Employee 1</div>
                                            </div>
                                        </div>

                                        <div className="reservation">
                                            <div className="reservation-left">
                                                <div className="customer-name">JW</div>
                                                <div className="service-name">Manicure</div>
                                            </div>
                                            <div className="reservation-right">
                                                <FaUser />
                                                <div className="employee-name">Employee 1</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="dashboard-right">
                        <div id="active-orders-container">
                            <div id="active-orders-container-top">
                                <div id="active-orders-title">Active orders</div>
                                <button onClick={() => navigateToOrderCreation()} className="page-button">Create new order</button>
                            </div>
                            <div id="active-order-list">
                                <div className="active-order">
                                    <div className="order-customer-name">Customer Name</div>
                                    <div className="order-service-name">Service Name</div>
                                    <div className="active-order-details">Details</div>
                                </div>
                                <div className="active-order">
                                    <div className="order-customer-name">Customer Name</div>
                                    <div className="order-service-name">Service Name</div>
                                    <div className="active-order-details">Details</div>
                                </div>
                                <div className="active-order">
                                    <div className="order-customer-name">Customer Name</div>
                                    <div className="order-service-name">Service Name</div>
                                    <div className="active-order-details">Details</div>
                                </div>
                                <div className="active-order">
                                    <div className="order-customer-name">Customer Name</div>
                                    <div className="order-service-name">Service Name</div>
                                    <div className="active-order-details">Details</div>
                                </div>
                                <div className="active-order">
                                    <div className="order-customer-name">Customer Name</div>
                                    <div className="order-service-name">Service Name</div>
                                    <div className="active-order-details">Details</div>
                                </div>
                                <div className="active-order">
                                    <div className="order-customer-name">Customer Name</div>
                                    <div className="order-service-name">Service Name</div>
                                    <div className="active-order-details">Details</div>
                                </div>
                                <div className="active-order">
                                    <div className="order-customer-name">Customer Name</div>
                                    <div className="order-service-name">Service Name</div>
                                    <div className="active-order-details">Details</div>
                                </div>
                                <div className="active-order">
                                    <div className="order-customer-name">Customer Name</div>
                                    <div className="order-service-name">Service Name</div>
                                    <div className="active-order-details">Details</div>
                                </div>
                                <div className="active-order">
                                    <div className="order-customer-name">Customer Name</div>
                                    <div className="order-service-name">Service Name</div>
                                    <div className="active-order-details">Details</div>
                                </div>
                                <div className="active-order">
                                    <div className="order-customer-name">Customer Name</div>
                                    <div className="order-service-name">Service Name</div>
                                    <div className="active-order-details">Details</div>
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