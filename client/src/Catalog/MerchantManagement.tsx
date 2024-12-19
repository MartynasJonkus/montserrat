import React, { useState, useEffect } from "react"
import { Container, Button, Table, Form, FormGroup, Label, Input, Alert } from "reactstrap"
import { Status } from "../Enums/Status"
import { Merchant, CreateMerchantDto } from "../Interfaces/Merchant"

const MerchantManagement: React.FC = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [error, setError] = useState<string | null>(null)
  const [editableMerchant, setEditableMerchant] = useState<Merchant | null>(null)
  const [newMerchant, setNewMerchant] = useState<CreateMerchantDto>({
    name: "",
    VAT: "",
    address: {
      address1: "",
      address2: null,
      city: "",
      country: "",
      countryCode: "",
      zipCode: "",
    },
    email: "",
    phone: "",
    status: Status.Active,
  })

  // Fetch the list of merchants
  const fetchMerchants = async () => {
    const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    try {
      const response = await fetch("http://localhost:5282/api/merchants", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch merchants")
      }

      const data = await response.json()
      setMerchants(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  // Handle editing a merchant's details
  const handleEditClick = (merchant: Merchant) => {
    setEditableMerchant(merchant) // Set merchant for editing
  }

  // Save updated merchant
  const handleSaveMerchant = async () => {
    if (!editableMerchant) return

    const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    try {
      const response = await fetch(`http://localhost:5282/api/merchants/${editableMerchant.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editableMerchant),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to save merchant")
      }

      fetchMerchants() // Fetch updated merchants
      setEditableMerchant(null) // Reset editing mode
      alert("Merchant updated successfully!")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditableMerchant(null)
  }

  // Add a new merchant
  const handleAddMerchantSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    const newMerchantData: CreateMerchantDto = {
      name: newMerchant.name,
      VAT: newMerchant.VAT,
      address: newMerchant.address,
      email: newMerchant.email,
      phone: newMerchant.phone,
      status: newMerchant.status,
    }

    try {
      const response = await fetch("http://localhost:5282/api/merchants", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMerchantData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to add merchant")
      }

      setNewMerchant({
        name: "",
        VAT: "",
        address: {
          address1: "",
          address2: null,
          city: "",
          country: "",
          countryCode: "",
          zipCode: "",
        },
        email: "",
        phone: "",
        status: Status.Active,
      })

      fetchMerchants() // Fetch updated merchants
      alert("Merchant added successfully!")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  useEffect(() => {
    fetchMerchants()
  }, [])

  return (
    <div>
      <Container>
        <h1>Merchant Management</h1>
        {error && <Alert color="danger">{error}</Alert>}

        {/* Merchant List */}
        {merchants.length > 0 ? (
          <Table striped className="mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>VAT</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {merchants.map((merchant) => (
                <tr key={merchant.id}>
                  <td>{merchant.id}</td>
                  <td>
                    {editableMerchant?.id === merchant.id ? (
                      <input
                        type="text"
                        value={editableMerchant.name}
                        onChange={(e) =>
                          setEditableMerchant({
                            ...editableMerchant,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      merchant.name
                    )}
                  </td>
                  <td>
                    {editableMerchant?.id === merchant.id ? (
                      <input
                        type="text"
                        value={editableMerchant.VAT}
                        onChange={(e) =>
                          setEditableMerchant({
                            ...editableMerchant,
                            VAT: e.target.value,
                          })
                        }
                      />
                    ) : (
                      merchant.VAT
                    )}
                  </td>
                  <td>
                    {editableMerchant?.id === merchant.id ? (
                      <input
                        type="email"
                        value={editableMerchant.email}
                        onChange={(e) =>
                          setEditableMerchant({
                            ...editableMerchant,
                            email: e.target.value,
                          })
                        }
                      />
                    ) : (
                      merchant.email
                    )}
                  </td>
                  <td>
                    {editableMerchant?.id === merchant.id ? (
                      <input
                        type="tel"
                        value={editableMerchant.phone}
                        onChange={(e) =>
                          setEditableMerchant({
                            ...editableMerchant,
                            phone: e.target.value,
                          })
                        }
                      />
                    ) : (
                      merchant.phone
                    )}
                  </td>
                  <td>
                    {editableMerchant?.id === merchant.id ? (
                      <div>
                        <input
                          type="text"
                          value={editableMerchant.address.address1}
                          onChange={(e) =>
                            setEditableMerchant({
                              ...editableMerchant,
                              address: {
                                ...editableMerchant.address,
                                address1: e.target.value,
                              },
                            })
                          }
                        />
                        <input
                          type="text"
                          value={editableMerchant.address.address2 || ""}
                          onChange={(e) =>
                            setEditableMerchant({
                              ...editableMerchant,
                              address: {
                                ...editableMerchant.address,
                                address2: e.target.value,
                              },
                            })
                          }
                        />
                        <input
                          type="text"
                          value={editableMerchant.address.city}
                          onChange={(e) =>
                            setEditableMerchant({
                              ...editableMerchant,
                              address: {
                                ...editableMerchant.address,
                                city: e.target.value,
                              },
                            })
                          }
                        />
                        <input
                          type="text"
                          value={editableMerchant.address.country}
                          onChange={(e) =>
                            setEditableMerchant({
                              ...editableMerchant,
                              address: {
                                ...editableMerchant.address,
                                country: e.target.value,
                              },
                            })
                          }
                        />
                        <input
                          type="text"
                          value={editableMerchant.address.countryCode}
                          onChange={(e) =>
                            setEditableMerchant({
                              ...editableMerchant,
                              address: {
                                ...editableMerchant.address,
                                countryCode: e.target.value,
                              },
                            })
                          }
                        />
                        <input
                          type="text"
                          value={editableMerchant.address.zipCode}
                          onChange={(e) =>
                            setEditableMerchant({
                              ...editableMerchant,
                              address: {
                                ...editableMerchant.address,
                                zipCode: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    ) : (
                      <div>
                        {merchant.address.address1}, {merchant.address.city}, {merchant.address.country}
                      </div>
                    )}
                  </td>
                  <td>
                    {editableMerchant?.id === merchant.id ? (
                      <select
                        value={editableMerchant.status}
                        onChange={(e) =>
                          setEditableMerchant({
                            ...editableMerchant,
                            status: parseInt(e.target.value),
                          })
                        }
                      >
                        <option value={Status.Active}>Active</option>
                        <option value={Status.Inactive}>Inactive</option>
                        <option value={Status.Archived}>Archived</option>
                      </select>
                    ) : (
                      Status[merchant.status]
                    )}
                  </td>
                  <td>
                    {editableMerchant?.id === merchant.id ? (
                      <>
                        <Button color="primary" onClick={handleSaveMerchant}>
                          Save
                        </Button>
                        <Button color="secondary" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button color="warning" onClick={() => handleEditClick(merchant)}>
                          Edit
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No merchants found.</p>
        )}

        {/* Add New Merchant Form */}
        <Form className="mt-4" onSubmit={handleAddMerchantSubmit}>
          <h2>Add New Merchant</h2>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              id="name"
              value={newMerchant.name}
              onChange={(e) => setNewMerchant({ ...newMerchant, name: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="VAT">VAT</Label>
            <Input
              type="text"
              id="VAT"
              value={newMerchant.VAT}
              onChange={(e) => setNewMerchant({ ...newMerchant, VAT: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={newMerchant.email}
              onChange={(e) => setNewMerchant({ ...newMerchant, email: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input
              type="tel"
              id="phone"
              value={newMerchant.phone}
              onChange={(e) => setNewMerchant({ ...newMerchant, phone: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="address1">Address 1</Label>
            <Input
              type="text"
              id="address1"
              value={newMerchant.address.address1}
              onChange={(e) =>
                setNewMerchant({
                  ...newMerchant,
                  address: {
                    ...newMerchant.address,
                    address1: e.target.value,
                  },
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="address2">Address 2</Label>
            <Input
              type="text"
              id="address2"
              value={newMerchant.address.address2 || ""}
              onChange={(e) =>
                setNewMerchant({
                  ...newMerchant,
                  address: {
                    ...newMerchant.address,
                    address2: e.target.value,
                  },
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input
              type="text"
              id="city"
              value={newMerchant.address.city}
              onChange={(e) =>
                setNewMerchant({
                  ...newMerchant,
                  address: {
                    ...newMerchant.address,
                    city: e.target.value,
                  },
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="country">Country</Label>
            <Input
              type="text"
              id="country"
              value={newMerchant.address.country}
              onChange={(e) =>
                setNewMerchant({
                  ...newMerchant,
                  address: {
                    ...newMerchant.address,
                    country: e.target.value,
                  },
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="countryCode">Country Code</Label>
            <Input
              type="text"
              id="countryCode"
              value={newMerchant.address.countryCode}
              onChange={(e) =>
                setNewMerchant({
                  ...newMerchant,
                  address: {
                    ...newMerchant.address,
                    countryCode: e.target.value,
                  },
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="zipCode">Zip Code</Label>
            <Input
              type="text"
              id="zipCode"
              value={newMerchant.address.zipCode}
              onChange={(e) =>
                setNewMerchant({
                  ...newMerchant,
                  address: {
                    ...newMerchant.address,
                    zipCode: e.target.value,
                  },
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="status">Status</Label>
            <Input
              type="select"
              id="status"
              value={newMerchant.status}
              onChange={(e) =>
                setNewMerchant({
                  ...newMerchant,
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
            Add Merchant
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default MerchantManagement;