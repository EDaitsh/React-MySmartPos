import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useSelector } from "react-redux";

import CartItems from '../../components/cart-items/cart-items.component'
import EndTransaction  from '../../components/end-transaction/end-transaction.componenet';
import AddItem from '../../components/add-item/add-item.component';
import VoidTransaction from '../../components/void-transaction/void-transaction.component';
import { CartContext } from "../../contexts/cart.context";

import { selectLoyaltyNumer } from "../../store/loyalty/loyalty.selector";


const Cart = () => {
    const navigate = useNavigate();
    const loyaltyNumber = useSelector(selectLoyaltyNumer);
    const {cartCount} = useContext(CartContext);

    const addCustomerHandler = () =>{
      navigate('/addCustomer');
    }
    
  
  return(
       <div>
       <div>
          <span>
            {cartCount}
          </span>
        </div>
        <div>
          <span>
            {loyaltyNumber}
          </span>
       </div>
        <div>
            <button onClick={addCustomerHandler}>
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