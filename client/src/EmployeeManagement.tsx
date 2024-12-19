import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  employeeType: number;
  username: string;
  password: string;
  status: number;
}

const EmployeeManagement: React.FC = () => {
  const [employeeTypes, setEmployeeTypes] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [viewEmployee, setViewEmployee] = useState<Employee | null>(null);

  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: 0,
    firstName: '',
    lastName: '',
    employeeType: 0,
    username: '',
    password: '',
    status: 0,
  });

  const fetchEmployee = async () => {
    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5282/api/employee', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch employees.');
      }

      const data = await response.json();
      setEmployeeTypes(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const navigate = useNavigate();

  const handleViewDetailsClick = (employee: Employee) => {
    setViewEmployee(employee); // Set Employee for viewing details
    navigate(`/employee-details/${employee.id}`);
  };

  const handleAddEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5282/api/employee', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add employee.');
      }

      setNewEmployee({
        id: 0,
        firstName: '',
        lastName: '',
        employeeType: 0,
        username: '',
        password: '',
        status: 0,
      });

      fetchEmployee(); // Refresh employee list
      alert('Employee added successfully!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteEmployee = async (employeeId: number) => {
    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5282/api/employee/${employeeId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete employee.');
      }

      fetchEmployee(); // Refresh employee list
      alert('Employee deleted successfully!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {employeeTypes.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Type</th>
              <th>Username</th>
              <th>Password</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employeeTypes.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.employeeType}</td>
                <td>{employee.username}</td>
                <td>{employee.password}</td>
                <td>{employee.status}</td>
                <td>
                  <button onClick={() => handleViewDetailsClick(employee)}>View Details</button>
                  <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found.</p>
      )}

      {viewEmployee && (
        <div>
          <h2>Employee Details</h2>
          <p><strong>ID:</strong> {viewEmployee.id}</p>
          <p><strong>Name:</strong> {viewEmployee.firstName}</p>
          <p><strong>Surname:</strong> {viewEmployee.lastName}</p>
          <p><strong>Type:</strong> {viewEmployee.employeeType}</p>
          <p><strong>Username:</strong> {viewEmployee.username}</p>
          <p><strong>Password:</strong> {viewEmployee.password}</p>
          <p><strong>Status:</strong> {viewEmployee.status}</p>
        </div>
      )}

      <h2>Add New Employee</h2>
      <form onSubmit={handleAddEmployeeSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={newEmployee.firstName}
            onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
          />
        </div>
        <div>
          <label>Surname:</label>
          <input
            type="text"
            value={newEmployee.lastName}
            onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
          />
        </div>
        <div>
          <label>Type (integer):</label>
          <input
            type="number"
            value={newEmployee.employeeType}
            onChange={(e) => setNewEmployee({ ...newEmployee, employeeType: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={newEmployee.username}
            onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="text"
            value={newEmployee.password}
            onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
          />
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default EmployeeManagement;
