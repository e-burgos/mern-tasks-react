import React, {useContext, useEffect} from 'react';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import FormTask from '../tasks/FormTask';
import ListTasks from '../tasks/ListTasks';
import AuthContext from '../../context/auth/authContext';

const Projects = () => {

    // Mantemenos el context de autetificacion
    const authContext = useContext(AuthContext);
    const { authUser } = authContext;
    
    useEffect(() => {
        authUser();
    }, [])

    return ( 
        <div className="contenedor-app">
            <Sidebar />
            <div className="seccion-principal">
                <Header />
                <main>
                    <FormTask />  
                    <div className="contenedor-tareas">
                        <ListTasks />
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Projects;