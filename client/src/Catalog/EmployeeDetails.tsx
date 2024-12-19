import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Button, Alert, Row, Col } from "reactstrap";
import { Status } from "../Enums/Status";
import { Employee } from "../Interfaces/Employee";
import { EmployeeType } from "../Enums/EmployeeType";

const EmployeeDetails: React.FC = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const fetchEmployeeDetails = async () => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
    if (!token) {
      setError("No JWT token found. Please log in.");
      setLoading(false);
      return;
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
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch employee details");
      }

      const data = await response.json();
      setEmployee(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (employeeId) {
      fetchEmployeeDetails();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId]);

  const handleBackToEmployees = () => {
    navigate("/employeemanagement");
  };

  const handleEditEmployee = () => {
    navigate(`/edit-employee/${employeeId}`);
  };

  return (
    <div>
      <Container>
        <h1 className="mt-4">Employee Details</h1>
        <hr />

        {loading && <p>Loading...</p>}

        {error && <Alert color="danger">{error}</Alert>}

        {employee && (
          <>
            <Row>
              <Col md={6}>
                <h2>{`${employee.firstName} ${employee.lastName}`}</h2>
                <p>
                  <strong>Username:</strong> {employee.username}
                </p>
                <p>
                  <strong>Employee Type:</strong> {EmployeeType[employee.employeeType]}
                </p>
                <p>
                  <strong>Status:</strong> {Status[employee.status]}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(employee.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Updated At:</strong>{" "}
                  {new Date(employee.updatedAt).toLocaleString()}
                </p>
              </Col>
            </Row>
            <Button
              color="secondary"
              className="mt-3"
              onClick={handleBackToEmployees}
            >
              Back to Employee Management
            </Button>{" "}
            <Button
              color="primary"
              className="mt-3"
              onClick={handleEditEmployee}
            >
              Edit Employee
            </Button>
          </>
        )}
      </Container>
    </div>
  );
};

export default EmployeeDetails;
