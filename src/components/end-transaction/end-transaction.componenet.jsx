import { useDispatch, useSelector } from "react-redux";
import { initialCartState } from "../../store/cart/cart.reducer";
import { initLoyaltyNumber } from "../../store/loyalty/loyalty.reducer";
import { selectCartTotal } from "../../store/cart/cart.selector";

import Button from "../button/button.component"
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { callApi } from "../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils";
import { CALL_API_ACTION_TYPE } from "../../store/call-api/call-api.types";

import './end-transaction.styles.scss'

export const EndTransaction =() => {
    const dispatch = useDispatch();
    const cartTotal = useSelector(selectCartTotal);

    const suspendTransaction = () =>{
        callApi(
            CALL_API_ACTION_TYPE.SUSPENDTRANSACTION_REQUEST, 
            null,
            dispatch
            ).then((response) => {
            dispatch(initialCartState());
            dispatch(initLoyaltyNumber());
        })
        .catch((error) => {
        });
    }

    return (
        <Button 
            onClick={suspendTransaction} 
            buttonType={BUTTON_TYPE_CLASSES.endTransaction}
            htmlContent ={
                `<span className="end-transaction-button-container">
                    <span>
                        <span className="end-transaction-cart-total">&#8362; ${cartTotal}</span>
                    </span>
                    <span>
                        <span>סיום &#10095; </span>
                    </span>
                </span>`}
            action= 'suspendTransaction'
        >
        </Button>
    )
}

export default EndTransaction