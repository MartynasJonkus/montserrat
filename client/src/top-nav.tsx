
import './top-nav.css'
import { useNavigate } from "react-router";
function TopNav() {
    const navigate = useNavigate();

    return (
        <>
            <div id="top-nav">
                <div id="top-nav-left">
                    <div className="circle" />
                    <button onClick={() => navigate("/")} className="page-button">Dashboard</button>
                    <button onClick={() => navigate("/ordermanagment")} className="page-button">Orders</button>
                    <button onClick={() => { }} className="page-button">Reservations</button>
                </div>
                <div id="top-nav-right">
                    <button onClick={() => { }} className="page-button">Catalog</button>
                </div>
            </div>
        </>
    )
}

export default TopNav