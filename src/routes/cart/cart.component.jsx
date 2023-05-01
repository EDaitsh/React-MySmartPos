import { useState, useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItems from '../../components/cart-items/cart-items.component'

import AddCustomerReq from '../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi-template/AddCustomer';
import AddItemReq from '../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi-template/AddItem';
import VoidItemReq from '../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi-template/VoidItem';
import VoidTransactionReq from '../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi-template/VoidTransaction';
import { callAPI } from '../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils';
import { EndTransaction } from '../../components/end-transaction/end-transaction.componenet';

const AddCustomer = AddCustomerReq;
const AddItem = AddItemReq;
const VoidItem = VoidItemReq;
const VoidTransaction = VoidTransactionReq;

const Cart = () => {
    const [response, setResponse] = useState("");
    const {addItemToCart} = useContext(CartContext);

    const callWS = async(actionName) => {
        const request = eval(actionName);
        setResponse('Please Wait...');
        const res = await callAPI(actionName, request);
        setResponse(res);
  };

  const AddItemHandler = async() => {
    await addItemToCart({upc: 3457954, quantity: 1});
  }

  return(
       <div>
        <div>
            <button onClick={() => callWS('AddCustomer')}>
              AddCustomer
            </button>
        </div>
        <div> 
          <button onClick={AddItemHandler}>
              AddItem
          </button>
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
            <EndTransaction/>
        </div>
        <div>
            <CartItems/>
        </div>
      </div>
  )
}

export default Cart;