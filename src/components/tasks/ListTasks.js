import React, { Fragment, useContext } from 'react'
import Task from './Task';
import projectContext from '../../context/projects/projectContext';

const ListTasks = () => {

    const tasks = [
        {id: 1, taskName: "Agregar componentes", status: true},
        {id: 2, taskName: "Eliminar componentes", status: false},
        {id: 3, taskName: "editar componentes", status: true},
        {id: 4, taskName: "Bloquear componentes", status: false},
    ]

    // Extraer si un proyecto esta activo
    const projectsContext = useContext(projectContext);
    const { project, destroyProject } = projectsContext;

    // Verificamos si no hay proyecto seleccionado 
    if(!project) return <h2>Seleccione un proyecto</h2>

    // Aplicamos array destructuring para extraer el proyecto
    const [ currentProject ] = project;

    // Eliminar el proyecto actual 
    const destroyCurrentProject = () => {
        destroyProject(currentProject.id)
    }

    return ( 
        <Fragment>
            <h2>Proyecto: {currentProject.projectName}</h2>
            <ul className="listado-tareas">
                {tasks.length === 0 
                    ? (<li className="tarea"><p>Aún no hay tareas</p></li>)
                    : tasks.map( task => (
                        <Task
                            key={task.id} 
                            task={task}
                        />
                    ))
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