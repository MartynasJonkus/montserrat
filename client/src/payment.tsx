import { useState, useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import TopNav from "./top-nav.tsx";
import "./payment.css";

const API_BASE_URL = "http://localhost:5282";

export interface GiftCard {
    id: number;
    code: string;
    initialBalance: number;
    balance: number;
    currency: string;
    expiresOn: string | null;
    status: number;
    createdAt: string;
    updatedAt: string;
}

function Payment() {
    const navigate = useNavigate();
    const location = useLocation();

    const flatPrice = location.state.amount;
    const orderId = location.state.id;

    const [tipAmount, setTip] = useState("0.00");
    const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null);
    const [discounts, setDiscounts] = useState<{ id: number; title: string; percentage: number }[]>([]);
    const [giftCardCode, setGiftCardCode] = useState("");
    const [giftCardData, setGiftCardData] = useState<GiftCard | null>(null);
    const [paymentMethod, setPaymentMethod] = useState("cash"); // Default payment method
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showSummary, setShowSummary] = useState(false);
    const [totalGiftCardMoney, setTotalGiftCardMoney] = useState(0.00);
    const [total, setTotal] = useState(0.00);

    useEffect(() => {
        const fetchDiscounts = async () => {
            const token = localStorage.getItem("jwtToken");

            if (!token) {
                console.error("No token found");
                return;
            }

            try {
                const response = await axios.get(`${API_BASE_URL}/api/orderDiscounts`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setDiscounts(response.data);
            } catch (error) {
                console.error("Error fetching discounts:", error);
            }
        };

        fetchDiscounts();
    }, []);

    const fetchGiftCards = async (): Promise<GiftCard[]> => {
        const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
        if (!token) {
            throw new Error("No JWT token found. Please log in.");
        }

        try {
            const response = await axios.get<GiftCard[]>(`${API_BASE_URL}/api/giftcards`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error fetching gift cards:", error);
            throw new Error("Failed to fetch gift cards. Please try again.");
        }
    };

    const fetchOrder = async (orderId: number) => {
        const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
        try {
            const response = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching order:", error);
            throw new Error("Failed to fetch order.");
        }
    };

    const validateGiftCard = async () => {
        setErrorMessage(""); // Clear previous error messages
        try {
            const giftCards = await fetchGiftCards();
            const matchingCard = giftCards.find((card) => card.code === giftCardCode);

            if (!matchingCard) {
                setErrorMessage("Gift card code is invalid.");
                setGiftCardData(null);
                return;
            }

            if (matchingCard.status !== 0) {
                setErrorMessage("Gift card is inactive or expired.");
                setGiftCardData(null);
                return;
            }

            setGiftCardData(matchingCard);
        } catch (error) {
            console.error("Error validating gift card:", error);
            setErrorMessage("An error occurred while validating the gift card. Please try again.");
        }
    };

    const handleClick = (percentage: number) => {
        setTip((flatPrice / 100 * percentage).toFixed(2));
    };

    const handleCustomTip = () => {
        const userInput = window.prompt("Enter a custom tip amount in decimal format (e.g., 5.00):");

        if (userInput != null && Number(userInput) >= 0) {
            const parsedTip = parseFloat(userInput);
            setTip(parsedTip.toFixed(2));
        } else {
            alert("Invalid input. Please enter a valid decimal number.");
        }
    };
    
    

    const applyDiscount = () => {
        if (selectedDiscount !== null) {
            const discount = discounts.find((d) => d.id === selectedDiscount);
            if (discount) {
                return flatPrice - (flatPrice / 100 * discount.percentage);
            }
        }
        return flatPrice;
    };

    useEffect(() => {
        const discountedPrice = applyDiscount();
        setTotal(discountedPrice + Number(tipAmount) + totalGiftCardMoney);
    }, [selectedDiscount, tipAmount]);

    const pay = async () => {
        setErrorMessage("");
        setSuccessMessage("");
        
        /*const order = await fetchOrder(orderId);

        if (order.OrderStatus != 0) {
            setErrorMessage("You can not pay for an order of this status.");
        }*/

        if (paymentMethod === "giftcard") {
            if (!giftCardData) {
                setErrorMessage("Please validate the gift card before proceeding.");
                return;
            }
    
            if (giftCardData.balance >= Number(total)) {
                try {
                    const token = localStorage.getItem("jwtToken");
    
                    if (!token) {
                        throw new Error("No token found. Please log in.");
                    }
    
                    await axios.put(
                        `${API_BASE_URL}/api/giftcards/${giftCardData.id}`,
                        { 
                            ...giftCardData,
                            balance: giftCardData.balance - Number(total) 
                        },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
    
                    await updateOrderStatus(orderId, 1);
                    setSuccessMessage("Payment successful! The order is now marked as paid.");
                    setGiftCardData({ ...giftCardData, balance: giftCardData.balance - Number(total) });  // Update local state with new balance
                } catch (error) {
                    console.error("Error processing payment:", error);
                    setErrorMessage("An error occurred while processing the payment. Please try again.");
                }
            } else if (giftCardData.balance > 0 && giftCardData.balance < total) {
                try {
                    const token = localStorage.getItem("jwtToken");
            
                    if (!token) {
                        throw new Error("No token found. Please log in.");
                    }

                    setTotalGiftCardMoney((totalGiftCardMoney - giftCardData.balance));
                    setTotal(total - giftCardData.balance);
                    
                    await axios.put(
                        `${API_BASE_URL}/api/giftcards/${giftCardData.id}`,
                        { 
                            ...giftCardData,
                            balance: 0
                        },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    setGiftCardData({ ...giftCardData, balance: 0 });

                    setSuccessMessage(
                        `Gift card balance of $${giftCardData.balance.toFixed(2)} has been fully used. The remaining amount of $${(total - giftCardData.balance).toFixed(2)} must be paid using another payment method.`
                    );
                } catch (error) {
                    console.error("Error processing payment:", error);
                    setErrorMessage("An error occurred while processing the payment. Please try again.");
                }
            } else if (giftCardData.balance === 0) {
                setErrorMessage("The gift card is empty. Please use a different payment method.");
            }
            
        } else {
            await updateOrderStatus(orderId, 1);
            setSuccessMessage("Payment successful! The order is now marked as paid.");
        }
    };
    const updateOrderStatus = async (orderId: number, newStatus: number) => {
        const token = localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
        try {
            const order = await fetchOrder(orderId);
    
            const updatedOrder = {
                ...order,
                status: newStatus,
            };
    
            await axios.put(
                `${API_BASE_URL}/api/orders/${orderId}`,
                updatedOrder,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Order status updated successfully.");
        } catch (error) {
            console.error("Error updating order status:", error);
            throw new Error("Failed to update order status.");
        }
    };
    const printSummary = () => {
    if (!showSummary) {
        setShowSummary(true);
    }
    else {
        setShowSummary(false);
    }
    };

    return (
        <>
            <TopNav />

            <div id="payment-container">
                <div id="payment-container-top">
                    <div id="payment-title">
                        <GoArrowLeft
                            id="back-arrow"
                            size={30}
                            onClick={() => navigate("/ordercreation", { state: { id: orderId } })}
                        />
                        <div id="title-content">
                            <div>Pay Full Amount</div>
                            <div id="title-amount">(${flatPrice.toFixed(2)})</div>
                        </div>
                    </div>
                    <hr />
                </div>

                <div id="payment-container-middle">
                    <div id="container-middle-left">
                        <div id="middle-left-title">ADD TIP</div>
                        <div id="middle-left-tips">
                        <div className="tips" onClick={() => handleClick(0)}>No tip</div>
                        <div className="tips" onClick={() => handleClick(15)}>15% Ok!</div>
                        <div className="tips" onClick={() => handleClick(18)}>18% Good!</div>
                        <div className="tips" onClick={() => handleClick(20)}>20% Great!</div>
                        <div className="tips" onClick={() => handleClick(25)}>25% Wow!</div>
                        <div
                            className="tips"
                            onClick={() => handleCustomTip()}
                        >
                            Custom tip
            </div>
        </div>

                        <div id="middle-left">
                            <div className="discount-title">Select Discount</div>
                            <select
                                value={selectedDiscount ?? ""}
                                onChange={(e) => setSelectedDiscount(Number(e.target.value))}
                            >
                                <option value="">No Discount</option>
                                {discounts.map((discount) => (
                                    <option key={discount.id} value={discount.id}>
                                        {discount.title} ({discount.percentage}%)
                                    </option>
                                ))}
                            </select>
                            <div className="payment-method">Payment Method</div>
                                <select
                                    id="paymentMethod"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                >
                                    <option value="cash">Cash</option>
                                    <option value="credit">Credit/Debit</option>
                                    <option value="giftcard">Gift Card</option>
                                </select>                            
                            {paymentMethod === "giftcard" && (
                                <div>
                                    <label htmlFor="giftCardCode">Gift Card Code:</label>
                                    <input
                                        type="text"
                                        id="giftCardCode"
                                        value={giftCardCode}
                                        onChange={(e) => setGiftCardCode(e.target.value)}
                                    />
                                    <button onClick={validateGiftCard}>Validate Gift Card</button>
                                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                                    {giftCardData && (
                                        <p>Gift Card Balance: ${giftCardData.balance.toFixed(2)}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div id="payment-container-bottom">
                    <button onClick={printSummary}>Print Payment Summary</button>
                    {showSummary && (
                        <div id="payment-summary">
                            <h3>Payment Summary</h3>
                            <p>Original Amount: ${flatPrice.toFixed(2)}</p>
                            {flatPrice - applyDiscount() > 0 && (
                                <p>Discount: -${(flatPrice - applyDiscount()).toFixed(2)}</p>
                            )}
                            {Number(tipAmount) > 0 && (
                                <p>Tip: ${tipAmount}</p>
                            )}
                            <p>Payment Method: {paymentMethod}</p>
                            {paymentMethod === "giftcard" && giftCardData && (
                                <p>Gift Card Balance Remaining: ${giftCardData.balance.toFixed(2)}</p>
                            )}
                            <p>Total: ${total.toFixed(2)}</p>
                        </div>
                    )}
                </div>

                <div className="pay" onClick={() => pay()}>PAY</div>
                {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
        </>
    );
}

export default Payment;

