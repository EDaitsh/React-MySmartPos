//import Button from "../../components/button/button.component";
import { callAPI } from "../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils"; 
import Signon from "../../utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi-template/Signon";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();

    
    const SignInHandler= async() =>{
        const res  = await callAPI('Signon', Signon,123);
        navigate('/cart');
    }
    return (
        <div>
            <button onClick={SignInHandler}> Sign In </button>
        </div>
    )
}

export default SignIn;