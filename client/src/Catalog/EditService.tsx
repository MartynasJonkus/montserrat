import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  Container,
  Button,
  Alert,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap"
import TopNav from "../top-nav"
import { Status } from "../Enums/Status"
import { Tax } from "../Interfaces/Tax"
import { Discount } from "../Interfaces/Discount"
import { Category } from "../Interfaces/Category"
import { Employee } from "../Interfaces/Employee"
import { Service } from "../Interfaces/Service"

const EditService: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>()
  const [service, setService] = useState<Service | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [taxes, setTaxes] = useState<Tax[]>([])
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const navigate = useNavigate()

  useEffect(() => {
    fetchServiceDetails()
    fetchCategories()
    fetchTaxes()
    fetchDiscounts()
    fetchEmployees()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId])

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

  const fetchCategories = async () => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    const response = await fetch("http://localhost:5282/api/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    setCategories(data)
  }

  const fetchTaxes = async () => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    const response = await fetch("http://localhost:5282/api/taxes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    setTaxes(data)
  }

  const fetchDiscounts = async () => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    const response = await fetch("http://localhost:5282/api/discounts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    setDiscounts(data)
  }

  const fetchEmployees = async () => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    const response = await fetch("http://localhost:5282/api/employees", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    setEmployees(data)
  }

  const handleUpdateService = async () => {
    if (!service) return

    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    try {
      const response = await fetch(
        `http://localhost:5282/api/services/${serviceId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(service),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update service")
      }
      navigate(`/service-details/${serviceId}`)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  return (
    <div>
      <TopNav />
      <Container>
        <h1>Edit Service</h1>

        {loading && <p>Loading...</p>}
        {error && <Alert color="danger">{error}</Alert>}

        {service && (
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="title">Service Title</Label>
                  <Input
                    type="text"
                    id="title"
                    value={service.title}
                    onChange={(e) =>
                      setService({ ...service, title: e.target.value })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="price">Price</Label>
                  <Input
                    type="number"
                    id="price"
                    value={service.price.amount}
                    onChange={(e) =>
                      setService({
                        ...service,
                        price: {
                          ...service.price,
                          amount: parseFloat(e.target.value),
                        },
                      })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="duration">Duration (minutes)</Label>
                  <Input
                    type="number"
                    id="duration"
                    value={service.durationMins}
                    onChange={(e) =>
                      setService({
                        ...service,
                        durationMins: parseInt(e.target.value),
                      })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="status">Status</Label>
                  <Input
                    type="select"
                    id="status"
                    value={service.status}
                    onChange={(e) =>
                      setService({
                        ...service,
                        status: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value={Status.Active}>Active</option>
                    <option value={Status.Inactive}>Inactive</option>
                    <option value={Status.Archived}>Archived</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="categoryId">Category</Label>
                  <Input
                    type="select"
                    id="categoryId"
                    value={service.categoryId || ""}
                    onChange={(e) =>
                      setService({
                        ...service,
                        categoryId: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="taxId">Tax</Label>
                  <Input
                    type="select"
                    id="taxId"
                    value={service.taxId || ""}
                    onChange={(e) =>
                      setService({
                        ...service,
                        taxId: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="">Select Tax</option>
                    {taxes.map((tax) => (
                      <option key={tax.id} value={tax.id}>
                        {tax.title} ({tax.percentage}%)
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="discountId">Discount</Label>
                  <Input
                    type="select"
                    id="discountId"
                    value={service.discountId || ""}
                    onChange={(e) =>
                      setService({
                        ...service,
                        discountId: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="">Select Discount</option>
                    {discounts.map((discount) => (
                      <option key={discount.id} value={discount.id}>
                        {discount.title} ({discount.percentage}%)
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="employeeId">Assigned Employee</Label>
                  <Input
                    type="select"
                    id="employeeId"
                    value={service.employeeId || ""}
                    onChange={(e) =>
                      setService({
                        ...service,
                        employeeId: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="">Select Employee</option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.firstName} {employee.lastName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                <Button color="primary" onClick={handleUpdateService}>
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Container>
    </div>
  )
}

export default EditService
