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
import { Status } from "../Enums/Status"
import { EmployeeType } from "../Enums/EmployeeType"
import { Employee } from "../Interfaces/Employee"

const EditEmployee: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>()
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const navigate = useNavigate()

  useEffect(() => {
    fetchEmployeeDetails()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId])

  const fetchEmployeeDetails = async () => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch(
        `http://localhost:5282/api/employees/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch employee details")
      }

      const data = await response.json()
      setEmployee(data)
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

  const handleUpdateEmployee = async () => {
    if (!employee) return

    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    try {
      const response = await fetch(
        `http://localhost:5282/api/employees/${employeeId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employee),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update employee")
      }
      navigate(`/employee-details/${employeeId}`)
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
      <Container>
        <h1>Edit Employee</h1>

        {loading && <p>Loading...</p>}
        {error && <Alert color="danger">{error}</Alert>}

        {employee && (
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input
                    type="text"
                    id="firstName"
                    value={employee.firstName}
                    onChange={(e) =>
                      setEmployee({ ...employee, firstName: e.target.value })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="lastName">Last Name</Label>
                  <Input
                    type="text"
                    id="lastName"
                    value={employee.lastName}
                    onChange={(e) =>
                      setEmployee({ ...employee, lastName: e.target.value })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input
                    type="text"
                    id="username"
                    value={employee.username}
                    onChange={(e) =>
                      setEmployee({ ...employee, username: e.target.value })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    value={employee.password || ""}
                    onChange={(e) =>
                      setEmployee({ ...employee, password: e.target.value })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="employeeType">Employee Type</Label>
                  <Input
                    type="select"
                    id="employeeType"
                    value={employee.employeeType}
                    onChange={(e) =>
                      setEmployee({
                        ...employee,
                        employeeType: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value={EmployeeType.admin}>Admin</option>
                    <option value={EmployeeType.owner}>Owner</option>
                    <option value={EmployeeType.regular}>Regular</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="status">Status</Label>
                  <Input
                    type="select"
                    id="status"
                    value={employee.status}
                    onChange={(e) =>
                      setEmployee({
                        ...employee,
                        status: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value={Status.Active}>Active</option>
                    <option value={Status.Inactive}>Inactive</option>
                    <option value={Status.Archived}>Archived</option>
                  </Input>
                </FormGroup>

                <Button color="primary" onClick={handleUpdateEmployee}>
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

export default EditEmployee
