import { useState } from 'react'
import { VscAccount } from "react-icons/vsc";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'


function App() {

    return (
        <>
            <div id="top-nav">
                <div id="top-nav-left">
                    <div className="circle" />
                    <div className="page-button">Products</div>
                    <div className="page-button">Reservations</div>
                    <div className="page-button">Taxes</div>
                </div>
                <div id="top-nav-right">
                    <div className="page-button">Employees</div>
                </div>
            </div>

            <div id="order-container">
                <div id="container-left">
                    <div id="container-top" />
                    <div id="order-details">
                        <div id="order-top"><b>CURRENT ORDER</b></div>
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
                            <div className="price-amount">$16.00</div>
                        </div>
                    </div>
                    <div id="container-bottom">
                        <div id="payment-split">Split</div>
                        <div id="payment-pay">Pay</div>
                    </div>
                </div>


                <div id="container-right">
                    <div id="container-top">Products</div>
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

export default App
