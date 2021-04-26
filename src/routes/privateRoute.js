import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/auth/authContext';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...props }) => {

    // Extraer valores del context de auth
    const authContext = useContext(AuthContext);
    const { auth, loading, authUser } = authContext;

    useEffect(() => {
        authUser();
        // eslint-disable-next-line
    }, [])

    return ( 
        <Route { ...props } render={ props => !auth && !loading ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        ) } />
     );
}
 
export default PrivateRoute;