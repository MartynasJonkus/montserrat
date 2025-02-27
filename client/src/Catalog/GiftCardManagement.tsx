import React, { useState, useEffect } from "react"
import { Container, Button, Table, Form, FormGroup, Label, Input, Alert } from "reactstrap"
import { Status } from "../Enums/Status"
import { GiftCard, CreateGiftCardDto } from "../Interfaces/GiftCard"


const GiftCardManagement: React.FC = () => {
  const [giftCards, setGiftCards] = useState<GiftCard[]>([])
  const [error, setError] = useState<string | null>(null)
  const [editableGiftCard, setEditableGiftCard] = useState<GiftCard | null>(null)
  const [newGiftCard, setNewGiftCard] = useState<CreateGiftCardDto>({
    code: "",
    initialBalance: 0,
    currency: "",
    expiresOn: "",
    status: Status.Active,
  })

  // Function to set time to 00:00:00.000 and adjust to UTC
  const normalizeDateToUTC = (date: string): string => {
    const d = new Date(date)
    d.setUTCHours(0, 0, 0, 0) // Set time to 00:00:00.000 UTC
    return d.toISOString() // Returns date in ISO format (UTC)
  }

  // Fetch giftCards
  const fetchGiftCards = async () => {
    const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    try {
      const response = await fetch("http://localhost:5282/api/giftCards", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch giftCards")
      }

      const data: GiftCard[] = await response.json()
      setGiftCards(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  // Edit GiftCard
  const handleEditClick = (giftCard: GiftCard) => {
    setEditableGiftCard(giftCard)
  }

  // Save Edited GiftCard
  const handleSaveGiftCard = async () => {
    if (!editableGiftCard) return

    const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    try {
      const normalizedDate = normalizeDateToUTC(editableGiftCard.expiresOn)
      const response = await fetch(`http://localhost:5282/api/giftcards/${editableGiftCard.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...editableGiftCard,
          expiresOn: normalizedDate,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to save giftCard")
      }

      fetchGiftCards()
      setEditableGiftCard(null)
      alert("GiftCard updated successfully!")
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
    setEditableGiftCard(null)
  }

  // Add GiftCard
  const handleAddGiftCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    try {
      const normalizedDate = normalizeDateToUTC(newGiftCard.expiresOn)
      const response = await fetch("http://localhost:5282/api/giftCards", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newGiftCard, expiresOn: normalizedDate }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to add giftCard")
      }

      setNewGiftCard({
        code: "",
        initialBalance: 0,
        currency: "",
        expiresOn: "",
        status: Status.Active,
      })
      fetchGiftCards()
      alert("GiftCard added successfully!")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  // Delete GiftCard
  const handleDeleteGiftCard = async (giftCardId: number) => {
    const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    try {
      const response = await fetch(`http://localhost:5282/api/giftcards/${giftCardId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to delete gift card")
      }

      fetchGiftCards()  // Refresh the list after deletion
      alert("GiftCard deleted successfully!")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  useEffect(() => {
    fetchGiftCards()
  }, [])

  return (
    <div>
      <Container>
        <h1 className="mt-4">GiftCard Management</h1>
        {error && <Alert color="danger">{error}</Alert>}

        {/* GiftCard List */}
        {giftCards.length > 0 ? (
          <Table striped className="mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Initial Balance</th>
                <th>Currency</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {giftCards.map((giftCard) => (
                <tr key={giftCard.id}>
                  <td>{giftCard.id}</td>
                  <td>
                    {editableGiftCard?.id === giftCard.id ? (
                      <input
                        type="text"
                        value={editableGiftCard.code}
                        onChange={(e) =>
                          setEditableGiftCard({
                            ...editableGiftCard,
                            code: e.target.value,
                          })
                        }
                      />
                    ) : (
                      giftCard.code
                    )}
                  </td>
                  <td>
                    {editableGiftCard?.id === giftCard.id ? (
                      <input
                        type="number"
                        value={editableGiftCard.initialBalance}
                        onChange={(e) =>
                          setEditableGiftCard({
                            ...editableGiftCard,
                            initialBalance: parseFloat(e.target.value),
                          })
                        }
                      />
                    ) : (
                      giftCard.initialBalance
                    )}
                  </td>
                  <td>
                    {editableGiftCard?.id === giftCard.id ? (
                      <input
                        type="text"
                        value={editableGiftCard.currency}
                        onChange={(e) =>
                          setEditableGiftCard({
                            ...editableGiftCard,
                            currency: e.target.value,
                          })
                        }
                      />
                    ) : (
                      giftCard.currency
                    )}
                  </td>
                  <td>
                    {editableGiftCard?.id === giftCard.id ? (
                      <select
                        value={editableGiftCard.status}
                        onChange={(e) =>
                          setEditableGiftCard({
                            ...editableGiftCard,
                            status: parseInt(e.target.value),
                          })
                        }
                      >
                        <option value={Status.Active}>Active</option>
                        <option value={Status.Inactive}>Inactive</option>
                        <option value={Status.Archived}>Archived</option>
                      </select>
                    ) : (
                      Status[giftCard.status]
                    )}
                  </td>
                  <td>
                    {editableGiftCard?.id === giftCard.id ? (
                      <>
                        <Button color="primary" onClick={handleSaveGiftCard}>
                          Save
                        </Button>
                        <Button color="secondary" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button color="warning" onClick={() => handleEditClick(giftCard)}>
                          Edit
                        </Button>
                        <Button color="danger" onClick={() => handleDeleteGiftCard(giftCard.id)}>
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
          <p>No giftCards found.</p>
        )}

        {/* Add New GiftCard Form */}
        <Form className="mt-4" onSubmit={handleAddGiftCardSubmit}>
          <h2>Add New GiftCard</h2>
          <FormGroup>
            <Label for="code">Code</Label>
            <Input
              type="text"
              id="code"
              value={newGiftCard.code}
              onChange={(e) => setNewGiftCard({ ...newGiftCard, code: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="initialBalance">Initial Balance</Label>
            <Input
              type="number"
              id="initialBalance"
              value={newGiftCard.initialBalance}
              onChange={(e) => setNewGiftCard({ ...newGiftCard, initialBalance: parseFloat(e.target.value) })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="currency">Currency</Label>
            <Input
              type="text"
              id="currency"
              value={newGiftCard.currency}
              onChange={(e) => setNewGiftCard({ ...newGiftCard, currency: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="expiresOn">Expires On</Label>
            <Input
              type="date"
              id="expiresOn"
              value={newGiftCard.expiresOn}
              onChange={(e) => setNewGiftCard({ ...newGiftCard, expiresOn: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="status">Status</Label>
            <Input
              type="select"
              id="status"
              value={newGiftCard.status}
              onChange={(e) => setNewGiftCard({ ...newGiftCard, status: parseInt(e.target.value) })}
            >
              <option value={Status.Active}>Active</option>
              <option value={Status.Inactive}>Inactive</option>
              <option value={Status.Archived}>Archived</option>
            </Input>
          </FormGroup>
          <Button color="primary" type="submit">
            Add GiftCard
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default GiftCardManagement