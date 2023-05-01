import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CartItem from '../cart-item/cart-item.component'

const CartItems = () => {
    const {cartItems} = useContext(CartContext);
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