import React from 'react'

const ItemProject = ({project}) => {
    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank" 
            >{project.projectName}</button>
        </li>
     );
}
 
export default ItemProject;