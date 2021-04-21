import React, { Fragment, useContext } from 'react'
import Task from './Task';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const ListTasks = () => {

    // Extraer si un proyecto esta activo
    const projectsContext = useContext(projectContext);
    const { project, destroyProject } = projectsContext;

    // Extraemos las tareas del proyecto
    const tasksContext = useContext(taskContext);
    const { projectTasks } = tasksContext;

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
                {projectTasks === null 
                    ? (<li className="tarea"><p>Aún no hay tareas</p></li>)
                    : projectTasks.map( task => (
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