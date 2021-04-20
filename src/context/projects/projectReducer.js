import { 
    PROJECT_FORM,
    GET_PROJECTS,
    CREATE_PROJECT,
    VALIDATE_ERROR,
    } from '../../types/index';

// eslint-disable-next-line
export default (state, action) => {
    switch(action.type) {
        case PROJECT_FORM:
            return {
                ...state,
                projectForm: action.payload
            }
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        case CREATE_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                errorForm: false
            }
        case VALIDATE_ERROR:
            return {
                ...state,
                errorForm: true
            }
        default:
            return state;
    }
}