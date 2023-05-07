import { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.action';

import './cart-item.styles.scss'

const CartItem = ({cartItem}) => {
    const dispatch = useDispatch();
    const {description, upc, price, quantity} = cartItem;

    const addItemHandler = () => {
        dispatch(addItemToCart(cartItem.upc));
    };

    const removeItemHandler= ()=> {
        dispatch(removeItemFromCart(cartItem));
    }

    const clearItemHandler =()=> {
        dispatch(clearItemFromCart(cartItem));
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
