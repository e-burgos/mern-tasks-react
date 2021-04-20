import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';

const ProjectState = props => {
    const initialState = {
        newProjectForm: false
    }; 

    // Dispatch para ejecutar las acciones 
    const [state, dispatch] = useReducer(projectReducer, initialState);

    // Serie de funciones para el CRUD del proyecto


    return(
        <projectContext.Provider
            value={{
                newProjectForm: state.newProjectForm
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
};

export default ProjectState;