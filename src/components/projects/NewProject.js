import React, { Fragment, useState } from 'react'

const NewProject = () => {

    // State para proyecto
    const [project, setProject] = useState({
        projectName: '',
    });

    // Extraer nombre de proyecto
    const { projectName } = project;

    // Leer lo que el usuario escribe
    const onChangeProject = e => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        });
    };

    // Cuando el usuario desea agregar un nuevo proyecto
    const onSubmitProject = e => {
        e.preventDefault();

        // Validar que el campo no este vacio

        // Agregar al state
        
        // Reiniciar el fomulario

    }

    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
            >Nuevo Proyecto</button>
            <form 
                className="formulario-nuevo-proyecto"
                onSubmit={onSubmitProject}
            >
                <input 
                    type="text"
                    className="input-text"
                    placeholder="Nombre del proyecto"
                    name="projectName"
                    value={projectName}
                    onChange={onChangeProject}
                />
                <input 
                    type="submit"
                    className="btn btn-block btn-primario"
                    value="Agregar"
                />
            </form>
        </Fragment>
     );
}
 
export default NewProject;