import { useNavigate } from "react-router";
import TopNav from './top-nav.tsx';
import './reservation-page.css';
import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5282";

interface Reservation {
    customerId: number;
    serviceId: number;
    employeeId: number;
    startTime: string;
    status: number;
    sendConfirmation: boolean;
}

const createReservation = async (reservation: Reservation, time: string): Promise<void> => {
    const token = localStorage.getItem("jwtToken");

    const data = {
        customerId: reservation.customerId,
        serviceId: reservation.serviceId,
        employeeId: reservation.employeeId,
        startTime: reservation.startTime + "T" + time + ":00.000Z",
        status: reservation.status,
        sendConfirmation: reservation.sendConfirmation,
    };
    console.log(JSON.stringify(data));

    const response = await axios.post<void>(`${API_BASE_URL}/api/reservations`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log("reservation created" + response.data);
}

function ReservationPage() {
    const navigate = useNavigate();

    const now = new Date();
    const currentDate = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    const [time, setTime] = useState("");

    const [newReservation, setNewReservation] = useState({
        customerId: 0,
        serviceId: 0,
        employeeId: 0,
        startTime: "",
        status: 0,
        sendConfirmation: true,
    });

    const handleReservationCreate = () => {
        createReservation(newReservation, time);
    }

    return (
        <>
            <TopNav />

            <div id="reservation-create-container">
                <div id="reservation-container-top">
                    <div id="reservation-create-title">Create reservation</div>
                </div>
                <div id="reservation-container-middle">
                    <div id="create-container">
                        <div id="create-container-input-half">
                            <div id="create-container-left">
                                <div id="create-container-title">Date</div>
                                <input type="date" value={newReservation.startTime}
                                    onChange={(e) => setNewReservation({ ...newReservation, startTime: e.target.value })}
                                />
                                <hr />
                                <input type="time" value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                />
                            </div>
                            <div id="create-container-center">
                                <div id="create-container-title">Customer ID</div>
                                <input
                                    type="number"
                                    value={newReservation.customerId}
                                    onChange={(e) => setNewReservation({ ...newReservation, customerId: parseInt(e.target.value) })}
                                />
                                <hr />
                                <div id="create-container-title">Service ID</div>
                                <input
                                    type="number"
                                    value={newReservation.serviceId}
                                    onChange={(e) => setNewReservation({ ...newReservation, serviceId: parseInt(e.target.value) })}
                                />
                                <hr />
                                <div id="create-container-title">Employee ID</div>
                                <input
                                    type="number"
                                    value={newReservation.employeeId}
                                    onChange={(e) => setNewReservation({ ...newReservation, employeeId: parseInt(e.target.value) })}
                                />
                            </div>
                            <div id="create-container-right">
                                <div id="create-container-title">Status</div>
                                <input
                                    type="number"
                                    value={newReservation.status}
                                    onChange={(e) => setNewReservation({ ...newReservation, status: parseInt(e.target.value) })}
                                />
                                <hr />
                                <label htmlFor="notifications">Send notifications?</label>
                                <input type="checkbox" checked={newReservation.sendConfirmation}
                                    onChange={(e) => setNewReservation({ ...newReservation, sendConfirmation: e.target.checked })}
                                    id="notifications" name="notifications"
                                />
                                
                            </div>
                        </div>
                        <div id="create-container-bottom-half">
                            <button onClick={() => handleReservationCreate()} className="page-button">Save reservation</button>
                        </div>
                    </div>
                </div>
                
                
            </div>
        </>
    )
}

export default ReservationPage
