import "./top-nav.css"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { EmployeeType } from "./Enums/EmployeeType"

function TopNav() {
    const navigate = useNavigate();
    const [employeeType, setEmployeeType] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    const fetchEmployee = async () => {
      const token =
        localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
      if (!token) {
        setError("No JWT token found. Please log in.");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:5282/api/employees/my-info", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch employee info");
        }
  
        const data = await response.json();
        setEmployeeType(parseInt(data.employeeType)); // Assuming the API response includes an `employeeType` field
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
    };
  
    useEffect(() => {
      fetchEmployee();
    }, []);

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
          {/* Conditionally render Merchant Management if Admin */}
          {employeeType === EmployeeType.admin && (
            <button
              onClick={() => navigate("/merchantmanagement")}
              className="page-button"
            >
              Merchant Management
            </button>
          )}

          {/* Conditionally render Employee Management if Admin or Owner */}
          {(employeeType === EmployeeType.admin ||
            employeeType === EmployeeType.owner) && (
            <button
              onClick={() => navigate("/employeemanagement")}
              className="page-button"
            >
              Employee Management
            </button>
          )}

          <div id="dropdown-menu" className="page-button">
            <div id="menu-title">Catalog</div>
            <div id="dropdown-content">
              <button
                onClick={() => navigate("/productmanagement")}
                className="menu-button"
              >
                Product Management
              </button>
              <button
                onClick={() => navigate("/servicemanagement")}
                className="menu-button"
              >
                Service Management
              </button>
              <button
                onClick={() => navigate("/giftcardmanagement")}
                className="menu-button"
              >
                Giftcard Management
              </button>
              <button
                onClick={() => navigate("/taxmanagement")}
                className="menu-button"
              >
                Tax Management
              </button>
              <button
                onClick={() => navigate("/discountmanagement")}
                className="menu-button"
              >
                Discount Management
              </button>
              <button
                onClick={() => navigate("/orderdiscountmanagement")}
                className="menu-button"
              >
                Order Discount Management
              </button>
              <button
                onClick={() => navigate("/customermanagement")}
                className="menu-button"
              >
                Customer Management
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
      {error && <div className="error-message">{error}</div>}
    </>
  )
}

export default TopNav
