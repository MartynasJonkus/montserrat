import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router";
import { useState } from "react";
import TopNav from './top-nav.tsx';
import './order-page.css';


function OrderPage() {
    const navigate = useNavigate();

    const [totalAmount, setTotal] = useState(0);

    const navigateToPayment = () => {
        navigate('/payment', { state: { amount: totalAmount } });
    }

    return (
        <>
            <TopNav />

            <div id="order-container">
                <div id="container-left">
                    <div className="container-top" id="back-to-dashboard">
                        {/*<GoArrowLeft id="back-arrow" size={30} onClick={() => navigate("/")} />*/}
                        <button id="save-order-button" onClick={() => { } }>Save order</button>
                    </div>
                    <div id="order-details">
                        <div id="order-top"><b>CURRENT ORDER</b></div>
                        <hr />
                        {/*this list need a way to remove items*/}
                        <div className="order-product">
                            <div id="order-product-amount">x2</div>
                            <div id="order-product-name">Chocolate chip cookie</div>
                            <div id="order-product-price">$2.00</div>
                        </div>
                        <hr />
                        <div className="order-product">
                            <div id="order-product-amount">x2</div>
                            <div id="order-product-name">Chocolate chip cookie</div>
                            <div id="order-product-price">$2.00</div>
                        </div>
                        <hr />
                        <div className="order-product">
                            <div id="order-product-amount">x2</div>
                            <div id="order-product-name">Chocolate chip cookie</div>
                            <div id="order-product-price">$2.00</div>
                        </div>
                        <hr />
                        <div className="order-product">
                            <div id="order-product-amount">x2</div>
                            <div id="order-product-name">Chocolate chip cookie</div>
                            <div id="order-product-price">$2.00</div>
                        </div>
                        <hr />
                        <div className="order-product">
                            <div id="order-product-amount">x2</div>
                            <div id="order-product-name">Chocolate chip cookie</div>
                            <div id="order-product-price">$2.00</div>
                        </div>
                        <hr />
                        <div className="order-product">
                            <div id="order-product-amount">x2</div>
                            <div id="order-product-name">Chocolate chip cookie</div>
                            <div id="order-product-price">$2.00</div>
                        </div>
                        <hr />
                        <div className="order-product">
                            <div id="order-product-amount">x2</div>
                            <div id="order-product-name">Chocolate chip cookie</div>
                            <div id="order-product-price">$2.00</div>
                        </div>
                    </div>
                    <div id="order-price">
                        <div id="prices">
                            <div className="price-component">
                                <div className="component-name">Subtotal</div>
                                <div className="price-amount">$16.00</div>
                            </div>
                            <div className="price-component">
                                <div className="component-name">Discount</div>
                                <div className="price-amount">$0</div>
                            </div>
                        </div>
                        <hr />
                        <div id="price-bottom">
                            <div className="component-name">Total</div>
                            <div className="price-amount">${totalAmount.toFixed(2)}</div>
                        </div>
                    </div>
                    <div id="container-bottom">
                        <button onClick={() => { } } id="payment-split">Split</button>
                        <button onClick={() => navigateToPayment()} id="payment-pay">Pay</button>                  
                    </div>
                </div>


                <div id="container-right">
                    <div className="container-top">Products</div>
                    <div id="products">
                        <div className="product-group">
                            <div className="group-name">Coffee</div>
                            <div className="items">
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                            </div>
                        </div>
                        <div className="product-group">
                            <div className="group-name">Cookies</div>
                            <div className="items">
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                            </div>
                        </div>
                        <div className="product-group">
                            <div className="group-name">Coffee</div>
                            <div className="items">
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                                <div className="item">
                                    <div className="item-name">Latte</div>
                                    <div className="item-price">$2.50</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="container-bottom" />
                </div>
            </div>
        </>
    )
}

export default OrderPage
