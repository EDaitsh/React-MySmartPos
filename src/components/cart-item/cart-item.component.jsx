import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './cart-item.styles.scss'

const CartItem = ({cartItem}) => {
    const {description, upc, price, quantity} = cartItem;
    const {addItemToCart, removeItemFromCart, clearItemFromCart} = useContext(CartContext);

    const addItemHandler = () => {
        addItemToCart(cartItem.upc);
    };

    const removeItemHandler= ()=> {
        removeItemFromCart(cartItem);
    }

    const clearItemHandler =()=> {
        clearItemFromCart(cartItem);
    }

    return(
        <div className='checkout-item-container'>
            <span className='name'>{description}</span>
            <span className='name'>{upc}</span>

            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler} >&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler} >&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearItemHandler} >&#10005;</div>
        </div>
        )

}


export default CartItem;
