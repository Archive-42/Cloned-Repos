import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { loadToken } from "./store/actions/authentication";
import { ProtectedRoute, PrivateRoute } from "./util/route-util";
import LoginForm from './components/LoginForm';
import LandingPage from "./components/LandingPage";
import MainPage from "./components/MainPage";
import './components/stylesheets/App.css';

function App({ socket, needLogin, loadToken }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    loadToken();
  }, [loadToken]);

  if (!loaded) {
    return null;
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route path ="/landing" component={LandingPage} />
        <ProtectedRoute
          path="/login"
          exact={true}
          needLogin={needLogin}
          component={LoginForm}
        />
        <PrivateRoute
          path="/"
          exact={true}
          needLogin={needLogin}
          component={() => <MainPage socket={socket} />}
        />

        <Redirect to="/" />

      </Switch>
    </BrowserRouter>
  );
}

const AppContainer = ({ socket }) => {
  const needLogin = useSelector((state) => !state.authentication.token);
  const dispatch = useDispatch();
  return <App socket={socket} needLogin={needLogin} loadToken={() => dispatch(loadToken())} />;
};

export default AppContainer;
