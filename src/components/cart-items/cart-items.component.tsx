import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

import CartItem from '../cart-item/cart-item.component'

const CartItems = () => {
    const cartItems = useSelector(selectCartItems);
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>            
                {cartItems.map((item) => {
                    return (<CartItem key={item.upc} cartItem ={item}/>)
                })}
            </div>
        </div>
    )
}

export default CartItems;