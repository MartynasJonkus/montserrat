import React, { useState, useEffect } from "react"
import { Container, Button, Table, Form, FormGroup, Label, Input, Alert } from "reactstrap"
import { OrderDiscount, CreateOrderDiscountDto } from "../Interfaces/OrderDiscount"
import { formatDate } from '../utils/dateUtils'

const OrderDiscountManagement: React.FC = () => {
  const [discounts, setDiscounts] = useState<OrderDiscount[]>([])
  const [error, setError] = useState<string | null>(null)
  const [editableDiscount, setEditableDiscount] = useState<OrderDiscount | null>(null)
  const [newDiscount, setNewDiscount] = useState<CreateOrderDiscountDto>({
    title: "",
    percentage: 0,
  })

  const fetchDiscounts = async () => {
    const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    try {
      const response = await fetch("http://localhost:5282/api/orderDiscounts", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch discounts")
      }

      const data = await response.json()
      setDiscounts(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  const handleEditClick = (discount: OrderDiscount) => {
    setEditableDiscount(discount)
  }

  const handleSaveDiscount = async () => {
    if (!editableDiscount) return

    const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    try {
      const response = await fetch(
        `http://localhost:5282/api/orderDiscounts/${editableDiscount.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editableDiscount),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to save discount")
      }

      fetchDiscounts()
      setEditableDiscount(null)
      alert("Order discount updated successfully!")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  const handleCancelEdit = () => {
    setEditableDiscount(null)
  }

  const handleAddDiscountSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    const newDiscountData: CreateOrderDiscountDto = {
      title: newDiscount.title,
      percentage: newDiscount.percentage
    }

    try {
      const response = await fetch("http://localhost:5282/api/orderDiscounts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDiscountData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to add discount")
      }

      setNewDiscount({
        title: "",
        percentage: 0
      })

      fetchDiscounts()
      alert("Order discount added successfully!")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  useEffect(() => {
    fetchDiscounts()
  }, [])

  const handleDeleteDiscount = async (discountId: number) => {
    const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    try {
      const response = await fetch(
        `http://localhost:5282/api/orderDiscounts/${discountId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to delete order discount")
      }

      fetchDiscounts()
      alert("Order discount deleted successfully!")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  return (
    <div>
      <Container>
        <h1 className="mt-4">Order Discount Management</h1>
        {error && <Alert color="danger">{error}</Alert>}

        {discounts.length > 0 ? (
          <Table striped className="mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Percentage</th>
                <th>Created At</th>
                <th>Updated At</th>
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
                  <td>{formatDate(discount.createdAt)}</td>
                  <td>{formatDate(discount.updatedAt)}</td>
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
                        <Button
                          color="warning"
                          onClick={() => handleEditClick(discount)}
                        >
                          Edit
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => handleDeleteDiscount(discount.id)}
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
        ) : (
          <p>No discounts found.</p>
        )}

        {/* Add New Order Discount Form */}
        <Form className="mt-4" onSubmit={handleAddDiscountSubmit}>
          <h2>Add New Order Discount</h2>
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
              onChange={(e) =>
                setNewDiscount({ ...newDiscount, percentage: parseFloat(e.target.value) })
              }
            />
          </FormGroup>
          <Button color="primary" type="submit">
            Add Order Discount
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default OrderDiscountManagement