import {Routes, Route} from 'react-router-dom';
import { useEffect,  Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCallApiIsLoading } from './store/call-api/call-api.selector';

import { initRequest } from './store/call-api/call-api.action';

import SignIn from './routes/sign-in/sign-in.component';
import Cart from './routes/cart/cart.component';
import AddCustomer from './components/add-customer/add-customer.component';
import Spinner from './components/spinner/spinner.component';

import './App.css';


const App= () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectCallApiIsLoading);

    useEffect(()=> {
        dispatch(initRequest('WILED250178-7NM'))
    }, [dispatch])

  return(
    <Fragment>
      {isLoading? 
        (
          <Spinner/>
        ) :
        (
          <Routes>
            <Route index element={<SignIn/>}/>
            <Route path= "/cart" element={<Cart/>} />
            <Route path= "/addCustomer" element={<AddCustomer/>} />
          </Routes>
        )
      }
    </Fragment>
  );
}

export default App;
