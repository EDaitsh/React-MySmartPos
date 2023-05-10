import { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCallApiIsLoading } from "../../store/call-api/call-api.selector";
//import Button from "../../components/button/button.component";
import { signInRequest } from "../../store/call-api/call-api.action";
import { useNavigate } from "react-router-dom";

import Spinner from "../../components/spinner/spinner.component";

const defaultFormFields = {
    userId: '',
    password: ''
}

const SignIn = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectCallApiIsLoading);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {userId, password} = formFields;
    const navigate = useNavigate();
    
    const handlerChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const SignInHandler= async(event) =>{
        event.preventDefault();
        dispatch(signInRequest({userId, password}))
        navigate('/cart');
    }
   
    return (
        <Fragment>
        {
            isLoading ?
            (
                <Spinner/>
            ):
            (
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
                        <button>
                            SignIn
                        </button>
                    
                    </form>
                </div>
            )
        }
        </Fragment>
    )
}

export default SignIn;