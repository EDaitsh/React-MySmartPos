import { Fragment } from 'react';

import { useDispatch } from 'react-redux';
import { callApi } from '../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils';
import { CALL_API_ACTION_TYPE } from '../../store/call-api/call-api.types';

import Promotion from '../promotion/promotion.component';

import './cart-item.styles.scss'

const CartItem = ({cartItem}) => {
    const dispatch = useDispatch();
    const {description, upc, price, quantity, promotion} = cartItem;

    const addItemHandler = () => {
        callApi(
            CALL_API_ACTION_TYPE.ADDITEM_REQUEST,
            {upc}, 
            dispatch
        );
    };

    const removeItemHandler= ()=> {
        callApi(
            CALL_API_ACTION_TYPE.VOIDITEM_REQUEST,
            {upc}, 
            dispatch
        );
    }

    const clearItemHandler =()=> {
        callApi(
            CALL_API_ACTION_TYPE.VOIDITEM_REQUEST,
            {upc, quantity}, 
            dispatch
        );
    }
    return(
        <Fragment>
            <div className='checkout-item-container'>
                <span className='name'>{description}</span>
                <span className='upc'>{upc}</span>

                <span className='quantity'>
                    <div className='arrow' onClick={removeItemHandler} >&#10094;</div>
                    <span className='value'>{quantity}</span>
                    <div className='arrow' onClick={addItemHandler} >&#10095;</div>
                </span>
                <span className='price'>{price}</span>
                <div className='remove-button' onClick={clearItemHandler} >&#10005;</div>
            </div>
            {promotion && 
                <div>
                    <Promotion promotion={promotion}/>
                </div>
            }
        </Fragment>
        )

}

export default CartItem;
