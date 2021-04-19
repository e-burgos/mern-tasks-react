import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    // State para iniciar sesion 
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

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

        // Pasarlos al action

    }

    return ( 
        <div className="form-usuario">
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