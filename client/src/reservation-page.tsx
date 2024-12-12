import { GoArrowLeft } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import TopNav from './top-nav.tsx';
import './reservation-page.css';


function ReservationPage() {
    const navigate = useNavigate();

    const now = new Date();
    const currentDate = now.getFullYear() + "-" + (now.getMonth()+1) + "-" + now.getDate();
    console.log(currentDate);

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
                                <input type="date" value={currentDate} />
                                <hr />
                                <input type="time" />
                            </div>
                            <div id="create-container-center">
                                <div id="create-container-title">Service</div>
                                <select>
                                    <option value="">-</option>
                                    <option value="Service1">Service 1</option>
                                    <option value="Service2">Service 2</option>
                                    <option value="Service3">Service 3</option>
                                    <option value="Service4">Service 4</option>
                                    <option value="Service5">Service 5</option>
                                    <option value="Service6">Service 6</option>
                                </select>
                            </div>
                            <div id="create-container-right">
                                <div id="create-container-title">Customer</div>
                                <select>
                                    <option value="">-</option>
                                    <option value="customer1">name lastname</option>
                                    <option value="customer2">name lastname</option>
                                    <option value="customer3">name lastname</option>
                                    <option value="customer4">name lastname</option>
                                    <option value="customer5">name lastname</option>
                                </select>
                            </div>
                        </div>
                        <div id="create-container-bottom-half">
                            <button className="page-button">Save reservation</button>
                        </div>
                    </div>
                </div>
                
                
            </div>
        </>
    )
}

export default ReservationPage
