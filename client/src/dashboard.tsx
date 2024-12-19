import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import { FaSearch, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useState } from "react";
import './dashboard.css';

let weekOffset = 0;
function Dashboard() {
    const navigate = useNavigate();

    const navigateToOrderCreation = () => {
        navigate('/ordercreation', { state: { id: undefined } });
    }

    const navigateToReservationCreation = () => {
        navigate('/reservationcreation');
    }


    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const initialWeek = [
        new Date(+new Date() - (86400000*3)),
        new Date(+new Date() - (86400000*2)),
        new Date(+new Date() - 86400000),
        new Date(),
        new Date(+new Date() + 86400000),
        new Date(+new Date() + (86400000*2)),
        new Date(+new Date() + (86400000*3))
    ];

    const [week, setWeek] = useState(initialWeek);
    const [month, setMonth] = useState(monthNames[week[3].getMonth()]);
    const [year, setYear] = useState(week[3].getFullYear());

    function handleClickForward() {
        weekOffset--;
        updateWeek();
    }

    function handleClickBack() {
        weekOffset++;
        updateWeek();
    }

    function updateWeek() {
        const newWeek = [
            new Date(+new Date() - (86400000 * 3) - (86400000 * 7) * weekOffset),
            new Date(+new Date() - (86400000 * 2) - (86400000 * 7) * weekOffset),
            new Date(+new Date() - 86400000 - (86400000 * 7) * weekOffset),
            new Date(+new Date() - (86400000 * 7) * weekOffset),
            new Date(+new Date() + 86400000 - (86400000 * 7) * weekOffset),
            new Date(+new Date() + (86400000 * 2) - (86400000 * 7) * weekOffset),
            new Date(+new Date() + (86400000 * 3) - (86400000 * 7) * weekOffset)
        ];

        setWeek(newWeek);
        setMonth(monthNames[newWeek[3].getMonth()]);
        setYear(newWeek[3].getFullYear());
    }


    return (
        <>
            <div id="dashboard-container">
                <div id="dashboard-top">
                    DASHBOARD
                </div>

                <div id="dashboard-middle">
                    <div id="dashboard-left">
                        <div id="reservations-container">
                            <div id="reservations-container-top">
                                <div id="reservations-title">Nearest reservations</div>
                                <button onClick={() => navigateToReservationCreation()} className="page-button">Create new reservation</button>
                            </div>

                            <div id="reservations-search">
                                <FaSearch />
                                <input type="search" placeholder="Search..." />
                            </div>

                            <div id="reservations-calendar">
                                <div id="calendar-top">
                                    <GoTriangleLeft onClick={handleClickBack} />
                                    <div id="current-date">{month} {year}</div>
                                    <GoTriangleRight onClick={handleClickForward} />
                                </div>
                                <div id="calendar-middle">
                                    {week.map((date) =>
                                        <div className="calendar-day">
                                            <div className="weekday-abb">{dayNames[date.getDay()]}</div>
                                            <div className="weekday-num">{date.getDate()}</div>
                                        </div>
                                    )}
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