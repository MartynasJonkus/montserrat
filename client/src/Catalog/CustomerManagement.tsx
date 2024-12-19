import React, { useState, useEffect } from 'react';
import { Button, Table, Form, FormGroup, Label, Input, Alert, Container, Row, Col } from 'reactstrap';

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
}

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editableCustomer, setEditableCustomer] = useState<Customer | null>(null);

  const [newCustomer, setNewCustomer] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  // Fetch customers
  const fetchCustomers = async () => {
    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5282/api/customers', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch customers');
      }

      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  // Start editing a customer
  const handleEditClick = (customer: Customer) => {
    setEditableCustomer({ ...customer }); // Start editing
  };

  // Save edited customer
  const handleSaveCustomer = async (customer: Customer) => {
    if (!customer || !customer.id || !customer.firstName || !customer.lastName || !customer.phone) {
      setError('All fields are required to save changes.');
      return;
    }

    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5282/api/customers/${customer.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: customer.firstName,
          lastName: customer.lastName,
          phone: customer.phone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save customer');
      }

      // Update customer list locally to prevent moving it to the bottom
      setCustomers((prev) =>
        prev.map((c) => (c.id === customer.id ? { ...customer } : c))
      );

      setEditableCustomer(null); // Stop editing mode
      alert('Customer updated successfully!');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditableCustomer(null); // Cancel editing
  };

  // Add new customer
  const handleAddCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    const newCustomerData = {
      firstName: newCustomer.firstName,
      lastName: newCustomer.lastName,
      phone: newCustomer.phone,
    };

    try {
      const response = await fetch('http://localhost:5282/api/customers', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCustomerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add customer');
      }

      setNewCustomer({
        firstName: '',
        lastName: '',
        phone: '',
      });

      fetchCustomers(); // Fetch updated customer list
      alert('Customer added successfully!');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  // Delete customer
  const handleDeleteCustomer = async (customerId: number) => {
    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5282/api/customers/${customerId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete customer');
      }

      setCustomers((prev) => prev.filter((c) => c.id !== customerId));
      alert('Customer deleted successfully!');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  // Fetch customers on mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <Container>
        <h1 className="mt-4">Customer Management</h1>

        {error && <Alert color="danger">{error}</Alert>}

        {/* Customer Table */}
        <Table striped className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>
                  {editableCustomer?.id === customer.id ? (
                    <Input
                      value={editableCustomer.firstName}
                      onChange={(e) =>
                        setEditableCustomer({
                          ...editableCustomer,
                          firstName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    customer.firstName
                  )}
                </td>
                <td>
                  {editableCustomer?.id === customer.id ? (
                    <Input
                      value={editableCustomer.lastName}
                      onChange={(e) =>
                        setEditableCustomer({
                          ...editableCustomer,
                          lastName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    customer.lastName
                  )}
                </td>
                <td>
                  {editableCustomer?.id === customer.id ? (
                    <Input
                      value={editableCustomer.phone}
                      onChange={(e) =>
                        setEditableCustomer({
                          ...editableCustomer,
                          phone: e.target.value,
                        })
                      }
                    />
                  ) : (
                    customer.phone
                  )}
                </td>
                <td>
                  {editableCustomer?.id === customer.id ? (
                    <>
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => handleSaveCustomer(editableCustomer)}
                      >
                        Save
                      </Button>{' '}
                      <Button
                        color="secondary"
                        size="sm"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        color="warning"
                        size="sm"
                        onClick={() => handleEditClick(customer)}
                      >
                        Edit
                      </Button>{' '}
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => handleDeleteCustomer(customer.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Add Customer Form at the Bottom */}
        <Form onSubmit={handleAddCustomerSubmit} className="mt-4">
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  type="text"
                  id="firstName"
                  value={newCustomer.firstName}
                  onChange={(e) => setNewCustomer({ ...newCustomer, firstName: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  value={newCustomer.lastName}
                  onChange={(e) => setNewCustomer({ ...newCustomer, lastName: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Label for="phone">Phone</Label>
                <Input
                  type="text"
                  id="phone"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col md={12} className="d-flex align-items-end">
              <Button color="primary" type="submit">
                Add Customer
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default CustomerManagement;
