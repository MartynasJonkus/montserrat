import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { EmployeeType } from "./Enums/EmployeeType"
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  NavbarBrand,
  NavbarToggler,
  Collapse,
} from "reactstrap"

const TopNav: React.FC = () => {
  const navigate = useNavigate()
  const [employeeType, setEmployeeType] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)

  const fetchEmployee = async () => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    try {
      const response = await fetch(
        "http://localhost:5282/api/employees/my-info",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch employee info")
      }

      const data = await response.json()
      setEmployeeType(parseInt(data.employeeType)) // Assuming the API response includes an `employeeType` field
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  useEffect(() => {
    fetchEmployee()
  }, [])

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState)
  const toggleNav = () => setIsNavOpen((prevState) => !prevState)

  return (
    <>
      <Navbar color="dark" dark expand="md" className="mb-4">
        <NavbarBrand href="/dashboard">Montserrat</NavbarBrand>
        <NavbarToggler onClick={toggleNav} />
        <Collapse isOpen={isNavOpen} navbar>
          <Nav className="me-auto left-nav" navbar>
            <NavItem>
              <NavLink onClick={() => navigate("/dashboard")}>
                Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => navigate("/ordermanagement")}>
                Orders
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => navigate("/reservationmanagement")}>
                Reservations
              </NavLink>
            </NavItem>
          </Nav>

          <Nav navbar className="right-nav">
            {/* Conditionally render Merchant Management if Admin */}
            {employeeType === EmployeeType.admin && (
              <NavItem>
                <NavLink onClick={() => navigate("/merchantmanagement")}>
                  Merchants
                </NavLink>
              </NavItem>
            )}

            {/* Conditionally render Employee Management if Admin or Owner */}
            {(employeeType === EmployeeType.admin ||
              employeeType === EmployeeType.owner) && (
              <NavItem>
                <NavLink onClick={() => navigate("/employeemanagement")}>
                  Employees
                </NavLink>
              </NavItem>
            )}

            {/* Dropdown Menu */}
            <Dropdown nav isOpen={isDropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle nav caret>
                Catalog
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => navigate("/productmanagement")}>
                  Product Management
                </DropdownItem>
                <DropdownItem onClick={() => navigate("/servicemanagement")}>
                  Service Management
                </DropdownItem>
                <DropdownItem onClick={() => navigate("/giftcardmanagement")}>
                  Giftcard Management
                </DropdownItem>
                <DropdownItem onClick={() => navigate("/taxmanagement")}>
                  Tax Management
                </DropdownItem>
                <DropdownItem onClick={() => navigate("/discountmanagement")}>
                  Discount Management
                </DropdownItem>
                <DropdownItem
                  onClick={() => navigate("/orderdiscountmanagement")}
                >
                  Order Discount Management
                </DropdownItem>
                <DropdownItem onClick={() => navigate("/customermanagement")}>
                  Customer Management
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavItem>
              <Button
                color="light"
                onClick={() => navigate("/personaldetails")}
              >
                My Details
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      {error && <div className="alert alert-danger">{error}</div>}
    </>
  )
}

export default TopNav
