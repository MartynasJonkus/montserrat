import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container, Button, Alert, Row, Col } from "reactstrap"
import TopNav from "../top-nav"
import { Status } from "../Enums/Status"
import { Currency } from "../Enums/Currency"
import { Service } from "../Interfaces/Service"

const ServiceDetails: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>()
  const [service, setService] = useState<Service | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const navigate = useNavigate()

  const fetchServiceDetails = async () => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch(
        `http://localhost:5282/api/services/${serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch service details")
      }

      const data = await response.json()
      setService(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (serviceId) {
      fetchServiceDetails()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId])

  const handleBackToServices = () => {
    navigate("/servicemanagement")
  }

  const handleEditService = () => {
    navigate(`/edit-service/${serviceId}`)
  }

  return (
    <div>
      <TopNav />
      <Container>
        <h1 className="mt-4">Service Details</h1>
        <hr />

        {loading && <p>Loading...</p>}

        {error && <Alert color="danger">{error}</Alert>}

        {service && (
          <>
            <Row>
              <Col md={6}>
                <h2>{service.title}</h2>
                <p>
                  <strong>Price:</strong> {service.price.amount.toFixed(2)}{" "}
                  {Currency[service.price.currency]}
                </p>
                <p>
                  <strong>Status:</strong> {Status[service.status]}
                </p>
                <p>
                  <strong>Duration:</strong> {service.durationMins} minutes
                </p>
                <p>
                  <strong>Employee ID:</strong> {service.employeeId ?? "N/A"}
                </p>
                <p>
                  <strong>Category ID:</strong> {service.categoryId ?? "N/A"}
                </p>
                <p>
                  <strong>Discount ID:</strong> {service.discountId ?? "N/A"}
                </p>
                <p>
                  <strong>Tax ID:</strong> {service.taxId ?? "N/A"}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(service.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Updated At:</strong>{" "}
                  {new Date(service.updatedAt).toLocaleString()}
                </p>
              </Col>
            </Row>
            <Button
              color="secondary"
              className="mt-3"
              onClick={handleBackToServices}
            >
              Back to Service Management
            </Button>{" "}
            <Button
              color="primary"
              className="mt-3"
              onClick={handleEditService}
            >
              Edit Service
            </Button>
          </>
        )}
      </Container>
    </div>
  )
}

export default ServiceDetails
