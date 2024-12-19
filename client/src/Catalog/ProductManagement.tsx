import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
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
} from "reactstrap"
import TopNav from "../top-nav"
import { Status } from "../Enums/Status"
import { Product } from "../Interfaces/Product"

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: { amount: 0, currency: "" },
    weight: 0,
    weightUnit: "",
    status: 0,
  })

  const navigate = useNavigate()

  const fetchProducts = async () => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    try {
      const response = await fetch("http://localhost:5282/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch products")
      }

      const data = await response.json()
      setProducts(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  }

  const handleViewDetailsClick = (product: Product) => {
    navigate(`/product-details/${product.id}`)
  }

  const handleAddProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      return
    }

    const newProductData = {
      categoryId: null,
      discountId: null,
      taxId: null,
      title: newProduct.title,
      price: {
        amount: newProduct.price.amount,
        currency: 0,
      },
      weight: newProduct.weight,
      weightUnit: newProduct.weightUnit,
      status: newProduct.status,
    }

    try {
      const response = await fetch("http://localhost:5282/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to add product")
      }

      setNewProduct({
        title: "",
        price: { amount: 0, currency: "" },
        weight: 0,
        weightUnit: "",
        status: 0,
      })

      fetchProducts()
      alert("Product added successfully!")
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div>
      <TopNav />
      <Container>
        <h1 className="mt-4">Product Management</h1>

        {error && <Alert color="danger">{error}</Alert>}

        {products.length > 0 ? (
          <Table striped className="mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Status</th>
                <th>Weight</th>
                <th>Weight Unit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.price.amount.toFixed(2)} €</td>
                  <td>{Status[product.status]}</td>
                  <td>{product.weight}</td>
                  <td>{product.weightUnit}</td>
                  <td>
                    <Button
                      color="info"
                      size="sm"
                      onClick={() => handleViewDetailsClick(product)}
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
            No products found.
          </Alert>
        )}

        {/* Add Product Form */}
        <h2 className="mt-5">Add New Product</h2>
        <Form onSubmit={handleAddProductSubmit} className="mt-3">
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  value={newProduct.title}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, title: e.target.value })
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
                  value={newProduct.price.amount}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: {
                        ...newProduct.price,
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
                <Label for="weight">Weight</Label>
                <Input
                  id="weight"
                  type="number"
                  value={newProduct.weight}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      weight: parseFloat(e.target.value),
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="weightUnit">Weight Unit</Label>
                <Input
                  id="weightUnit"
                  type="text"
                  value={newProduct.weightUnit}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, weightUnit: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="status">Status</Label>
                <Input
                  id="status"
                  type="number"
                  value={newProduct.status}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      status: parseInt(e.target.value),
                    })
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <Button color="primary" type="submit">
            Add Product
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default ProductManagement
