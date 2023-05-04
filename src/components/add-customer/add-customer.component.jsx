import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';


import { addCustomerReq } from '../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils';
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
        
        try{
            const {LoyaltyCard} = await addCustomerReq(customerNumber);
            const {status} = LoyaltyCard;
            if(status){
                dispatch(setLoyaltyNumber(customerNumber));
            }
            navigate('/cart');
        } 
        catch(error){
            console.log(error);
        }
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
                <button>
                    Add Customer
                </button>
            
            </form>
        </div>
    )
}

export default AddCustomer