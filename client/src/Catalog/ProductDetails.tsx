import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container, Button, Alert, Row, Col, Table } from "reactstrap"
import { Status } from "../Enums/Status"
import { Currency } from "../Enums/Currency"
import { Product } from "../Interfaces/Product"

const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const navigate = useNavigate()

  const fetchProductDetails = async () => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`http://localhost:5282/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch product details")
      }

      const data = await response.json()
      setProduct(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (productId) {
      fetchProductDetails()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId])

  const handleBackToProducts = () => {
    navigate("/productmanagement")
  }

  const handleEditProduct = () => {
    navigate(`/edit-product/${productId}`)
  }

  return (
    <div>
      <Container>
        <h1 className="mt-4">Product Details</h1>
        <hr/>

        {loading && <p>Loading...</p>}

        {error && <Alert color="danger">{error}</Alert>}

        {product && (
          <>
            <Row>
              <Col md={6}>
                <h2>{product.title}</h2>
                <p><strong>Price:</strong> {product.price.amount.toFixed(2)} {Currency[product.price.currency]}</p>
                <p><strong>Status:</strong> {Status[product.status]}</p>
                <p><strong>Weight:</strong> {product.weight} {product.weightUnit}</p>
                <p><strong>Category ID:</strong> {product.categoryId ?? "N/A"}</p>
                <p><strong>Discount ID:</strong> {product.discountId ?? "N/A"}</p>
                <p><strong>Tax ID:</strong> {product.taxId ?? "N/A"}</p>
                <p><strong>Created At:</strong> {new Date(product.createdAt).toLocaleString()}</p>
                <p><strong>Updated At:</strong> {new Date(product.updatedAt).toLocaleString()}</p>
              </Col>
            </Row>

            <h3 className="mt-4">Product Variants</h3>
            {product.productVariants.length > 0 ? (
              <Table striped className="mt-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Additional Price</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {product.productVariants.map((variant) => (
                    <tr key={variant.id}>
                      <td>{variant.id}</td>
                      <td>{variant.title}</td>
                      <td>{variant.additionalPrice.toFixed(2)}</td>
                      <td>{variant.quantity}</td>
                      <td>{Status[variant.status]}</td>
                      <td>{new Date(variant.createdAt).toLocaleString()}</td>
                      <td>{new Date(variant.updatedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Alert color="info" className="mt-3">
                No variants found.
              </Alert>
            )}

            <Button color="secondary" className="mt-3" onClick={handleBackToProducts}>
              Back to Product Management
            </Button>{" "}
            <Button color="primary" className="mt-3" onClick={handleEditProduct}>
              Edit Product
            </Button>
          </>
        )}
      </Container>
    </div>
  )
}

export default ProductDetails
