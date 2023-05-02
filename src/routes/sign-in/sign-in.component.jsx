import { useState } from "react";

//import Button from "../../components/button/button.component";
import { signInReq } from "../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils"; 
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
    userId: '',
    password: ''
}

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {userId, password} = formFields;
    const navigate = useNavigate();
    
    const handlerChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const SignInHandler= async(event) =>{
        event.preventDefault();
        
        try{
            await signInReq(userId, password);
            navigate('/cart');
        } 
        catch(error){
            console.log(error);
        }
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
                <button>
                    SignIn
                </button>
            
            </form>
        </div>
    )
}

export default SignIn;