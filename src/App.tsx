import {Routes, Route} from 'react-router-dom';
import { useEffect,  Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCallApiIsLoading } from './store/call-api/call-api.selector';

import { callApi } from './utils/fast-lane-bridge-webapi/fast-lane-bridge-webapi.utils';

import { selectCallApiActionActive } from './store/call-api/call-api.selector';

import SignIn from './routes/sign-in/sign-in.component';
import Cart from './routes/cart/cart.component';
import AddCustomer from './components/add-customer/add-customer.component';
import Spinner from './components/spinner/spinner.component';
import { CALL_API_ACTION_TYPE } from './store/call-api/call-api.types';

import './App.css';


const App= () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectCallApiIsLoading);
  const isActionActive = useSelector(selectCallApiActionActive)[0] === 'init';

    useEffect(()=> {
        callApi(
          CALL_API_ACTION_TYPE.INIT_REQUEST, 
          'WILED250178-7NM', 
          dispatch
          ).catch((error) => {
            console.log(error);
          })
    }, [dispatch]);

  return(
    <Fragment>
      {
        isLoading && isActionActive ?
        <Spinner/> 
        :
          <Routes>
            <Route index element={<SignIn/>}/>
            <Route path= "/cart" element={<Cart/>} />
            <Route path= "/addCustomer" element={<AddCustomer/>} />
          </Routes>
      }
    </Fragment>
  )
}

export default App;
