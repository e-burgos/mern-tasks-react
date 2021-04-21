import React, { useContext } from 'react'
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const ItemProject = ({project}) => {

    // Obtener proyecto actual
    const projectsContext = useContext(projectContext);
    const { getCurrentProject } = projectsContext;

    // Obtener las tareas del proyecto
    const tasksContext = useContext(taskContext);
    const { getProjectTasks } = tasksContext;

    // Obtener proyecto actual al hacer click en un proyecto del listado
    const getProject = () => {
        getProjectTasks(project.id)
        getCurrentProject(project.id)
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={getProject} 
            >{project.projectName}</button>
        </li>
     );
}
 
export default ItemProject;