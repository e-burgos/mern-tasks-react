import React from 'react'
import ItemProject from './ItemProject'

const ListProjects = () => {

    const projects = [
        {projectName: 'Tienda virtual'},
        {projectName: 'Dashboards'},
        {projectName: 'Bufus'},
    ];

    return ( 
        <ul className="listado-proyectos">
            {projects.map( project => (
                    <ItemProject 
                    project={project}
                />
            ))}
        </ul>
     );
}
 
export default ListProjects;