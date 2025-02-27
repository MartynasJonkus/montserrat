import React, { useState, useEffect } from "react"
import { Container, Button, Table, Form, FormGroup, Label, Input, Alert } from "reactstrap"
import { Status } from "../Enums/Status"
import { Discount, CreateDiscountDto } from "../Interfaces/Discount"
import { formatDate } from '../utils/dateUtils'

const DiscountManagement: React.FC = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [error, setError] = useState<string | null>(null)
  const [editableDiscount, setEditableDiscount] = useState<Discount | null>(null)

  const [newDiscount, setNewDiscount] = useState<CreateDiscountDto>({
    title: "",
    percentage: 0,
    expiresOn: "",
    status: Status.Active,
  })

  // Function to set time to 00:00:00.000 and adjust to UTC
  const normalizeDateToUTC = (date: string): string => {
    const d = new Date(date)
    d.setUTCHours(0, 0, 0, 0) // Set time to 00:00:00.000 UTC
    return d.toISOString() // Returns date in ISO format (UTC)
  }

  // Fetch Discounts
  const fetchDiscounts = async () => {
    const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    try {
      const response = await fetch("http://localhost:5282/api/discounts", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch discounts")
      }

      const data: Discount[] = await response.json()
      setDiscounts(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  // Edit Discount
  const handleEditClick = (discount: Discount) => {
    setEditableDiscount(discount)
  }

  // Save Edited Discount
  const handleSaveDiscount = async () => {
    if (!editableDiscount) return

    const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    try {
      // Normalize the expiresOn date before sending it to the backend
      const normalizedDate = normalizeDateToUTC(editableDiscount.expiresOn)
      const response = await fetch(`http://localhost:5282/api/discounts/${editableDiscount.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...editableDiscount,
          expiresOn: normalizedDate,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to save discount")
      }

      fetchDiscounts()
      setEditableDiscount(null)
      alert("Discount updated successfully!")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  // Cancel Edit
  const handleCancelEdit = () => {
    setEditableDiscount(null)
  }

  // Add Discount
  const handleAddDiscountSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    try {
      // Normalize the expiresOn date before sending it to the backend
      const normalizedDate = normalizeDateToUTC(newDiscount.expiresOn)
      const response = await fetch("http://localhost:5282/api/discounts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newDiscount, expiresOn: normalizedDate }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to add discount")
      }

      // Reset newDiscount after successful addition
      setNewDiscount({
        title: "",
        percentage: 0,
        expiresOn: "",
        status: Status.Active,
      })
      fetchDiscounts()
      alert("Discount added successfully!")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  // Delete Discount
  const handleDeleteDiscount = async (discountId: number) => {
    const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    try {
      const response = await fetch(`http://localhost:5282/api/discounts/${discountId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to delete discount")
      }

      fetchDiscounts()
      alert("Discount deleted successfully!")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  // UseEffect to fetch discounts on component mount
  useEffect(() => {
    fetchDiscounts()
  }, [])

  return (
    <div>
      <Container>
        <h1 className="mt-4">Discount Management</h1>
        {error && <Alert color="danger">{error}</Alert>}

        {/* Discount List */}
        {discounts.length > 0 ? (
          <Table striped className="mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Percentage</th>
                <th>Status</th>
                <th>Expires On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((discount) => (
                <tr key={discount.id}>
                  <td>{discount.id}</td>
                  <td>
                    {editableDiscount?.id === discount.id ? (
                      <input
                        type="text"
                        value={editableDiscount.title}
                        onChange={(e) =>
                          setEditableDiscount({
                            ...editableDiscount,
                            title: e.target.value,
                          })
                        }
                      />
                    ) : (
                      discount.title
                    )}
                  </td>
                  <td>
                    {editableDiscount?.id === discount.id ? (
                      <input
                        type="number"
                        value={editableDiscount.percentage}
                        onChange={(e) =>
                          setEditableDiscount({
                            ...editableDiscount,
                            percentage: parseFloat(e.target.value),
                          })
                        }
                      />
                    ) : (
                      discount.percentage
                    )}
                  </td>
                  <td>
                    {editableDiscount?.id === discount.id ? (
                      <select
                        value={editableDiscount.status}
                        onChange={(e) =>
                          setEditableDiscount({
                            ...editableDiscount,
                            status: parseInt(e.target.value),
                          })
                        }
                      >
                        <option value={Status.Active}>Active</option>
                        <option value={Status.Inactive}>Inactive</option>
                        <option value={Status.Archived}>Archived</option>
                      </select>
                    ) : (
                      Status[discount.status]
                    )}
                  </td>
                  <td>{formatDate(discount.expiresOn)}</td>
                  <td>
                    {editableDiscount?.id === discount.id ? (
                      <>
                        <Button color="primary" onClick={handleSaveDiscount}>
                          Save
                        </Button>
                        <Button color="secondary" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button color="warning" onClick={() => handleEditClick(discount)}>
                          Edit
                        </Button>
                        <Button color="danger" onClick={() => handleDeleteDiscount(discount.id)}>
                          Delete
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No discounts found.</p>
        )}

        {/* Add New Discount Form */}
        <Form className="mt-4" onSubmit={handleAddDiscountSubmit}>
          <h2>Add New Discount</h2>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              id="title"
              value={newDiscount.title}
              onChange={(e) => setNewDiscount({ ...newDiscount, title: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="percentage">Percentage</Label>
            <Input
              type="number"
              id="percentage"
              value={newDiscount.percentage}
              onChange={(e) => setNewDiscount({ ...newDiscount, percentage: parseFloat(e.target.value) })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="expiresOn">Expires On</Label>
            <Input
              type="date"
              id="expiresOn"
              value={newDiscount.expiresOn}
              onChange={(e) => setNewDiscount({ ...newDiscount, expiresOn: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="status">Status</Label>
            <Input
              type="select"
              id="status"
              value={newDiscount.status}
              onChange={(e) => setNewDiscount({ ...newDiscount, status: parseInt(e.target.value) })}
            >
              <option value={Status.Active}>Active</option>
              <option value={Status.Inactive}>Inactive</option>
              <option value={Status.Archived}>Archived</option>
            </Input>
          </FormGroup>
          <Button color="primary" type="submit">
            Add Discount
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default DiscountManagement