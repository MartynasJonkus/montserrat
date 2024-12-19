import "./top-nav.css"
import { useNavigate } from "react-router"
function TopNav() {
  const navigate = useNavigate()

  return (
    <>
      <div id="top-nav">
        <div id="top-nav-left">
          <button
            onClick={() => navigate("/dashboard")}
            className="page-button"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/ordermanagement")}
            className="page-button"
          >
            Orders
          </button>
          <button
            onClick={() => navigate("/reservationmanagement")}
            className="page-button"
          >
            Reservations
          </button>
        </div>
        <div id="top-nav-right">
          <button
                onClick={() => navigate("/merchantmanagement")}
                className="page-button"
              >
                Merchant management
              </button>
          <button
                onClick={() => navigate("/employeemanagement")}
                className="page-button"
              >
                Employee management
              </button>

          <div id="dropdown-menu" className="page-button">
            <div id="menu-title">Catalog</div>
            <div id="dropdown-content">
              <button
                onClick={() => navigate("/productmanagement")}
                className="menu-button"
              >
                Product management
              </button>
              <button
                onClick={() => navigate("/servicemanagement")}
                className="menu-button"
              >
                Service management
              </button>
              <button
                onClick={() => navigate("/giftcardmanagement")}
                className="menu-button"
              >
                Giftcard management
              </button>
              <button
                onClick={() => navigate("/taxmanagement")}
                className="menu-button"
              >
                Tax management
              </button>
              <button
                onClick={() => navigate("/discountmanagement")}
                className="menu-button"
              >
                Discount management
              </button>
              <button
                onClick={() => navigate("/orderdiscountmanagement")}
                className="menu-button"
              >
                Order Discount management
              </button>
              <button
                onClick={() => navigate("/customermanagement")}
                className="menu-button"
              >
                Customer management
              </button>
            </div>
            
          </div>
          <button
                onClick={() => navigate("/personaldetails")}
                className="page-button"
              >
                My Details
              </button>
        </div>
      </div>
    </>
  )
}

export default TopNav
