import { useState } from 'react';
import CartItems from '../../components/cart-items/cart-items.component'

import AddCustomerReq from '../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi-template/AddCustomer';
import VoidItemReq from '../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi-template/VoidItem';
import VoidTransactionReq from '../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi-template/VoidTransaction';
import { callAPI } from '../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils';
import { EndTransaction } from '../../components/end-transaction/end-transaction.componenet';
import AddItem from '../../components/add-item/add-item.component';

const AddCustomer = AddCustomerReq;
const VoidItem = VoidItemReq;
const VoidTransaction = VoidTransactionReq;

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
        </div>
        <div> 
          <AddItem/>
        </div>
        <div>
          <button onClick={() => callWS('VoidItem')}>
              VoidItem
          </button>
        </div>
       
        <div>
          <button onClick={() => callWS('VoidTransaction')}>
              VoidTransaction
          </button>
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