import { FaRegPlusSquare } from "react-icons/fa"
import { useNavigate } from "react-router"
import { useEffect, useRef, useState } from "react"
import { ImCross } from "react-icons/im"
import "./OrderPage.css"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { Order, OrderItem } from "./Interfaces/Order"
import { Product } from "./Interfaces/Product"
import { Tax } from "./Interfaces/Tax"
import { Discount } from "./Interfaces/Discount"

const API_BASE_URL = "http://localhost:5282"

function OrderPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const orderId = location.state.id

  const [orderItems, setOrder] = useState<OrderItem[]>([])
  const [products, setProduct] = useState<Product[]>([])
  const [subtotalAmount, setSubtotal] = useState(0)
  const [discountAmount] = useState(0)
  const [totalAmount, setTotal] = useState(0)

  const isFirstRender = useRef(true)

  const [discounts, setDiscounts] = useState<Map<number, Discount | null>>(
    new Map()
  )
  const [taxes, setTaxes] = useState<Map<number, Tax | null>>(new Map())

  useEffect(() => {
    const fetchDiscountsAndTaxes = async () => {
      const newDiscounts: Map<number, Discount | null> = new Map()
      const newTaxes: Map<number, Tax | null> = new Map()

      // Fetch discounts and taxes for all products with discount and tax IDs
      for (const product of products) {
        if (product.discountId) {
          const discount = await fetchDiscount(product.discountId)
          newDiscounts.set(product.discountId, discount)
        }
        if (product.taxId) {
          const tax = await fetchTax(product.taxId)
          newTaxes.set(product.taxId, tax)
        }
      }

      // Update the state with the fetched discounts and taxes
      setDiscounts(newDiscounts)
      setTaxes(newTaxes)
    }

    fetchDiscountsAndTaxes()
  }, [products])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (orderId != undefined) {
      const handleFetchOrderById = async () => {
        try {
          const data = await fetchOrderItems(orderId)
          setOrder(data)
        } catch (err) {
          console.error(err)
        }
      }
      handleFetchOrderById()
    }
    const handleFetchProducts = async () => {
      try {
        setProduct([])
        let i = 1
        while (true) {
          const data = await fetchProducts(i, 100)
          if (data.length == 0) break
          i++
          setProduct((prevItems) => [...prevItems, ...data])
        }
      } catch (err) {
        console.error(err)
      }
    }

    handleFetchProducts()
    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchDiscount = async (
    discountId: number
  ): Promise<Discount | null> => {
    if (!discountId) return null
    try {
      const token = localStorage.getItem("jwtToken")
      const response = await axios.get<Discount>(
        `${API_BASE_URL}/api/discounts/${discountId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error("Error fetching discount:", err)
      return null
    }
  }

  const fetchTax = async (taxId: number): Promise<Tax | null> => {
    if (!taxId) return null
    try {
      const token = localStorage.getItem("jwtToken")
      const response = await axios.get<Tax>(
        `${API_BASE_URL}/api/taxes/${taxId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      console.error("Error fetching tax:", err)
      return null
    }
  }

  const handleItemAdd = (productId: number, variantId: number) => {
    console.log(variantId + ":" + productId)
    const productToAdd = products.find((product) => product.id == productId)

    if (productToAdd != undefined) {
      const existingItem = orderItems.find(
        (item) =>
          /*(item.id == productId) && */ item.productVariantId == variantId
      )
      if (existingItem != undefined) {
        setOrder((prevItems) =>
          prevItems.map((item) =>
            /*(item.id == productId) && */ item.productVariantId == variantId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        )
      } else {
        const newItem = {
          id: productToAdd.id,
          price: {
            amount: productToAdd.price.amount,
            currency: productToAdd.price.currency,
          },
          productVariantId: variantId,
          quantity: 1,
        }
        console.log(newItem.id + "variant:" + newItem.productVariantId)
        setOrder((prevItems) => [...prevItems, newItem])
      }
    }
  }

  const handleItemRemove = (itemId: number) => {
    setOrder((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const navigateToPayment = async () => {
    try {
      // Create the order before navigating to the payment page
      const newOrderId = await createOrder(orderItems)

      // Use the new orderId to navigate to the payment page
      navigate(`/order-payment/${newOrderId}`)
    } catch (err) {
      console.error("Error creating the order:", err)
    }
  }

  useEffect(() => {
    const calculateTotal = async () => {
      let sum = 0

      // Loop through each order item and apply discount/tax
      for (const item of orderItems) {
        const product = products.find((product) => product.id === item.id)
        if (product) {
          const variant = product.productVariants.find(
            (variant) => variant.id === item.productVariantId
          )
          if (variant) {
            const basePrice =
              product.price.amount + (variant.additionalPrice || 0)

            // Fetch discount and tax
            const discount = product.discountId
              ? await fetchDiscount(product.discountId)
              : null
            const tax = product.taxId ? await fetchTax(product.taxId) : null

            // Apply discount
            let finalPrice = basePrice
            if (discount) {
              finalPrice -= (basePrice * discount.percentage) / 100
            }

            // Apply tax
            if (tax) {
              finalPrice += (basePrice * tax.percentage) / 100
            }

            // Add the calculated price to the subtotal
            sum += finalPrice * item.quantity
          }
        }
      }

      // Set the subtotal and total
      setSubtotal(sum)
      setTotal(sum - discountAmount) // Apply any order-level discount if present
    }

    calculateTotal()
  }, [orderItems, products, discountAmount])

  const handleSaveOrder = () => {
    if (orderId != undefined) {
      console.log(JSON.stringify(orderItems))
      saveOrder(orderId, orderItems)
    } else {
      createOrder(orderItems)
    }
  }

  const handleItemPrice = (item: OrderItem) => {
    // Find the product variant based on the productVariantId
    const product = products.find((product) =>
      product.productVariants.some(
        (variant) => variant.id === item.productVariantId
      )
    )

    if (product) {
      const variant = product.productVariants.find(
        (variant) => variant.id === item.productVariantId
      )
      if (variant) {
        let basePrice = product.price.amount + (variant.additionalPrice || 0)

        // Get discount and tax from pre-fetched state
        const discount = product.discountId
          ? discounts.get(product.discountId)
          : null
        const tax = product.taxId ? taxes.get(product.taxId) : null

        // Apply discount if available
        if (discount) {
          basePrice -= (basePrice * discount.percentage) / 100
        }

        // Apply tax if available
        if (tax) {
          basePrice += (basePrice * tax.percentage) / 100
        }

        return basePrice
      }
    }

    // Fallback if no matching product or variant found
    return item.price.amount
  }

  const fetchOrderItems = async (orderId: number): Promise<OrderItem[]> => {
    const token = localStorage.getItem("jwtToken")
    const response = await axios.get<Order>(
      `${API_BASE_URL}/api/orders/${orderId}`,
      {
        params: {
          orderId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    console.log(response.data)
    return response.data.orderItems.map((item) => ({
      id: item.id,
      price: {
        amount: item.price.amount,
        currency: item.price.currency,
      },
      productVariantId: item.productVariantId,
      quantity: item.quantity,
    }))
  }

  const fetchProducts = async (
    pageNumber: number,
    pageSize: number
  ): Promise<Product[]> => {
    const token = localStorage.getItem("jwtToken")
    const response = await axios.get<Product[]>(
      `${API_BASE_URL}/api/products?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    console.log(response.data)
    return response.data
  }

  const saveOrder = async (
    orderId: number,
    orderItems: OrderItem[]
  ): Promise<void> => {
    const token = localStorage.getItem("jwtToken")
    const orderResponse = await axios.get<Order>(
      `${API_BASE_URL}/api/orders/${orderId}`,
      {
        params: {
          orderId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = {
      orderDiscountId: orderResponse.data.orderDiscountId,
      status: orderResponse.data.status,
      orderItems: orderItems.map((item) => ({
        productVariantId: item.productVariantId,
        quantity: item.quantity,
      })),
    }

    const updateResponse = await axios.put<void>(
      `${API_BASE_URL}/api/orders/${orderId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    console.log("order status updated" + updateResponse.data)
    window.location.reload()
  }

  const createOrder = async (orderItems: OrderItem[]): Promise<number> => {
    const token = localStorage.getItem("jwtToken")

    const data = {
      orderItems: orderItems.map((item) => ({
        productVariantId: item.productVariantId,
        quantity: item.quantity,
      })),
    }

    const response = await axios.post<Order>(
      `${API_BASE_URL}/api/orders`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data.id
  }

  const itemList = orderItems.map((item) => (
    <>
      <hr />
      <div className="order-product">
        <div id="order-product-amount">x{item.quantity}</div>
        <div id="order-product-name">ID: {item.productVariantId}</div>
        <div id="order-product-price">{handleItemPrice(item)} &euro;</div>
        <ImCross onClick={() => handleItemRemove(item.id)} />
      </div>
    </>
  ))

  const productList = products.map((product) =>
    product.productVariants.reverse().map((variant) => {
      const variantPrice = product.price.amount + (variant.additionalPrice || 0)

      // Apply discount and tax to the variant price
      let finalPrice = variantPrice

      // Check for discount
      const discount = product.discountId
        ? discounts.get(product.discountId)
        : null
      if (discount) {
        finalPrice -= (finalPrice * discount.percentage) / 100
      }

      // Check for tax
      const tax = product.taxId ? taxes.get(product.taxId) : null
      if (tax) {
        finalPrice += (finalPrice * tax.percentage) / 100
      }

      return (
        <div className="item" key={variant.id}>
          <div className="item-name">
            {product.title} {variant.title}
            {variant.quantity !== 0 ? (
              <FaRegPlusSquare
                onClick={() => handleItemAdd(product.id, variant.id)}
              />
            ) : null}
          </div>
          <div className="item-price">{finalPrice.toFixed(2)} &euro;</div>
        </div>
      )
    })
  )

  return (
    <>
      <div id="order-container">
        <div id="container-left">
          <div className="container-top" id="back-to-dashboard">
            <button id="save-order-button" onClick={() => handleSaveOrder()}>
              Save order
            </button>
          </div>
          <div id="order-details">
            <div id="order-top">
              <b>CURRENT ORDER</b>
            </div>
            {itemList}
          </div>
          <div id="order-price">
            <div id="prices">
              <div className="price-component">
                <div className="component-name">Subtotal</div>
                <div className="price-amount">
                  {subtotalAmount.toFixed(2)} &euro;
                </div>
              </div>
              <div className="price-component">
                <div className="component-name">Discount</div>
                <div className="price-amount">
                  {discountAmount.toFixed(2)} &euro;
                </div>
              </div>
            </div>
            <hr />
            <div id="price-bottom">
              <div className="component-name">Total</div>
              <div className="price-amount">
                {totalAmount.toFixed(2)} &euro;
              </div>
            </div>
          </div>
          <div id="container-bottom">
            <button onClick={() => navigateToPayment()} id="payment-pay">
              Pay
            </button>
          </div>
        </div>

        <div id="container-right">
          <div className="container-top">Products</div>
          <div id="products">
            <div className="product-group">
              <div className="group-name"></div>
              <div className="items">{productList}</div>
            </div>
          </div>
          <div id="container-bottom" />
        </div>
      </div>
    </>
  )
}

export default OrderPage
