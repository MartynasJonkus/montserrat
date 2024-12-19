import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Address {
  address1: string;
  address2: string;
  city: string;
  country: string;
  countryCode: string;
  zipCode: string;
}

interface Merchant {
  id: number;
  name: string;
  vat: string;
  address: Address;
  email: string;
  phone: string;
  status: number;
}

const MerchantManagement: React.FC = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [viewMerchant, setViewMerchant] = useState<Merchant | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newMerchant, setNewMerchant] = useState({
    name: '',
    vat: '',
    address: {
      address1: '',
      address2: '',
      city: '',
      country: '',
      countryCode: '',
      zipCode: '',
    },
    email: '',
    phone: '',
    status: 1, // Default is active
  });

  // Fetch the list of merchants
  const fetchMerchants = async () => {
    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5282/api/merchants', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch merchants');
      }

      const data = await response.json();
      setMerchants(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const navigate = useNavigate();

  // Handle viewing the details of a merchant
  const handleViewDetailsClick = (merchant: Merchant) => {
    setViewMerchant(merchant);
    setEditMode(false);  // Disable edit mode on view
  };

  // Handle editing merchant details
  const handleEditMerchantClick = () => {
    setEditMode(true);
  };

  // Handle submitting the updated merchant data
  const handleUpdateMerchantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5282/api/merchants/${viewMerchant?.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(viewMerchant),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update merchant');
      }

      fetchMerchants(); // Fetch updated list of merchants
      setEditMode(false); // Turn off edit mode
      alert('Merchant updated successfully!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  // UseEffect to fetch merchants on component mount
  useEffect(() => {
    fetchMerchants();
  }, []);

  return (
    <div>
      <h1>Merchant List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Merchant List */}
      {merchants.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>VAT</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {merchants.map((merchant) => (
              <tr key={merchant.id}>
                <td>{merchant.id}</td>
                <td>{merchant.name}</td>
                <td>{merchant.vat}</td>
                <td>{merchant.email}</td>
                <td>{merchant.status === 1 ? 'Active' : 'Inactive'}</td>
                <td>
                  <button onClick={() => handleViewDetailsClick(merchant)}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No merchants found.</p>
      )}

      {/* Merchant Details Section */}
      {viewMerchant && (
        <div>
          <h2>Merchant Details</h2>
          {editMode ? (
            <form onSubmit={handleUpdateMerchantSubmit}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={viewMerchant.name}
                  onChange={(e) => setViewMerchant({ ...viewMerchant, name: e.target.value })}
                />
              </div>
              <div>
                <label>VAT:</label>
                <input
                  type="text"
                  value={viewMerchant.vat}
                  onChange={(e) => setViewMerchant({ ...viewMerchant, vat: e.target.value })}
                />
              </div>
              <h3>Address</h3>
              <div>
                <label>Address Line 1:</label>
                <input
                  type="text"
                  value={viewMerchant.address.address1}
                  onChange={(e) =>
                    setViewMerchant({
                      ...viewMerchant,
                      address: { ...viewMerchant.address, address1: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label>Address Line 2:</label>
                <input
                  type="text"
                  value={viewMerchant.address.address2}
                  onChange={(e) =>
                    setViewMerchant({
                      ...viewMerchant,
                      address: { ...viewMerchant.address, address2: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label>City:</label>
                <input
                  type="text"
                  value={viewMerchant.address.city}
                  onChange={(e) =>
                    setViewMerchant({
                      ...viewMerchant,
                      address: { ...viewMerchant.address, city: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label>Country:</label>
                <input
                  type="text"
                  value={viewMerchant.address.country}
                  onChange={(e) =>
                    setViewMerchant({
                      ...viewMerchant,
                      address: { ...viewMerchant.address, country: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label>Country Code:</label>
                <input
                  type="text"
                  value={viewMerchant.address.countryCode}
                  onChange={(e) =>
                    setViewMerchant({
                      ...viewMerchant,
                      address: { ...viewMerchant.address, countryCode: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label>Zip Code:</label>
                <input
                  type="text"
                  value={viewMerchant.address.zipCode}
                  onChange={(e) =>
                    setViewMerchant({
                      ...viewMerchant,
                      address: { ...viewMerchant.address, zipCode: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={viewMerchant.email}
                  onChange={(e) => setViewMerchant({ ...viewMerchant, email: e.target.value })}
                />
              </div>
              <div>
                <label>Phone:</label>
                <input
                  type="text"
                  value={viewMerchant.phone}
                  onChange={(e) => setViewMerchant({ ...viewMerchant, phone: e.target.value })}
                />
              </div>
              <div>
                <label>Status:</label>
                <select
                  value={viewMerchant.status}
                  onChange={(e) => setViewMerchant({ ...viewMerchant, status: Number(e.target.value) })}
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
              </div>
              <button type="submit">Update Merchant</button>
            </form>
          ) : (
            <>
              <p><strong>ID:</strong> {viewMerchant.id}</p>
              <p><strong>Name:</strong> {viewMerchant.name}</p>
              <p><strong>VAT:</strong> {viewMerchant.vat}</p>
              <p><strong>Address:</strong></p>
              <p>{viewMerchant.address.address1}, {viewMerchant.address.address2}</p>
              <p>{viewMerchant.address.city}, {viewMerchant.address.country} - {viewMerchant.address.zipCode}</p>
              <p><strong>Email:</strong> {viewMerchant.email}</p>
              <p><strong>Phone:</strong> {viewMerchant.phone}</p>
              <p><strong>Status:</strong> {viewMerchant.status === 1 ? 'Active' : 'Inactive'}</p>
              <button onClick={handleEditMerchantClick}>Edit Merchant</button>
            </>
          )}
        </div>
      )}

      {/* Add Merchant Form */}
      <h2>Add New Merchant</h2>
      <form onSubmit={handleUpdateMerchantSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={newMerchant.name}
            onChange={(e) => setNewMerchant({ ...newMerchant, name: e.target.value })}
          />
        </div>
        <div>
          <label>VAT:</label>
          <input
            type="text"
            value={newMerchant.vat}
            onChange={(e) => setNewMerchant({ ...newMerchant, vat: e.target.value })}
          />
        </div>
        <h3>Address</h3>
        <div>
          <label>Address Line 1:</label>
          <input
            type="text"
            value={newMerchant.address.address1}
            onChange={(e) =>
              setNewMerchant({
                ...newMerchant,
                address: { ...newMerchant.address, address1: e.target.value },
              })
            }
          />
        </div>
        <div>
          <label>Address Line 2:</label>
          <input
            type="text"
            value={newMerchant.address.address2}
            onChange={(e) =>
              setNewMerchant({
                ...newMerchant,
                address: { ...newMerchant.address, address2: e.target.value },
              })
            }
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            value={newMerchant.address.city}
            onChange={(e) =>
              setNewMerchant({
                ...newMerchant,
                address: { ...newMerchant.address, city: e.target.value },
              })
            }
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            value={newMerchant.address.country}
            onChange={(e) =>
              setNewMerchant({
                ...newMerchant,
                address: { ...newMerchant.address, country: e.target.value },
              })
            }
          />
        </div>
        <div>
          <label>Country Code:</label>
          <input
            type="text"
            value={newMerchant.address.countryCode}
            onChange={(e) =>
              setNewMerchant({
                ...newMerchant,
                address: { ...newMerchant.address, countryCode: e.target.value },
              })
            }
          />
        </div>
        <div>
          <label>Zip Code:</label>
          <input
            type="text"
            value={newMerchant.address.zipCode}
            onChange={(e) =>
              setNewMerchant({
                ...newMerchant,
                address: { ...newMerchant.address, zipCode: e.target.value },
              })
            }
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={newMerchant.email}
            onChange={(e) => setNewMerchant({ ...newMerchant, email: e.target.value })}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={newMerchant.phone}
            onChange={(e) => setNewMerchant({ ...newMerchant, phone: e.target.value })}
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            value={newMerchant.status}
            onChange={(e) => setNewMerchant({ ...newMerchant, status: Number(e.target.value) })}
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>
        <button type="submit">Add Merchant</button>
      </form>
    </div>
  );
};

export default MerchantManagement;
