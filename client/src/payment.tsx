import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import TopNav from './top-nav.tsx';
import './payment.css';

function Payment() {
    const navigate = useNavigate();
    const flatPrice = 16.00;

    const [tipAmount, setTip] = useState("0.00");
    function handleClick(percentage:number) {
        setTip((flatPrice / 100 * percentage).toFixed(2));
    }

    return (
        <>
            <TopNav />

            <div id="payment-container">
                <div id="payment-container-top">
                    <div id="payment-title">
                        <GoArrowLeft id="back-arrow" size={30} onClick={() => navigate("/")} />
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
                        <div id="middle-left-payment">
                            <div id="payment-price">
                                <div id="prices">
                                    <div className="price-component">
                                        <div className="component-name">Payment</div>
                                        <div className="price-amount">${flatPrice.toFixed(2)}</div>
                                    </div>
                                    <div className="price-component">
                                        <div className="component-name">Tip</div>
                                        <div className="price-amount">${tipAmount}</div>
                                    </div>
                                </div>
                                <hr />
                                <div id="price-bottom">
                                    <div className="component-name">Total</div>
                                    <div className="price-amount">${(Number(flatPrice) + Number(tipAmount)).toFixed(2)}</div>
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
    )
}

export default Payment