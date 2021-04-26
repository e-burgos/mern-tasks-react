import React, { Fragment, useContext, useEffect } from 'react'
import Task from './Task';
import projectContext from '../../context/projects/projectContext';
import alertContext from '../../context/alerts/alertContext';
import taskContext from '../../context/tasks/taskContext';
import AuthContext from '../../context/auth/authContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ListTasks = () => {

    // Mantemenos el context de autetificacion
    const authContext = useContext(AuthContext);
    const { authUser } = authContext;
    
    useEffect(() => {
        authUser();
    }, [])

    // Extraer el proyecto esta activo
    const projectsContext = useContext(projectContext);
    const { project, destroyProject } = projectsContext;

    // Extraemos las tareas del proyecto
    const tasksContext = useContext(taskContext);
    const { projectTasks, formTask, showFormTask } = tasksContext;

    // Extraer valores del context de alertas
    const alertsContext = useContext(alertContext);
    const {alert, showAlert} = alertsContext;

    // Verificamos si no hay proyecto seleccionado 
    if(!project) return <h2>Seleccione un proyecto</h2>

    // Aplicamos array destructuring para extraer el proyecto
    const [ currentProject ] = project;

    // Eliminar el proyecto actual 
    const destroyCurrentProject = () => {
        destroyProject(currentProject._id);
        showAlert('Proyecto eiminado correctamente', 'alerta-ok');
    };

    // Mostrar formulario para agregar tareas
    const showForm = () => {
        showFormTask(true)
    };

    return ( 
        <Fragment>
            { alert ? <div className={`alerta ${alert.category}`}>{alert.msg}</div> : null }
            <div className="titulo-proyecto">
                <h2 className="m-0">Proyecto: {currentProject.projectName}</h2>
                {!formTask ? 
                    (<input 
                        type="button"
                        className="mostrar-tareas"
                        value="Agregar Tarea"
                        onClick={showForm}
                    />) : null}
            </div>
            <ul className="listado-tareas">
                {projectTasks.length === 0
                    ? (<li className="tarea"><p>Aún no hay tareas</p></li>)
                    :   <TransitionGroup>
                            {projectTasks.map( task => (
                                <CSSTransition
                                    key={task._id}
                                    timeout={200}
                                    classNames="tarea" 
                                >
                                    <Task
                                        task={task}
                                    />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={destroyCurrentProject}
            >&times; Eliminar Proyecto</button>
        </Fragment>
     );
}
 
export default ListTasks