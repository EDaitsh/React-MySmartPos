import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { callApi } from "../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils";
import { useNavigate } from "react-router-dom";

import Button from "../../components/button/button.component";

import { CALL_API_ACTION_TYPE } from "../../store/call-api/call-api.types";

const defaultFormFields = {
    userId: '',
    password: ''
}

const SignIn = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {userId, password} = formFields;
    const navigate = useNavigate();
    
    const handlerChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const SignInHandler= async(event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        callApi(
            CALL_API_ACTION_TYPE.SIGNIN_REQUEST, 
            {userId, password}, 
            dispatch
            ).then(() => {
                navigate('/cart');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
            <div>
                <form onSubmit={SignInHandler}>
                    <input 
                        placeholder='UserID'
                        type="text" 
                        required onChange={handlerChange} 
                        name="userId"
                        value={userId}
                    />
                    <input 
                        placeholder='Password'
                        type="text" 
                        required onChange={handlerChange}   
                        name="password"
                        value={password}
                    />
                    <Button  
                    htmlContent = 'SignIn'
                    action ='signIn'
                    />
                </form>
            </div>
        
    )
}

export default SignIn;