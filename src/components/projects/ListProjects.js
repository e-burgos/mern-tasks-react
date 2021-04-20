import React, { useContext, useEffect } from 'react';
import ItemProject from './ItemProject';
import projectContext from '../../context/projects/projectContext';

const ListProjects = () => {

    // Obtener proyectos del state inicial
    const projectsContext = useContext(projectContext);
    const { projects, getProjects } = projectsContext;

    // Obtener proyectos luego de cargar el componenete
    useEffect(() => {
        getProjects();
    },[])

    // Validar si no hay proyectos
    if(projects.length === 0) return null;

    return ( 
        <ul className="listado-proyectos">
            {projects.map( project => (
                    <ItemProject
                    key={project.id}
                    project={project}
                />
            ))}
        </ul>
     );
}
 
export default ListProjects;