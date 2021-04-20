import React, { useContext } from 'react'
import projectContext from '../../context/projects/projectContext';

const ItemProject = ({project}) => {

    // Obtener proyectos 
    const projectsContext = useContext(projectContext);
    const { getCurrentProject } = projectsContext;

    // Obtener proyecto actual al hacer click en un proyecto del listado
    const getProject = () => {
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