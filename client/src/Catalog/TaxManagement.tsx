import React, { useState, useEffect } from "react"
import { Container, Button, Table } from "reactstrap"
import TopNav from "../top-nav"
import { Status } from "../Enums/Status"
import { Tax, CreateTaxDto } from "../Interfaces/Tax"

const TaxManagement: React.FC = () => {
  const [taxes, setTaxes] = useState<Tax[]>([])
  const [error, setError] = useState<string | null>(null)
  const [editableTax, setEditableTax] = useState<Tax | null>(null)
  const [newTax, setNewTax] = useState<CreateTaxDto>({
    title: "",
    percentage: 0,
    status: Status.Active,
  })

  // Fetch the list of taxes
  const fetchTaxes = async () => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    try {
      const response = await fetch("http://localhost:5282/api/taxes", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch taxes")
      }

      const data = await response.json()
      setTaxes(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  // Handle editing a tax's details
  const handleEditClick = (tax: Tax) => {
    setEditableTax(tax) // Set tax for editing
  }

  // Save updated tax
  const handleSaveTax = async () => {
    if (!editableTax) return

    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    try {
      const response = await fetch(
        `http://localhost:5282/api/taxes/${editableTax.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editableTax),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to save tax")
      }

      fetchTaxes() // Fetch updated taxes
      setEditableTax(null) // Reset editing mode
      alert("Tax updated successfully!")
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
    setEditableTax(null)
  }

  // Add a new tax
  const handleAddTaxSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    const newTaxData: CreateTaxDto = {
      title: newTax.title,
      percentage: newTax.percentage,
      status: newTax.status,
    }

    try {
      const response = await fetch("http://localhost:5282/api/taxes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTaxData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to add tax")
      }

      setNewTax({
        title: "",
        percentage: 0,
        status: Status.Active,
      })

      fetchTaxes() // Fetch updated taxes
      alert("Tax added successfully!")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  useEffect(() => {
    fetchTaxes()
  }, [])

  return (
    <div>
      <TopNav />
      <Container>
        <h1>Tax Management</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Tax List */}
        {taxes.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Percentage</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Updated At</th>
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
                        onChange={(e) =>
                          setEditableTax({
                            ...editableTax,
                            title: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setEditableTax({
                            ...editableTax,
                            percentage: parseFloat(e.target.value),
                          })
                        }
                      />
                    ) : (
                      tax.percentage
                    )}
                  </td>
                  <td>
                    {editableTax?.id === tax.id ? (
                      <select
                        value={editableTax.status}
                        onChange={(e) =>
                          setEditableTax({
                            ...editableTax,
                            status: parseInt(e.target.value),
                          })
                        }
                      >
                        <option value={Status.Active}>Active</option>
                        <option value={Status.Inactive}>Inactive</option>
                        <option value={Status.Archived}>Archived</option>
                      </select>
                    ) : (
                      Status[tax.status]
                    )}
                  </td>
                  <td>{tax.createdAt}</td>
                  <td>{tax.updatedAt}</td>
                  <td>
                    {editableTax?.id === tax.id ? (
                      <>
                        <Button color="primary" onClick={handleSaveTax}>
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
                          onClick={() => handleEditClick(tax)}
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
          <p>No taxes found.</p>
        )}

        {/* Add New Tax Form */}
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
              onChange={(e) =>
                setNewTax({ ...newTax, percentage: parseFloat(e.target.value) })
              }
            />
          </div>
          <div>
            <label>Status:</label>
            <select
              value={newTax.status}
              onChange={(e) =>
                setNewTax({ ...newTax, status: parseInt(e.target.value) })
              }
            >
              <option value={Status.Active}>Active</option>
              <option value={Status.Inactive}>Inactive</option>
              <option value={Status.Archived}>Archived</option>
            </select>
          </div>
          <Button type="submit" color="primary">
            Add Tax
          </Button>
        </form>
      </Container>
    </div>
  )
}

export default TaxManagement
