import React, { useState, useEffect } from "react"
import {
  Button,
  Container,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap"
import { Merchant } from "./Interfaces/Merchant"
import { Employee } from "./Interfaces/Employee"
import { Status } from "./Enums/Status"
import { EmployeeType } from "./Enums/EmployeeType"
import { formatDate } from "./utils/dateUtils"

const PersonalDetails: React.FC = () => {
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [merchant, setMerchant] = useState<Merchant | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch employee info
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
      setEmployee(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  // Fetch merchant info
  const fetchMerchant = async () => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    try {
      const response = await fetch(
        "http://localhost:5282/api/merchants/my-merchant",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch merchant info")
      }

      const data = await response.json()
      setMerchant(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("jwtToken")
    sessionStorage.removeItem("jwtToken")
    window.location.href = "/" // Redirect to login page after logout
  }

  useEffect(() => {
    fetchEmployee()
    fetchMerchant()
  }, [])

  return (
    <div>
      <Container>
        <h1 className="mt-4">Personal Details</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button className="mt-4" color="danger" onClick={handleLogout}>
          Logout
        </Button>

        <h2 className="mt-4">Employee Info</h2>
        {employee ? (
          <Card>
            <CardBody>
              <CardTitle tag="h5">{`${employee.firstName} ${employee.lastName}`}</CardTitle>
              <CardText>
                <strong>Username:</strong> {employee.username}
              </CardText>
              <CardText>
                <strong>Employee Type:</strong>{" "}
                {EmployeeType[employee.employeeType]}
              </CardText>
              <CardText>
                <strong>Status:</strong> {Status[employee.status]}
              </CardText>
              <CardText>
                <strong>Created At:</strong> {formatDate(employee.createdAt)}
              </CardText>
              <CardText>
                <strong>Updated At:</strong> {formatDate(employee.updatedAt)}
              </CardText>
            </CardBody>
          </Card>
        ) : (
          <p>Loading employee info...</p>
        )}

        <h2 className="mt-4">Merchant Info</h2>
        {merchant ? (
          <Card>
            <CardBody>
              <CardTitle tag="h5">{merchant.name}</CardTitle>
              <CardText>
                <strong>Merchant Id:</strong> {merchant.id}
              </CardText>
              <CardText>
                <strong>VAT:</strong> {merchant.VAT}
              </CardText>
              <CardText>
                <strong>Email:</strong> {merchant.email}
              </CardText>
              <CardText>
                <strong>Phone:</strong> {merchant.phone}
              </CardText>
              <CardText>
                <strong>Status:</strong> {Status[merchant.status]}
              </CardText>
              <CardText>
                <strong>Created At:</strong> {formatDate(merchant.createdAt)}
              </CardText>
              <CardText>
                <strong>Updated At:</strong> {formatDate(merchant.updatedAt)}
              </CardText>
              <CardText>
                <strong>Address:</strong>
              </CardText>
              <CardText>{merchant.address.address1}</CardText>
              {merchant.address.address2 && (
                <CardText>{merchant.address.address2}</CardText>
              )}
              <CardText>{merchant.address.city}</CardText>
              <CardText>{merchant.address.country}</CardText>
              <CardText>{merchant.address.zipCode}</CardText>
            </CardBody>
          </Card>
        ) : (
          <p>Loading merchant info...</p>
        )}
      </Container>
    </div>
  )
}

export default PersonalDetails
