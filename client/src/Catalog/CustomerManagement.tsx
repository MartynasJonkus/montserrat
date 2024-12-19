import React, { useState, useEffect } from 'react';

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
}

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editableCustomer, setEditableCustomer] = useState<Customer | null>(null); // Track customer being edited

  const [newCustomer, setNewCustomer] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  // Fetch the list of customers
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
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  };

  // Handle the start of editing a customer's details
  const handleEditClick = (customer: Customer) => {
    setEditableCustomer(customer); // Set the customer to be edited
  };

  // Handle submitting the updated customer form
  const handleSaveCustomer = async (customer: Customer) => {
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
        body: JSON.stringify(customer),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save customer');
      }

      fetchCustomers(); // Fetch updated list of customers
      setEditableCustomer(null); // Stop editing mode
      alert('Customer updated successfully!');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  };

  // Handle canceling the edit
  const handleCancelEdit = () => {
    setEditableCustomer(null); // Cancel editing
  };

  // Handle submitting the new customer form
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

      fetchCustomers(); // Fetch updated list of customers
      alert('Customer added successfully!');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  };

  // Handle deleting a customer
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

      fetchCustomers(); // Fetch updated list of customers
      alert('Customer deleted successfully!');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  };

  // UseEffect to fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <h1>Customer List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Customer List */}
      {customers.length > 0 ? (
        <table>
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
                    <input
                      type="text"
                      value={editableCustomer.firstName}
                      onChange={(e) => setEditableCustomer({ ...editableCustomer, firstName: e.target.value })}
                    />
                  ) : (
                    customer.firstName
                  )}
                </td>
                <td>
                  {editableCustomer?.id === customer.id ? (
                    <input
                      type="text"
                      value={editableCustomer.lastName}
                      onChange={(e) => setEditableCustomer({ ...editableCustomer, lastName: e.target.value })}
                    />
                  ) : (
                    customer.lastName
                  )}
                </td>
                <td>
                  {editableCustomer?.id === customer.id ? (
                    <input
                      type="text"
                      value={editableCustomer.phone}
                      onChange={(e) => setEditableCustomer({ ...editableCustomer, phone: e.target.value })}
                    />
                  ) : (
                    customer.phone
                  )}
                </td>
                <td>
                  {editableCustomer?.id === customer.id ? (
                    <>
                      <button onClick={() => handleSaveCustomer(editableCustomer)}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(customer)}>Edit</button>
                      <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No customers found.</p>
      )}

      {/* Add Customer Form */}
      <h2>Add New Customer</h2>
      <form onSubmit={handleAddCustomerSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={newCustomer.firstName}
            onChange={(e) => setNewCustomer({ ...newCustomer, firstName: e.target.value })}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={newCustomer.lastName}
            onChange={(e) => setNewCustomer({ ...newCustomer, lastName: e.target.value })}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={newCustomer.phone}
            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
          />
        </div>
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
};

export default CustomerManagement;
