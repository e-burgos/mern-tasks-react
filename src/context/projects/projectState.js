import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import axiosClient from '../../config/axios';
import { 
    PROJECT_FORM, 
    GET_PROJECTS,
    CREATE_PROJECT,
    VALIDATE_ERROR,
    CURRENT_PROJECT,
    DESTROY_PROJECT 
} from '../../types/index';


const ProjectState = props => {
    
    // const projects = [
    //         {id: 1, projectName: 'Tienda virtual'},
    //         {id: 2, projectName: 'Dashboards'},
    //         {id: 3, projectName: 'Bufus'},
    //     ];
    
    const initialState = {
        projects: [],
        projectForm: false,
        errorForm: false,
        project: null
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
    const getProjects = async () => {
        try {
            const response = await axiosClient.get('/api/projects')
            dispatch({
                type: GET_PROJECTS,
                payload: response.data.projects
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Agregar un nuevo proyecto
    const createProject = async (data) => {
        try {
            // Agregamos el proyecto al listado de proyectos
            const response = await axiosClient.post('/api/projects', data)
            dispatch({
                type: CREATE_PROJECT,
                payload: response.data.project
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    // Validar errores en el formulario
    const showErrorForm = () => {
        dispatch({
            type: VALIDATE_ERROR,
        })
    }

    // Obtener el proyecto actual o seleccionado 
    const getCurrentProject = projectId => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: projectId
        })
    }

    // Eliminar un proyecto 
    const destroyProject = async (projectId) => {
        try {
            await axiosClient.delete(`/api/projects/${projectId}`)
            dispatch({
                type: DESTROY_PROJECT,
                payload: projectId
            });
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <projectContext.Provider
            value={{
                projects: state.projects,
                projectForm: state.projectForm,
                errorForm: state.errorForm,
                project: state.project,
                showProjectForm,
                getProjects,
                createProject,
                showErrorForm,
                getCurrentProject,
                destroyProject,
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
};

export default ProjectState;