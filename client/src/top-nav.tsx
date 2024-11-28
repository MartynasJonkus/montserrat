import './top-nav.css'
import { useNavigate } from "react-router";
function TopNav() {
    const navigate = useNavigate();

    return (
        <>
            <div id="top-nav">
                <div id="top-nav-left">
                    <div className="circle" />
                    <button onClick={() => { }} className="page-button">Products</button>
                    <button onClick={() => { }} className="page-button">Reservations</button>
                    <button onClick={() => { }} className="page-button">Taxes</button>
                </div>
                <div id="top-nav-right">
                    <button onClick={() => { }} className="page-button">Employees</button>
                </div>
            </div>
        </>
    )
}

export default TopNav