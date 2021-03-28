import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Body from './components/structure/Body/Body';
import { loadToken } from './store/authentication';
import AppBar from './components/structure/AppBar/AppBar';
import SplashPage from './components/SplashPage/SplashPage';



const App = () => {
  // *** Redux ***
  const token = useSelector(state => state.authentication.token);
  const dispatch = useDispatch();
  
  
  // *** Local State ***
  const [loaded, setLoaded] = useState(false);
  
  
  // *** Use Effect Hooks ***
  useEffect(() => {
    setLoaded(true);
    dispatch(loadToken());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {}, [token])
  
  
  if (!loaded) return null;
  
  
  // *** JSX ***
  return (
  <BrowserRouter>
    <div className='app-wrapper'>
      {
        token  
          ? <>
              <AppBar />
              <Body />
            </>
          :  <SplashPage />
      }
    </div>
  </BrowserRouter>
  )
}


export default App;
