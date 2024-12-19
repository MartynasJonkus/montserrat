import { useNavigate } from "react-router";
import './reservation-page.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { Service } from "./Interfaces/Service";
import { Employee } from "./Interfaces/Employee"
import { useLocation } from "react-router-dom";

const API_BASE_URL = "http://localhost:5282";

interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
}
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
    alert("Reservation created");
}

const saveReservation = async (reservationId: number, reservation: Reservation, time: string): Promise<void> => {
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

    const response = await axios.put<void>(`${API_BASE_URL}/api/reservations/${reservationId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log("reservation updated" + response.data);
    alert("Reservation updated");
}


function ReservationPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([])
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const reservationId = location.state.id;

    const [time, setTime] = useState("");

    const [newReservation, setNewReservation] = useState({
        customerId: 0,
        serviceId: 0,
        employeeId: 0,
        startTime: "",
        status: 0,
        sendConfirmation: true,
    });


    const fetchCustomers = async () => {
        const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
        if (!token) {
            setError('No JWT token found. Please log in.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5282/api/customers', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch customers');
            }

            const data = await response.json();
            setCustomers(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
        }
    };

    const fetchServices = async () => {
        const token =
            localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
        if (!token) {
            setError("No JWT token found. Please log in.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5282/api/services?pageNumber=1&pageSize=100`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to fetch services");
            }

            const data = await response.json();
            setServices(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        }
    };

    const fetchEmployees = async () => {
        const token =
            localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
        if (!token) {
            setError("No JWT token found. Please log in.")
            return
        }

        try {
            const response = await fetch(
                `http://localhost:5282/api/employees?pageNumber=1&pageSize=100`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Failed to fetch employees")
            }

            const data = await response.json()
            setEmployees(data)
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("An unknown error occurred.")
            }
        }
    };

    const fetchReservation = async (reservationId: number) => {
        const token =
            localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
        if (!token) {
            setError("No JWT token found. Please log in.")
            return
        }

        try {
            const response = await fetch(
                `http://localhost:5282/api/reservations/${reservationId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Failed to fetch employees")
            }

            const data = await response.json()
            console.log(data);
            return data;

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("An unknown error occurred.")
            }
        }
    };

    function substringToSymbol(input: string, symbol: string): string {
        const index = input.indexOf(symbol);
        if (index === -1) {
            return input;
        }
        return input.substring(0, index);
    }
    function substringBetweenSymbols(input: string, startSymbol: string, endSymbol: string): string {
        const startIndex = input.indexOf(startSymbol);
        const endIndex = input.indexOf(endSymbol, startIndex + 1) - 3;

        if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
            return "";
        }

        return input.substring(startIndex + startSymbol.length, endIndex);
    }

    const handleSaveReservation = () => {
        if (reservationId != undefined) {
            saveReservation(reservationId, newReservation, time);
        } else {
            createReservation(newReservation, time);
        }
    }

    useEffect(() => {
        if (reservationId != undefined) {
            const handleFetchReservation = async () => {
                try {
                    const data = await fetchReservation(reservationId);
                    setNewReservation({
                        customerId: data.customerId,
                        serviceId: data.serviceId,
                        employeeId: data.employeeId,
                        startTime: substringToSymbol(data.startTime, 'T'),
                        status: data.status,
                        sendConfirmation: data.sendConfirmation,
                    });
                    setTime(substringBetweenSymbols(data.startTime, 'T', 'Z'));
                } catch (err) {
                    console.error(err);
                }
            }
            handleFetchReservation();
        }
        fetchCustomers();
        fetchServices();
        fetchEmployees();
    }, []);

    return (
        <>

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
                                <div id="create-container-title">Customer</div>
                                <select value={newReservation.customerId} onChange={(e) => setNewReservation({ ...newReservation, customerId: parseInt(e.target.value) })}>
                                    <option value="0">-</option>
                                    {customers.map(customer =>
                                        <option value={customer.id}>{customer.firstName} {customer.lastName}</option>
                                    )}
                                </select>
                                <hr />
                                <div id="create-container-title">Service</div>
                                <select value={newReservation.serviceId} onChange={(e) => setNewReservation({ ...newReservation, serviceId: parseInt(e.target.value) })}>
                                    <option value="0">-</option>
                                    {services.map(service =>
                                        <option value={service.id}>{service.title}</option>
                                    )}
                                </select>
                                <hr />
                                <div id="create-container-title">Employee</div>
                                <select value={newReservation.employeeId} onChange={(e) => setNewReservation({ ...newReservation, employeeId: parseInt(e.target.value) })}>
                                    <option value="0">-</option>
                                    {employees.map(employee =>
                                        <option value={employee.id}>{employee.firstName} {employee.lastName}</option>
                                    )}
                                </select>
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
                            <button onClick={() => handleSaveReservation()} className="page-button">Save reservation</button>
                        </div>
                    </div>
                </div>
                
                
            </div>
        </>
    )
}

export default ReservationPage
