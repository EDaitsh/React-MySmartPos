import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectCallApiIsLoading, selectCallApiResponse } from '../../store/call-api/call-api.selector';
import { addCustomerRequest } from '../../store/call-api/call-api.action';
import { callApi } from '../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils';

import './add-customer.styles.scss'

import { setLoyaltyNumber } from '../../store/loyalty/loyalty.action';
import Spinner from '../spinner/spinner.component';

const defaultFormFields = {
    customerNumber: ''
}

const AddCustomer = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {customerNumber} = formFields;
    const isLoading = useSelector(selectCallApiIsLoading);

    const navigate = useNavigate();
    
    const handlerChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const addCustomerHandler= async(event) =>{
        event.preventDefault();
        
        callApi('addCustomer_request', customerNumber, dispatch)
            .then((response) => {
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
            {
                isLoading ? 
                (
                    <Spinner/>
                ) :
                (
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
                )
            }
        </div>
    )
}

export default AddCustomer