import { useState,useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component"
import { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { callAPI } from "../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils"

import SuspendTransaction from '../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi-template/SuspendTransaction';

import './end-transaction.styles.scss'





export const EndTransaction =() => {
    
    const initialButtonText = () => {
        return (
            <span className="end-transaction-button-container">
                <span>
                    <span className="end-transaction-cart-total">&#8362; {cartTotal}</span>
                </span>
                <span>
                    <span>סיום &#10095; </span>
                </span>
            </span>
        )
    }


    const {cartTotal, initialCartState}= useContext(CartContext);
    const [buttonText, setButtonText] = useState(initialButtonText);
    

    

    const suspendTransaction= async() =>{
        changeText("Please Wait...");
        const res  = await callAPI('SuspendTransaction', SuspendTransaction);
        initialCartState();
        changeText(initialButtonText);
    }

    const changeText = (text) => setButtonText(text);

    return (
        <Button onClick={suspendTransaction} buttonType={BUTTON_TYPE_CLASSES.endTransaction}>
           {buttonText}
        </Button>
    )
}