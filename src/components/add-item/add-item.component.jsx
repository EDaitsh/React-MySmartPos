import { useState, useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';
import {BUTTON_TYPE_CLASSES} from '../button/button.component'

import './add-item.styles.scss'

const defaultFormFields= {
    upc: '',
    quantity: 1,
}

const AddItem = () => {
    const {addItemToCart} = useContext(CartContext);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {upc, quantity} = formFields;

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
            await addItemToCart(upc, quantity);
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
                <button>
                    +
                </button>
            
            </form>
        </div>
    )
}

export default AddItem;