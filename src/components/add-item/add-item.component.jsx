import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

import { addItemToCart } from '../../store/cart/cart.action';
import Button from '../button/button.component';

import './add-item.styles.scss'

const defaultFormFields= {
    upc: '',
    quantity: 1,
}

const AddItem = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {upc, quantity} = formFields;
    const cartItems = useSelector(selectCartItems);

    const handlerChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const resetFormFields = () => { 
        setFormFields(defaultFormFields);
    }

    const addItemHandler= async(event) => {
        event.preventDefault();
        
        try{
            dispatch(await addItemToCart(cartItems, upc, quantity));
            resetFormFields();
        } catch(error){
            console.log(error);
        }
    };


    return (
        <div className="add-item-container">
            <form onSubmit={addItemHandler}>
                <input 
                    className="form-input"
                    placeholder='UPC'
                    type="text" 
                    required onChange={handlerChange} 
                    name="upc"
                    value={upc}
                />
                <input 
                    className="form-quantity-input"
                    placeholder='Quantity'
                    type="text" 
                    required onChange={handlerChange}   
                    name="quantity"
                    value={quantity}
                />
                <Button 
                    htmlContent='+'
                    action= 'addItem'
                    loadingText=''
                    />
            
            </form>
        </div>
    )
}

export default AddItem;