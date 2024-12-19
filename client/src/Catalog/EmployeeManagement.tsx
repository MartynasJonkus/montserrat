import React, { useState, useEffect } from "react"
import {
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Container,
} from "reactstrap"
import { Employee, CreateEmployeeDto } from "../Interfaces/Employee"
import { Status } from "../Enums/Status"
import { EmployeeType } from "../Enums/EmployeeType"
import { useNavigate } from "react-router-dom"

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [error, setError] = useState<string | null>(null)
  const [newEmployee, setNewEmployee] = useState<CreateEmployeeDto>({
    firstName: "",
    lastName: "",
    employeeType: 0,
    username: "",
    password: "",
    status: 0,
  })

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(10)
  const navigate = useNavigate()

  const fetchEmployees = async () => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    try {
      const response = await fetch(
        `http://localhost:5282/api/employees?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch employees")
      }

      const data = await response.json()
      setEmployees(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  const handleViewDetailsClick = (employee: Employee) => {
    navigate(`/employee-details/${employee.id}`)
  }

  const handleAddEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    try {
      const response = await fetch("http://localhost:5282/api/employees", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to add employee")
      }

      setNewEmployee({
        firstName: "",
        lastName: "",
        employeeType: 0,
        username: "",
        password: "",
        status: 0,
      })

      fetchEmployees()
      alert("Employee added successfully!")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber)
  }

  useEffect(() => {
    fetchEmployees()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber])

  return (
    <div>
      <Container>
        <h1 className="mt-4">Employee Management</h1>

        {error && <Alert color="danger">{error}</Alert>}

        {employees.length > 0 ? (
          <Table striped className="mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Type</th>
                <th>Username</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{EmployeeType[employee.employeeType]}</td>
                  <td>{employee.username}</td>
                  <td>{Status[employee.status]}</td>
                  <td>
                    <Button
                      size="sm"
                      color="info"
                      onClick={() => handleViewDetailsClick(employee)}
                    >
                      View details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert color="info" className="mt-4">
            No employees found.
          </Alert>
        )}

        <div className="mt-4">
          <p>Page {pageNumber}</p>
          <Button
            color="secondary"
            onClick={() => handlePageChange(pageNumber - 1)}
            disabled={pageNumber === 1}
          >
            Previous
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => handlePageChange(pageNumber + 1)}
          >
            Next
          </Button>
        </div>

        <Form className="mt-4" onSubmit={handleAddEmployeeSubmit}>
          <h2>Add New Employee</h2>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              id="firstName"
              value={newEmployee.firstName}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, firstName: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              value={newEmployee.lastName}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, lastName: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={newEmployee.username}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, username: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={newEmployee.password}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, password: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="employeeType">Employee Type</Label>
            <Input
              type="select"
              id="employeeType"
              value={newEmployee.employeeType}
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  employeeType: parseInt(e.target.value, 10),
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
              value={newEmployee.status}
              onChange={(e) =>
                setNewEmployee({
                  ...newEmployee,
                  status: parseInt(e.target.value, 10),
                })
              }
            >
              {Object.entries(Status).map(([key, value]) => (
                <option key={value} value={value}>
                  {key}
                </option>
              ))}
            </Input>
          </FormGroup>
          <Button color="primary" type="submit">
            Add Employee
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default EmployeeManagement
