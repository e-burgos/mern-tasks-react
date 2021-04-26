import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import alertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

const NewAccount = (props) => {

    // Extraer valores del context de alertas
    const alertsContext = useContext(alertContext);
    const {alert, showAlert} = alertsContext;

    // Extraer valores del context de auth
    const authContext = useContext(AuthContext);
    const {msg, auth, registerUser} = authContext;

    // Verificar si el usuario se autentica, registro o ya existe un registro 
    useEffect(() => {
        // Si el usuario se autentica correctamente
        if(auth){
            props.history.push('/projects')
        };
        // En caso que existe un mensaje 
        if(msg){
            showAlert(msg.msg, msg.category);
        };
        // eslint-disable-next-line
    }, [msg, auth, props.history])

    // State para iniciar sesion 
    const [user, setUser] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Extraer de usuario
    const {email, password, userName, confirmPassword } = user;

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
        if(email.trim() === '' || password.trim() === '' || userName.trim() === '' || confirmPassword.trim() === ''){
            showAlert('Todos los campos son obligatorios', 'alerta-error');
            return;
        };

        // Validar qu el password tenga un minimo de 6 caracteres 
        if(password.length < 6){
            showAlert('La contraseña debe tener al menos 6 caracteres', 'alerta-error');
            return;
        };

        // Validad que ambos passwords sean iguales
        if(password.trim() !== confirmPassword.trim()){
            showAlert('Las contraseñas deben ser iguales', 'alerta-error');
            return;
        }; 

        // Pasarlo al action
        registerUser({
            email, 
            password, 
            userName
        });

    }

    return ( 
        <div className="form-usuario">
            { alert ? <div className={`alerta ${alert.category}`}>{alert.msg}</div> : null }
            <div className="contenedor-form sombre-dark">
                <h1>Crear Cuenta</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="userName">Nombre</label>
                        <input 
                            type="text"
                            id="userName"
                            name="userName"
                            placeholder="Ingresa tu nombre"
                            value={userName}
                            onChange={onchange}
                        />
                    </div>
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
                        <label htmlFor="confirmPassword">Password</label>
                        <input 
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirma tu contraseña"
                            value={confirmPassword}
                            onChange={onchange}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block"
                            value="Crear Cuenta" 
                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Ingresar 
                </Link>
            </div>
        </div>
     );
}
 
export default NewAccount;