import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import {v4 as uuid} from 'uuid';
import { 
    PROJECT_FORM, 
    GET_PROJECTS,
    CREATE_PROJECT,
    VALIDATE_ERROR 
} from '../../types/index';


const ProjectState = props => {
    
    const projects = [
            {id: 1, projectName: 'Tienda virtual'},
            {id: 2, projectName: 'Dashboards'},
            {id: 3, projectName: 'Bufus'},
        ];
    
    const initialState = {
        projects: [],
        projectForm: false,
        errorForm: false
    }; 

    // Dispatch para ejecutar las acciones 
    const [state, dispatch] = useReducer(projectReducer, initialState);

    //******** Serie de funciones para el CRUD del proyecto ********//
    
    // Mostrar/Ocultar formulario de nuevo proyecto 
    const showProjectForm = (condition) => {
        dispatch({
            type: PROJECT_FORM,
            payload: condition
        })
    }

    // Obtener proyectos
    const getProjects = () => {
        dispatch({
            type: GET_PROJECTS,
            payload: projects
        })
    }

    // Agregar un nuevo proyecto
    const createProject = project => {
        project.id = uuid();

        // Agregamos el proyecto al listado de proyectos
        dispatch({
            type: CREATE_PROJECT,
            payload: project
        })
    }

    // Validar errores en el formulario
    const showErrorForm = () => {
        dispatch({
            type: VALIDATE_ERROR,
        })
    }

    return(
        <projectContext.Provider
            value={{
                projects: state.projects,
                projectForm: state.projectForm,
                errorForm: state.errorForm,
                showProjectForm,
                getProjects,
                createProject,
                showErrorForm
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
};

export default ProjectState;