import {Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';

// import useApi from './/utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils'
import { callAPI } from './utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils';
import InitReq from './utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi-template/Init';

import SignIn from './routes/sign-in/sign-in.component';
import Cart from './routes/cart/cart.component';

import './App.css';

const Init = InitReq;

const App= () => {

    const [isLoading, setLoading] = useState(true); // Loading state


    const initialize = async() => {
        
        const initRes = await callAPI('init', Init);
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
    </Routes>
  );
}

export default App;
