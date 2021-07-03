import { Router, Redirect } from 'react-router-dom';
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
function PrivateRoute({ children, ...rest }) {
    const auth = useContext(AuthContext);
    return (
        <Router
            {...rest}
            render={
                ({ location }) => 
                    auth.token ? (
                        children
                    ) : (
                            <Redirect
                                to={{
                                    pathname: '/login',
                                   // state:{ from : location },
                                }}
                            />
                    )
                
            }
        />
    )
}

export default PrivateRoute;