import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import React from 'react';

import Home from '../pages/Home';
import Login from '../pages/login';
import Places from '../pages/Places';

import { AuthProvider } from '../context/AuthContext';
import PrivateRoute from './PrivateRoute';
import Register from '../pages/Register';
import Place from '../pages/Place';
import Menu from '../pages/Menu';
import Orders from '../pages/Orders';
import Menusettings from '../pages/MenuSettings';

function App() {
    return (
    <AuthProvider>
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <Home/>
                </Route>
                <Route exact path='/login'>
                    <Login/>
                </Route>
                <Route exact path='/register'>
                    <Register/>
                    </Route>
                <Route exact path='/menu/:id/:table'>
                    <Menu/>
                </Route>
                <PrivateRoute exact path='/places/:id'>
                    <Place/>
                </PrivateRoute>
                <PrivateRoute exact path='/places'>
                    <Places/>
                    </PrivateRoute>
                <PrivateRoute exact path='/places/:id/orders'>
                    <Orders/>
                </PrivateRoute>
                <PrivateRoute exact path='/places/:id/settings'>
                    <Menusettings/>
                </PrivateRoute>
    
               
            </Switch>
        </BrowserRouter>
        <ToastContainer>
        </ToastContainer>
    </AuthProvider>
    )
}

export default App;