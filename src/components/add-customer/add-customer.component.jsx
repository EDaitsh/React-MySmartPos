import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { callApi } from '../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils';
import Button from '../button/button.component';

import { CALL_API_ACTION_TYPE } from '../../store/call-api/call-api.types';

import './add-customer.styles.scss'

import { setLoyaltyNumber } from '../../store/loyalty/loyalty.action';

const defaultFormFields = {
    customerNumber: ''
}

const AddCustomer = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {customerNumber} = formFields;

    const navigate = useNavigate();
    
    const handlerChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const addCustomerHandler= async(event) =>{
        event.preventDefault();
        
        callApi(
            CALL_API_ACTION_TYPE.ADDCUSTOMER_REQUEST,
            customerNumber, 
            dispatch
            ).then((response) => {
                const {LoyaltyCard: {status}} = response;
                if({status}){
                    dispatch(setLoyaltyNumber(customerNumber));
                }
                navigate('/cart');
            })
            .catch((error) => {
            });
    }
   
    return (
        <div>
            <form onSubmit={addCustomerHandler}>
                <input 
                placeholder='Customer Number'
                type="text" 
                required onChange={handlerChange} 
                name="customerNumber"
                value={customerNumber}
                />
                <Button  
                htmlContent = 'Add Customer'
                action= 'addCustomer'
                >
                </Button>
            </form>
        </div>
    )
}

export default AddCustomer