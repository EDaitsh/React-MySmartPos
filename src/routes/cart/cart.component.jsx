import { useState } from 'react';
import CartItems from '../../components/cart-items/cart-items.component'

import AddCustomerReq from '../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi-template/AddCustomer';
import { callAPI } from '../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils';
import EndTransaction  from '../../components/end-transaction/end-transaction.componenet';
import AddItem from '../../components/add-item/add-item.component';
import VoidTransaction from '../../components/void-transaction/void-transaction.component';

const AddCustomer = AddCustomerReq;

const Cart = () => {
    const [response, setResponse] = useState("");

    const callWS = async(actionName) => {
        const request = eval(actionName);
        setResponse('Please Wait...');
        const res = await callAPI(actionName, request);
        setResponse(res);
  };

  return(
       <div>
        <div>
            <button onClick={() => callWS('AddCustomer')}>
              AddCustomer
            </button>
            <VoidTransaction/>
        </div>
        <div> 
          <AddItem/>
        </div>
      
        <div>
          <CartItems/>
        </div>
        <div>
            <EndTransaction/>
        </div>
       
      </div>
  )
}

export default Cart;