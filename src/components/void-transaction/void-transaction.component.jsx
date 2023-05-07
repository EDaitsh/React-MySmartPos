import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { initialCartState } from '../../store/cart/cart.action';

import { voidTransactionReq } from '../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils';




import './void-transaction.styles.scss'

const initialButtonText = 'Void Transaction'

const VoidTransaction = () =>{
    const dispatch = useDispatch();
    const [buttonText, setButtonText] = useState(initialButtonText);
    
    const voidtransactionHandler= async() =>{
        setButtonText('Please Wait...')
        const res  = await voidTransactionReq();
        dispatch(initialCartState());
        setButtonText(initialButtonText);
    }

    return (
        <button onClick={voidtransactionHandler} >
           {buttonText}
        </button>
    )    
}

export default VoidTransaction