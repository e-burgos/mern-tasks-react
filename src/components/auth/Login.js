import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import alertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';


const Login = (props) => {

    // Extraer valores del context de alertas
    const alertsContext = useContext(alertContext);
    const {alert, showAlert} = alertsContext;

    // Extraer valores del context de auth
    const authContext = useContext(AuthContext);
    const {msg, auth, loginUser} = authContext;

    // State para iniciar sesion 
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    // Revisar state de autentificacion o mensaje 
    useEffect(() => {
        if(auth){
            props.history.push('/projects');
        };
        if(msg){
            showAlert(msg.msg, msg.category);
        };
        // eslint-disable-next-line
    }, [msg, auth, props.history])

    // Extraer de usuario
    const {email, password} = user;

    // Detectar cuando el usuario esta escribiendo
    const onchange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    // Cuando el usuario desea iniciar sesion
    const onSubmit = e => {
        e.preventDefault();

        // Validar campos vacios
        if(email.trim() === "" || password.trim() === ""){
            showAlert('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        // Validar qu el password tenga un minimo de 6 caracteres 
        if(password.length < 6){
            showAlert('La contraseña debe tener al menos 6 caracteres', 'alerta-error');
            return;
        };

        // Pasarlos al action
        loginUser({
            email, 
            password
        });
    };

    return ( 
        <div className="form-usuario">
            { alert ? <div className={`alerta ${alert.category}`}>{alert.msg}</div> : null }
            <div className="contenedor-form sombre-dark">
                <h1>Iniciar Sesión</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            value={email}
                            onChange={onchange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Contraseña"
                            value={password}
                            onChange={onchange}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión" 
                        />
                    </div>
                </form>
                <Link to={'/new-account'} className="enlace-cuenta">
                    Crear Cuenta 
                </Link>
            </div>
        </div>
     );
}
 
export default Login;