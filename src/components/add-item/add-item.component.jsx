import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CALL_API_ACTION_TYPE } from '../../store/call-api/call-api.types';
import { callApi } from '../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils';

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

    const handlerChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const resetFormFields = () => { 
        setFormFields(defaultFormFields);
    }

    const addItemHandler= async(event) => {
        event.preventDefault();
        callApi(
            CALL_API_ACTION_TYPE.ADDITEM_REQUEST,
            {upc, quantity}, 
            dispatch
            ).then((response) => {
                resetFormFields();
            })
            .catch((error) => {
                console.log(error);
            });
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