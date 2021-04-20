import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { PROJECT_FORM } from '../../types/index';

const ProjectState = props => {
    const initialState = {
        projectForm: false
    }; 

    // Dispatch para ejecutar las acciones 
    const [state, dispatch] = useReducer(projectReducer, initialState);

    //******** Serie de funciones para el CRUD del proyecto ********//
    
    // Mostrar/Ocultar formulario de nuevo proyecto 
    const showProjectForm = () => {
        dispatch({
            type: PROJECT_FORM
        })
    }

    return(
        <projectContext.Provider
            value={{
                projectForm: state.projectForm,
                showProjectForm
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
};

export default ProjectState;