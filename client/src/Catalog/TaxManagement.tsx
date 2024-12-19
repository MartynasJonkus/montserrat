import React, { useState, useEffect } from 'react';

interface Tax {
  id: number;
  title: string;
  percentage: number;
  status: number; // 1 is Active, 0 is Inactive
}

const TaxManagement: React.FC = () => {
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editableTax, setEditableTax] = useState<Tax | null>(null); // Track tax being edited

  const [newTax, setNewTax] = useState({
    title: '',
    percentage: 0,
    status: 1, // Default to Active
  });

  // Fetch the list of taxes
  const fetchTaxes = async () => {
    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5282/api/taxes', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch taxes');
      }

      const data = await response.json();
      setTaxes(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle the start of editing a tax's details
  const handleEditClick = (tax: Tax) => {
    setEditableTax(tax); // Set the tax to be edited
  };

  // Handle submitting the updated tax form
  const handleSaveTax = async (tax: Tax) => {
    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5282/api/taxes/${tax.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tax),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save tax');
      }

      fetchTaxes(); // Fetch updated list of taxes
      setEditableTax(null); // Stop editing mode
      alert('Tax updated successfully!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle canceling the edit
  const handleCancelEdit = () => {
    setEditableTax(null); // Cancel editing
  };

  // Handle submitting the new tax form
  const handleAddTaxSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    const newTaxData = {
      title: newTax.title,
      percentage: newTax.percentage,
      status: newTax.status,
    };

    try {
      const response = await fetch('http://localhost:5282/api/taxes', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTaxData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add tax');
      }

      setNewTax({
        title: '',
        percentage: 0,
        status: 1, // Reset to Active by default
      });

      fetchTaxes(); // Fetch updated list of taxes
      alert('Tax added successfully!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle deleting a tax
  const handleDeleteTax = async (taxId: number) => {
    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5282/api/taxes/${taxId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete tax');
      }

      fetchTaxes(); // Fetch updated list of taxes
      alert('Tax deleted successfully!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  // UseEffect to fetch taxes on component mount
  useEffect(() => {
    fetchTaxes();
  }, []);

  return (
    <div>
      <h1>Tax Management</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Tax List */}
      {taxes.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Percentage</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {taxes.map((tax) => (
              <tr key={tax.id}>
                <td>{tax.id}</td>
                <td>
                  {editableTax?.id === tax.id ? (
                    <input
                      type="text"
                      value={editableTax.title}
                      onChange={(e) => setEditableTax({ ...editableTax, title: e.target.value })}
                    />
                  ) : (
                    tax.title
                  )}
                </td>
                <td>
                  {editableTax?.id === tax.id ? (
                    <input
                      type="number"
                      value={editableTax.percentage}
                      onChange={(e) => setEditableTax({ ...editableTax, percentage: parseFloat(e.target.value) })}
                    />
                  ) : (
                    tax.percentage
                  )}
                </td>
                <td>
                  {editableTax?.id === tax.id ? (
                    <select
                      value={editableTax.status}
                      onChange={(e) => setEditableTax({ ...editableTax, status: parseInt(e.target.value) })}
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                  ) : (
                    tax.status === 1 ? 'Active' : 'Inactive'
                  )}
                </td>
                <td>
                  {editableTax?.id === tax.id ? (
                    <>
                      <button onClick={() => handleSaveTax(editableTax)}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(tax)}>Edit</button>
                      <button onClick={() => handleDeleteTax(tax.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No taxes found.</p>
      )}

      {/* Add Tax Form */}
      <h2>Add New Tax</h2>
      <form onSubmit={handleAddTaxSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={newTax.title}
            onChange={(e) => setNewTax({ ...newTax, title: e.target.value })}
          />
        </div>
        <div>
          <label>Percentage:</label>
          <input
            type="number"
            value={newTax.percentage}
            onChange={(e) => setNewTax({ ...newTax, percentage: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            value={newTax.status}
            onChange={(e) => setNewTax({ ...newTax, status: parseInt(e.target.value) })}
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>
        <button type="submit">Add Tax</button>
      </form>
    </div>
  );
};

export default TaxManagement;
