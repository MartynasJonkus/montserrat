import { FaSearch } from "react-icons/fa";
import TopNav from './top-nav.tsx';
import axios from "axios";
import { useEffect, useState } from "react";
import { ReservationStatus } from "./Enums/ReservationStatus";

const API_BASE_URL = "http://localhost:5282";
interface ReservationResponse {
    id: number;
    customerId: number;
    serviceId: number;
    employeeId: number;
    startTime: string;
    endTime: string;
    status: number;
    sendConfirmation: boolean;
    createdAt: string;
    updatedAt: string;
}

const changeStatus = async (reservation: ReservationResponse, newStatus: number): Promise<void> => {
    const token = localStorage.getItem("jwtToken");

    const data = {
        customerId: reservation.customerId,
        serviceId: reservation.serviceId,
        employeeId: reservation.employeeId,
        startTime: reservation.startTime,
        status: newStatus,
        sendConfirmation: reservation.sendConfirmation,
    }
    console.log(JSON.stringify(data));
    const response = await axios.put<void>(`${API_BASE_URL}/api/reservations/${reservation.id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log("reservation status updated" + response.data);
    window.location.reload();
}

const deleteReservation = async (reservationId: number): Promise<void> => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.delete<void>(`${API_BASE_URL}/api/reservations/${reservationId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log("reservation deleted" + response.data);
    window.location.reload();
}

const fetchReservationData = async (): Promise<ReservationResponse[]> => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.get<ReservationResponse[]>(`${API_BASE_URL}/api/reservations`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log(response.data);
    return response.data;
}
function ReservationMng() {
    const [reservations, setReservations] = useState<ReservationResponse[]>([]);

    useEffect(() => {
        handleFetchReservationData();
    }, []);

    const handleFetchReservationData = async () => {
        try {
            const data = await fetchReservationData();
            setReservations(data);
        } catch (err) {
            console.error(err);
        }
    }

    const handleStatusChange = async (reservationId: number) => {
        const input = prompt("New reservation status:");

        if (input.length <= 0 || isNaN(input)) {
            alert("Invalid input");
        }
        else {
            const reservationToEdit = reservations.find((reservation) => reservation.id === reservationId);
            if (reservationToEdit != undefined) {
                await changeStatus(reservationToEdit, parseInt(input));
            }
        }

    }

    const allReservations = reservations.map(reservation =>
        <div className="all-orders">
            <div className="active-order-left">
                <div className="reservation-detail">ID: {reservation.id}</div>
                <div className="reservation-detail">Customer ID: {reservation.customerId}</div>
                <div className="reservation-detail">Employee ID: {reservation.employeeId}</div>
                <div className="reservation-detail">Start time: {reservation.startTime}</div>
                <div className="reservation-detail">End time: {reservation.endTime}</div>
                <div className="reservation-detail">Status: {ReservationStatus[reservation.status]}</div>
            </div>
            <div className="active-order-right">
                <button onClick={() => { handleStatusChange(reservation.id) } } className="page-button">Change status</button>
                <button onClick={() => { deleteReservation(reservation.id)} } className="page-button">Delete</button>
            </div>
        </div>
    )

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
                            {allReservations}
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReservationMng
