import React, { useState, useEffect } from "react"
import { Container, Button, Table } from "reactstrap"
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
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
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

    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    try {
      const response = await fetch(
        `http://localhost:5282/api/merchants/${editableMerchant.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editableMerchant),
        }
      )

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

    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
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
        <h1  className="mt-4">Merchant Management</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Merchant List */}
        {merchants.length > 0 ? (
          <Table>
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
                        <Button
                          color="warning"
                          onClick={() => handleEditClick(merchant)}
                        >
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
        <h2>Add New Merchant</h2>
        <form onSubmit={handleAddMerchantSubmit}>
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
              value={newMerchant.VAT}
              onChange={(e) => setNewMerchant({ ...newMerchant, VAT: e.target.value })}
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
              type="tel"
              value={newMerchant.phone}
              onChange={(e) => setNewMerchant({ ...newMerchant, phone: e.target.value })}
            />
          </div>
          <div>
            <label>Address 1:</label>
            <input
              type="text"
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
          </div>
          <div>
            <label>Address 2:</label>
            <input
              type="text"
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
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
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
          </div>
          <div>
            <label>Country:</label>
            <input
              type="text"
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
          </div>
          <div>
            <label>Country Code:</label>
            <input
              type="text"
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
          </div>
          <div>
            <label>Zip Code:</label>
            <input
              type="text"
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
          </div>
          <div>
            <label>Status:</label>
            <select
              value={newMerchant.status}
              onChange={(e) =>
                setNewMerchant({ ...newMerchant, status: parseInt(e.target.value) })
              }
            >
              <option value={Status.Active}>Active</option>
              <option value={Status.Inactive}>Inactive</option>
              <option value={Status.Archived}>Archived</option>
            </select>
          </div>
          <Button type="submit" color="primary">
            Add Merchant
          </Button>
        </form>
      </Container>
    </div>
  )
}

export default MerchantManagement
