import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Container,
  Row,
  Col,
} from "reactstrap";
import TopNav from "../top-nav";
import { Status } from "../Enums/Status";
import { Service, CreateServiceDto } from "../Interfaces/Service";

const ServiceManagement: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newService, setNewService] = useState<CreateServiceDto>({
    id: 0,
    employeeId: null,
    categoryId: null,
    discountId: null,
    taxId: null,
    title: "",
    price: { amount: 0, currency: 0 },
    durationMins: 0,
    status: 0,
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);

  const navigate = useNavigate();

  const fetchServices = async () => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
    if (!token) {
      setError("No JWT token found. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5282/api/services?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch services");
      }

      const data = await response.json();
      setServices(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const handleViewDetailsClick = (service: Service) => {
    navigate(`/service-details/${service.id}`);
  };

  const handleAddServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
    if (!token) {
      setError("No JWT token found. Please log in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5282/api/services", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newService),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add service");
      }

      setNewService({
        id: 0,
        employeeId: null,
        categoryId: null,
        discountId: null,
        taxId: null,
        title: "",
        price: { amount: 0, currency: 0 },
        durationMins: 0,
        status: 0,
      });

      fetchServices();
      alert("Service added successfully!");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  useEffect(() => {
    fetchServices();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return (
    <div>
      <TopNav />
      <Container>
        <h1 className="mt-4">Service Management</h1>

        {error && <Alert color="danger">{error}</Alert>}

        {services.length > 0 ? (
          <Table striped className="mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Duration</th>
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
                  <td>{service.durationMins} mins</td>
                  <td>{Status[service.status]}</td>
                  <td>
                    <Button
                      color="info"
                      size="sm"
                      onClick={() => handleViewDetailsClick(service)}
                    >
                      View Details
                    </Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert color="info" className="mt-4">
            No services found.
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

        <h2 className="mt-5">Add New Service</h2>
        <Form onSubmit={handleAddServiceSubmit} className="mt-3">
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  value={newService.title}
                  onChange={(e) =>
                    setNewService({ ...newService, title: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={newService.price.amount}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      price: {
                        ...newService.price,
                        amount: parseFloat(e.target.value),
                      },
                    })
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="durationMins">Duration (mins)</Label>
                <Input
                  id="durationMins"
                  type="number"
                  value={newService.durationMins}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      durationMins: parseInt(e.target.value),
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="status">Status</Label>
                <Input
                  id="status"
                  type="number"
                  value={newService.status}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      status: parseInt(e.target.value),
                    })
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <Button color="primary" type="submit">
            Add Service
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default ServiceManagement;
