import React, { useContext, useEffect } from 'react';
import ItemProject from './ItemProject';
import projectContext from '../../context/projects/projectContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ListProjects = () => {

    // Obtener proyectos del state inicial
    const projectsContext = useContext(projectContext);
    const { projects, getProjects } = projectsContext;

    // Obtener proyectos luego de cargar el componenete
    useEffect(() => {
        getProjects();
    },[])

    // Validar si no hay proyectos
    if(projects.length === 0) return <p className="text-center">No hay proyectos, comienza creando uno.</p>;

    return ( 
        <ul className="listado-proyectos">
            <TransitionGroup>
                {projects.map( project => (
                    <CSSTransition
                        key={project.id}
                        timeout={300}
                        classNames="proyecto"
                    >
                        <ItemProject
                            project={project}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ListProjects;