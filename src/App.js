import {Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';

import { initReq } from './utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils';

import SignIn from './routes/sign-in/sign-in.component';
import Cart from './routes/cart/cart.component';
import AddCustomer from './components/add-customer/add-customer.component';

import './App.css';


const App= () => {

    const [isLoading, setLoading] = useState(true); // Loading state


    const initialize = async() => {
        
      
        const initRes = await initReq('WILED250178-7NM');
        setLoading(false); //set loading state
    }

    useEffect(()=> {
        initialize();
    }, [])


    if (isLoading) {
        return (
        <div className='initialize-container'>Initialize...</div>
      );
    }

  return(
   
    <Routes>
        <Route index element={<SignIn/>}/>
        <Route path= "/cart" element={<Cart/>} />
        <Route path= "/addCustomer" element={<AddCustomer/>} />
    </Routes>
  );
}

export default App;
