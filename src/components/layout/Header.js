import React, {useContext, useEffect} from 'react';
import AuthContext from '../../context/auth/authContext';

const Header = () => {

    // Extraer valores del context de auth
    const authContext = useContext(AuthContext);
    const {user, authUser, logoutUser} = authContext;

    useEffect(() => {
        authUser();
        // eslint-disable-next-line
    }, [])

    return ( 
        <header className="app-header">
            {user ? <p className="nombre-usuario">Hola <span>{user.userName}</span></p> : null}
        <nav className="nav-principal">
            <a 
                href="/"
                onClick={() => logoutUser()}
            >Cerrar Sesión</a>
        </nav>
        </header>
     );
}
 
export default Header;