import { GoArrowLeft } from "react-icons/go";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import './payment.css';

function Payment() {
    const navigate = useNavigate();
    const location = useLocation();

    const flatPrice = location.state.amount;
    const orderId = location.state.id;

    const [tipAmount, setTip] = useState("0.00");
    const [selectedDiscount, setSelectedDiscount] = useState<number | null>(null); // Stores the selected discount
    const [discounts, setDiscounts] = useState<{ id: number, title: string, percentage: number }[]>([]); // List of discounts

    // Fetch the available discounts (simulate API call)
    useEffect(() => {
        const fetchDiscounts = async () => {
            const token = localStorage.getItem("jwtToken"); // Retrieve token from local storage
    
            if (!token) {
                console.error("No token found");
                return;
            }
    
            try {
                const response = await fetch("http://localhost:5282/api/orderDiscounts", {
                    method: "GET", // Specify the HTTP method (GET in this case)
                    headers: {
                        "Authorization": `Bearer ${token}`, // Include the JWT token in the Authorization header
                        "Content-Type": "application/json", // Optional, but often needed for API requests
                    },
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setDiscounts(data); // Set the fetched data into state
                } else {
                    console.error("Failed to fetch discounts. Status:", response.status);
                    // Handle any non-OK responses here (e.g., Unauthorized)
                }
            } catch (error) {
                console.error("Error fetching discounts:", error);
            }
        };
    
        fetchDiscounts();
    }, []); // Empty dependency array ensures this runs only once when the component mounts
    
    function handleClick(percentage: number) {
        setTip((flatPrice / 100 * percentage).toFixed(2));
    }

    // Apply the discount to the flat price (but not the tip)
    const applyDiscount = () => {
        if (selectedDiscount !== null) {
            const discount = discounts.find((d) => d.id === selectedDiscount);
            if (discount) {
                const discountedPrice = flatPrice - (flatPrice / 100 * discount.percentage);
                return discountedPrice;
            }
        }
        return flatPrice; // No discount applied
    };

    const discountedPrice = applyDiscount();

    return (
        <>
            <div id="payment-container">
                <div id="payment-container-top">
                    <div id="payment-title">
                        <GoArrowLeft id="back-arrow" size={30} onClick={() => navigate("/ordercreation", { state: { id: orderId } })} />
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
                            <div className="tips" onClick={() => handleClick(0)}>Custom tip</div>
                        </div>

                        <div id="middle-left-discounts">
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
                        </div>

                        <div id="middle-left-payment">
                            <div id="payment-price">
                                <div id="prices">
                                    <div className="price-component">
                                        <div className="component-name">Amount</div>
                                        <div className="price-amount">${flatPrice.toFixed(2)}</div>
                                    </div>
                                    <div className="price-component">
                                        <div className="component-name">Discount</div>
                                        <div className="price-amount">-${(flatPrice - discountedPrice).toFixed(2)}</div>
                                    </div>
                                    <div className="price-component">
                                        <div className="component-name">Tip</div>
                                        <div className="price-amount">${tipAmount}</div>
                                    </div>
                                </div>
                                <hr />
                                <div id="price-bottom">
                                    <div className="component-name">Total</div>
                                    <div className="price-amount">${(Number(discountedPrice) + Number(tipAmount)).toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="container-middle-right">
                    </div>
                </div>
                <div id="payment-container-bottom">
                </div>
            </div>
        </>
    );
}

export default Payment;
