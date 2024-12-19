import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  Container,
  Button,
  Alert,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
} from "reactstrap"
import { Status } from "../Enums/Status"
import {
  ProductVariant,
  CreateProductVariantDto,
} from "../Interfaces/ProductVariant"
import { Tax } from "../Interfaces/Tax"
import { Discount } from "../Interfaces/Discount"
import { Category } from "../Interfaces/Category"
import { Product, CreateProductDto } from "../Interfaces/Product"

const EditProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [productVariants, setProductVariants] = useState<ProductVariant[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [taxes, setTaxes] = useState<Tax[]>([])
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [newVariant, setNewVariant] = useState<CreateProductVariantDto>({
    title: '',
    additionalPrice: 0,
    quantity: 0,
    status: Status.Active
  })
  const [editingVariantId, setEditingVariantId] = useState<number | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    fetchProductDetails()

    fetchCategories()
    fetchTaxes()
    fetchDiscounts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId])

  const fetchProductDetails = async () => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    if (!token) {
      setError("No JWT token found. Please log in.")
      setLoading(false)
      return
    }

    try {
      const response = await fetch(
        `http://localhost:5282/api/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch product details")
      }

      const data = await response.json()
      setProduct(data)
      setProductVariants(data.productVariants)
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

  const fetchCategories = async () => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    const response = await fetch("http://localhost:5282/api/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    setCategories(data)
  }

  const fetchTaxes = async () => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    const response = await fetch("http://localhost:5282/api/taxes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    setTaxes(data)
  }

  const fetchDiscounts = async () => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    const response = await fetch("http://localhost:5282/api/discounts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    setDiscounts(data)
  }

  const handleUpdateProduct = async (productData: CreateProductDto) => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    try {
      const response = await fetch(
        `http://localhost:5282/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update product")
      }
      navigate(`/product-details/${productId}`)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  const handleCreateVariant = async (variantData: CreateProductVariantDto) => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    try {
      const response = await fetch(
        `http://localhost:5282/api/products/${productId}/variants`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(variantData),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create variant")
      }

      const data = await response.json()
      setProductVariants([...productVariants, data])
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  const handleUpdateVariant = async (
    variantId: number,
    variantData: CreateProductVariantDto
  ) => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken")
    try {
      const response = await fetch(
        `http://localhost:5282/api/variants/${variantId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(variantData),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update variant")
      }

      fetchProductDetails()
      setEditingVariantId(null)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred.")
      }
    }
  }

  const handleEditVariant = (variant: ProductVariant) => {
    setEditingVariantId(variant.id)
    setNewVariant({
      title: variant.title,
      additionalPrice: variant.additionalPrice,
      quantity: variant.quantity,
      status: variant.status,
    })
  }

  return (
    <div>
      <Container>
        <h1>Edit Product</h1>

        {loading && <p>Loading...</p>}
        {error && <Alert color="danger">{error}</Alert>}

        {product && (
          <Form onSubmit={(e) => e.preventDefault()}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="title">Product Title</Label>
                  <Input
                    type="text"
                    id="title"
                    value={product.title}
                    onChange={(e) =>
                      setProduct({ ...product, title: e.target.value })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="price">Price</Label>
                  <Input
                    type="number"
                    id="price"
                    value={product.price.amount}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        price: {
                          ...product.price,
                          amount: parseFloat(e.target.value),
                        },
                      })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="weight">Weight</Label>
                  <Input
                    type="number"
                    id="weight"
                    value={product.weight}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        weight: parseFloat(e.target.value),
                      })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="weightUnit">Weight Unit</Label>
                  <Input
                    type="text"
                    id="weightUnit"
                    value={product.weightUnit}
                    onChange={(e) =>
                      setProduct({ ...product, weightUnit: e.target.value })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="categoryId">Category</Label>
                  <Input
                    type="select"
                    id="categoryId"
                    value={product.categoryId || ""}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        categoryId: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="taxId">Tax</Label>
                  <Input
                    type="select"
                    id="taxId"
                    value={product.taxId || ""}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        taxId: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="">Select Tax</option>
                    {taxes.map((tax) => (
                      <option key={tax.id} value={tax.id}>
                        {tax.title} ({tax.percentage}%)
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="discountId">Discount</Label>
                  <Input
                    type="select"
                    id="discountId"
                    value={product.discountId || ""}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        discountId: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="">Select Discount</option>
                    {discounts.map((discount) => (
                      <option key={discount.id} value={discount.id}>
                        {discount.title} ({discount.percentage}%)
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                <Button
                  color="primary"
                  onClick={() => handleUpdateProduct(product)}
                >
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Form>
        )}

        <h3 className="mt-4">Product Variants</h3>
        <Table striped className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productVariants.map((variant) => (
              <tr key={variant.id}>
                <td>{variant.id}</td>
                <td>
                  {editingVariantId === variant.id ? (
                    <Input
                      type="text"
                      value={newVariant.title}
                      onChange={(e) =>
                        setNewVariant({ ...newVariant, title: e.target.value })
                      }
                    />
                  ) : (
                    variant.title
                  )}
                </td>
                <td>
                  {editingVariantId === variant.id ? (
                    <Input
                      type="number"
                      value={newVariant.additionalPrice}
                      onChange={(e) =>
                        setNewVariant({
                          ...newVariant,
                          additionalPrice: parseFloat(e.target.value),
                        })
                      }
                    />
                  ) : (
                    variant.additionalPrice
                  )}
                </td>
                <td>
                  {editingVariantId === variant.id ? (
                    <Input
                      type="number"
                      value={newVariant.quantity}
                      onChange={(e) =>
                        setNewVariant({
                          ...newVariant,
                          quantity: parseInt(e.target.value),
                        })
                      }
                    />
                  ) : (
                    variant.quantity
                  )}
                </td>
                <td>
                  {editingVariantId === variant.id ? (
                    <Input
                      type="select"
                      value={newVariant.status}
                      onChange={(e) =>
                        setNewVariant({
                          ...newVariant,
                          status: parseInt(e.target.value),
                        })
                      }
                    >
                      <option value={Status.Active}>Active</option>
                      <option value={Status.Inactive}>Inactive</option>
                      <option value={Status.Archived}>Archived</option>
                    </Input>
                  ) : (
                    Status[variant.status]
                  )}
                </td>
                <td>
                  {editingVariantId === variant.id ? (
                    <Button
                      color="success"
                      onClick={() => handleUpdateVariant(variant.id, newVariant)}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      color="warning"
                      onClick={() => handleEditVariant(variant)}
                    >
                      Edit
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h3 className="mt-4">Create Product Variant</h3>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            handleCreateVariant(newVariant)
          }}
        >
          <Row>
            <Col md={3}>
              <FormGroup>
                <Label for="variantTitle">Title</Label>
                <Input
                  type="text"
                  id="variantTitle"
                  value={newVariant.title}
                  onChange={(e) =>
                    setNewVariant({ ...newVariant, title: e.target.value })
                  }
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="variantPrice">Additional price</Label>
                <Input
                  type="number"
                  id="variantPrice"
                  value={newVariant.additionalPrice}
                  onChange={(e) =>
                    setNewVariant({
                      ...newVariant,
                      additionalPrice: parseFloat(e.target.value),
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="variantQuantity">Quantity</Label>
                <Input
                  type="number"
                  id="variantQuantity"
                  value={newVariant.quantity}
                  onChange={(e) =>
                    setNewVariant({
                      ...newVariant,
                      quantity: parseInt(e.target.value),
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="variantStatus">Status</Label>
                <Input
                  type="select"
                  id="variantStatus"
                  value={newVariant.status}
                  onChange={(e) =>
                    setNewVariant({
                      ...newVariant,
                      status: parseInt(e.target.value),
                    })
                  }
                >
                  <option value={Status.Active}>Active</option>
                  <option value={Status.Inactive}>Inactive</option>
                  <option value={Status.Archived}>Archived</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={2} className="d-flex align-items-end">
              <Button color="success" type="submit">
                Create Variant
              </Button>
            </Col>
          </Row>
        </Form>

        <Button
          color="secondary"
          onClick={() => navigate("/productmanagement")}
        >
          Back to Product Management
        </Button>
      </Container>
    </div>
  )
}

export default EditProduct
