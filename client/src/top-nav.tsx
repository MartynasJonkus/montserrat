
import './top-nav.css'
import { useNavigate } from "react-router";
function TopNav() {
    const navigate = useNavigate();

    return (
        <>
            <div id="top-nav">
                <div id="top-nav-left">
                    <div id="dropdown-menu">
                        <div className="circle" />
                        <div id="dropdown-content">
                            <p>Employee details</p>
                        </div>
                    </div>
                    
                    <button onClick={() => navigate("/")} className="page-button">Dashboard</button>
                    <button onClick={() => navigate("/ordermanagement")} className="page-button">Orders</button>
                    <button onClick={() => navigate("/reservationmanagement")} className="page-button">Reservations</button>
                </div>
                <div id="top-nav-right">

                    <div id="dropdown-menu" className="page-button">
                        <div id="menu-title">Catalog</div>
                        <div id="dropdown-content">
                            <button onClick={() => navigate("/")} className="menu-button">Product management</button>
                            <button onClick={() => navigate("/")} className="menu-button">Service management</button>
                            <button onClick={() => navigate("/")} className="menu-button">Employee management</button>
                            <button onClick={() => navigate("/")} className="menu-button">Giftcard management</button>
                            <button onClick={() => navigate("/")} className="menu-button">Discount management</button>
                            <button onClick={() => navigate("/")} className="menu-button">Tax management</button>
                            <button onClick={() => navigate("/")} className="menu-button">Customer management</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default TopNav