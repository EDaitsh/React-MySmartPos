import { useContext, useState } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { voidTransactionReq } from '../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils';




import './void-transaction.styles.scss'

const initialButtonText = 'Void Transaction'

const VoidTransaction = () =>{

    const [buttonText, setButtonText] = useState(initialButtonText);
    const {initialCartState} = useContext(CartContext);
    
    const voidtransactionHandler= async() =>{
        setButtonText('Please Wait...')
        const res  = await voidTransactionReq();
        initialCartState();
        setButtonText(initialButtonText);
    }

    return (
        <button onClick={voidtransactionHandler} >
           {buttonText}
        </button>
    )    
}

export default VoidTransaction