import { useDispatch } from 'react-redux';
import { initialCartState } from '../../store/cart/cart.action';
import { initLoyaltyNumber } from '../../store/loyalty/loyalty.reducer';

import Button from '../button/button.component';
import { callApi } from '../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils';
import { CALL_API_ACTION_TYPE } from '../../store/call-api/call-api.types';


import './void-transaction.styles.scss'

const VoidTransaction = () =>{
    const dispatch = useDispatch();
    
    const voidtransactionHandler= () =>{
        callApi(
            CALL_API_ACTION_TYPE.VOIDTRANSACTION_REQUEST,
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
            onClick={voidtransactionHandler} 
            htmlContent ='Void Transaction'
            action= 'voidTransaction'
        />
    )    
}

export default VoidTransaction