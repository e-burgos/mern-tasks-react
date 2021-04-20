import React, { Fragment, useState, useContext } from 'react'
import projectContext from '../../context/projects/projectContext';

const NewProject = () => {

    // Obtener el state del formulario 
    const projectsContext = useContext(projectContext);
    const { projectForm, errorForm, showProjectForm, createProject, showErrorForm  } = projectsContext;

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

    // Mostrar formulario
    const showForm = () => {
        showProjectForm(true);
    }

    // Ocultar formulario
    const hideForm = () => {
        showProjectForm(false);
    }

    // Cuando el usuario desea agregar un nuevo proyecto
    const onSubmitProject = e => {
        e.preventDefault();

        // Validar que el campo no este vacio
        showErrorForm();
        if(projectName === '') return;

        // Agregar al state
        createProject(project);

        // Reiniciar el fomulario
        setProject({
            projectName: '',
        });
        showProjectForm(false);
    }

    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={showForm}
            >Nuevo Proyecto</button>
            {projectForm 
                ?(<form 
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
                    <input 
                        type="button"
                        className="btn btn-block btn-secundario"
                        value="Ocultar"
                        onClick={hideForm}
                    />
                </form>)
                : null 
            }
            {errorForm ? (<p className="mensaje error">El nombre del proyecto es requerido</p>) : null}
        </Fragment>
     );
}
 
export default NewProject;