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
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editableEmployee, setEditableEmployee] = useState<Employee | null>(null);

  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    employeeType: 0,
    username: '',
    password: '',
    status: 0,
  });

  // Fetch the list of employees
  const fetchEmployees = async () => {
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
        throw new Error(errorData.message || 'Failed to fetch employees');
      }

      const data = await response.json();
      setEmployees(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle the start of editing an employee's details
  const handleEditClick = (employee: Employee) => {
    setEditableEmployee(employee); // Set the employee to be edited
  };

  // Handle submitting the updated employee form
  const handleSaveEmployee = async (employee: Employee) => {
    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5282/api/employee/${employee.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save employee');
      }

      fetchEmployees(); // Fetch updated list of employees
      setEditableEmployee(null); // Stop editing mode
      alert('Employee updated successfully!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle canceling the edit
  const handleCancelEdit = () => {
    setEditableEmployee(null); // Cancel editing
  };

  // Handle submitting the new employee form
  const handleAddEmployeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    const newEmployeeData = {
      firstName: newEmployee.firstName,
      lastName: newEmployee.lastName,
      employeeType: newEmployee.employeeType,
      username: newEmployee.username,
      password: newEmployee.password,
      status: newEmployee.status,
    };

    try {
      const response = await fetch('http://localhost:5282/api/employee', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployeeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add employee');
      }

      setNewEmployee({
        firstName: '',
        lastName: '',
        employeeType: 0,
        username: '',
        password: '',
        status: 0,
      });

      fetchEmployees(); // Fetch updated list of employees
      alert('Employee added successfully!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle deleting an employee
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
        throw new Error(errorData.message || 'Failed to delete employee');
      }

      fetchEmployees(); // Fetch updated list of employees
      alert('Employee deleted successfully!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  // UseEffect to fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Employee List */}
      {employees.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Employee Type</th>
              <th>Username</th>
              <th>Password</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>
                  {editableEmployee?.id === employee.id ? (
                    <input
                      type="text"
                      value={editableEmployee.firstName}
                      onChange={(e) => setEditableEmployee({ ...editableEmployee, firstName: e.target.value })}
                    />
                  ) : (
                    employee.firstName
                  )}
                </td>
                <td>
                  {editableEmployee?.id === employee.id ? (
                    <input
                      type="text"
                      value={editableEmployee.lastName}
                      onChange={(e) => setEditableEmployee({ ...editableEmployee, lastName: e.target.value })}
                    />
                  ) : (
                    employee.lastName
                  )}
                </td>
                <td>
                  {editableEmployee?.id === employee.id ? (
                    <input
                      type="number"
                      value={editableEmployee.employeeType}
                      onChange={(e) => setEditableEmployee({ ...editableEmployee, employeeType: parseInt(e.target.value) })}
                    />
                  ) : (
                    employee.employeeType
                  )}
                </td>
                <td>
                  {editableEmployee?.id === employee.id ? (
                    <input
                      type="text"
                      value={editableEmployee.username}
                      onChange={(e) => setEditableEmployee({ ...editableEmployee, username: e.target.value })}
                    />
                  ) : (
                    employee.username
                  )}
                </td>
                <td>
                  {editableEmployee?.id === employee.id ? (
                    <input
                      type="text"
                      value={editableEmployee.password}
                      onChange={(e) => setEditableEmployee({ ...editableEmployee, password: e.target.value })}
                    />
                  ) : (
                    employee.password
                  )}
                </td>
                <td>
                  {editableEmployee?.id === employee.id ? (
                    <input
                      type="number"
                      value={editableEmployee.status}
                      onChange={(e) => setEditableEmployee({ ...editableEmployee, status: parseInt(e.target.value) })}
                    />
                  ) : (
                    employee.status
                  )}
                </td>
                <td>
                  {editableEmployee?.id === employee.id ? (
                    <>
                      <button onClick={() => handleSaveEmployee(editableEmployee)}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(employee)}>Edit</button>
                      <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found.</p>
      )}

      {/* Add Employee Form */}
      <h2>Add New Employee</h2>
      <form onSubmit={handleAddEmployeeSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={newEmployee.firstName}
            onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={newEmployee.lastName}
            onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
          />
        </div>
        <div>
          <label>Employee Type:</label>
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
        <div>
          <label>Status:</label>
          <input
            type="number"
            value={newEmployee.status}
            onChange={(e) => setNewEmployee({ ...newEmployee, status: parseInt(e.target.value) })}
          />
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default EmployeeManagement;
