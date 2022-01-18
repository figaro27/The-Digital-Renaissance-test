import 'react-app-polyfill/ie11';
import React, { FC } from 'react';
import '@fortawesome/fontawesome-free/js/all';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { useSelector } from '../../store';

import './App.scss';
import Welcome from '../Welcome/Welcome';
import Authenticate from '../Authenticate/Authenticate';
import Transactions from '../Transactions/Transactions';

const App: FC = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="App">
      <nav>
        <NavLink to="/">Welcome</NavLink>
        {user && <NavLink to="/transactions">Transactions</NavLink>}
        <NavLink to="/authenticate">Sign in</NavLink>
      </nav>
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route exact path="/authenticate">
          <Authenticate />
        </Route>
        <Route exact path="/transactions">
          <Transactions />
        </Route>
        <Redirect to="/" />
      </Switch>
      <ToastContainer style={{ fontSize: '16px' }} theme="dark" position="bottom-right" />
    </div>
  );
};

export default App;
