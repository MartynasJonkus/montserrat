import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Service {
  id: number;
  title: string;
  price: { amount: number; currency: number };
  durationMins: number;
  status: number;
}



const ServiceManagement: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [viewService, setViewService] = useState<Service | null>(null);

  const [newService, setNewService] = useState({
    title: '',
    price: { amount: 0, currency: 0 }, // currency as an integer
    durationMins: 0,
    status: 0, // status as integer
  });

  const fetchServices = async () => {
    const token = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5282/api/services', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch services');
      }

      const data = await response.json();
      setServices(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const navigate = useNavigate();

  const handleViewDetailsClick = (service: Service) => {
    setViewService(service); // Set service for viewing details
    navigate(`/service-details/${service.id}`);
  };

  const handleAddServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    const newServiceData = {
      employeeId: null,
      categoryId: null,
      discountId: null,
      taxId: null,
      title: newService.title,
      price: {
        amount: newService.price.amount,
        currency: newService.price.currency, // currency as integer
      },
      durationMins: newService.durationMins,
      status: newService.status,
    };

    console.log('Service data being sent:', newServiceData);

    try {
      const response = await fetch('http://localhost:5282/api/services', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newServiceData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add service');
      }

      setNewService({
        title: '',
        price: { amount: 0, currency: 0 }, // Reset currency as integer
        durationMins: 0,
        status: 0, // Reset status
      });

      fetchServices(); // Fetch updated list of services
      alert('Service added successfully!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteService = async (serviceId: number) => {
    const token = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
    if (!token) {
      setError('No JWT token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5282/api/services/${serviceId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete service');
      }

      fetchServices(); // Fetch updated list of services
      alert('Service deleted successfully!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div>
      <h1>Service List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Service List */}
      {services.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Duration (mins)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.title}</td>
                <td>{service.price.amount.toFixed(2)} €</td>
                <td>{service.durationMins}</td>
                <td>{service.status}</td>
                <td>
                  <button onClick={() => handleViewDetailsClick(service)}>View Details</button>
                  <button onClick={() => handleDeleteService(service.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No services found.</p>
      )}

      {/* Service Details Section */}
      {viewService && (
        <div>
          <h2>Service Details</h2>
          <p><strong>ID:</strong> {viewService.id}</p>
          <p><strong>Title:</strong> {viewService.title}</p>
          <p><strong>Price:</strong> {viewService.price.amount.toFixed(2)} €</p>
          <p><strong>Duration:</strong> {viewService.durationMins} minutes</p>
          <p><strong>Status:</strong> {viewService.status}</p>
        </div>
      )}

      {/* Add Service Form */}
      <h2>Add New Service</h2>
      <form onSubmit={handleAddServiceSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={newService.title}
            onChange={(e) => setNewService({ ...newService, title: e.target.value })}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={newService.price.amount}
            onChange={(e) => setNewService({ ...newService, price: { ...newService.price, amount: parseFloat(e.target.value) } })}
          />
        </div>
        <div>
          <label>Currency (integer):</label>
          <input
            type="number"
            value={newService.price.currency}
            onChange={(e) => setNewService({ ...newService, price: { ...newService.price, currency: parseInt(e.target.value) } })}
          />
        </div>
        <div>
          <label>Duration (mins):</label>
          <input
            type="number"
            value={newService.durationMins}
            onChange={(e) => setNewService({ ...newService, durationMins: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            value={newService.status}
            onChange={(e) => setNewService({ ...newService, status: parseInt(e.target.value) })}
          >
            <option value={0}>Inactive</option>
            <option value={1}>Active</option>
          </select>
        </div>
        <button type="submit">Add Service</button>
      </form>
    </div>
  );
};

export default ServiceManagement;
