import { 
    PROJECT_FORM,
    GET_PROJECTS,
    CREATE_PROJECT,
    VALIDATE_ERROR,
    CURRENT_PROJECT,
    DESTROY_PROJECT,
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
                projects: [action.payload, ...state.projects],
                errorForm: false
            }
        case VALIDATE_ERROR:
            return {
                ...state,
                errorForm: true
            }
        case CURRENT_PROJECT:
            return {
                ...state,
                project: state.projects.filter(project => project._id === action.payload)
            }
        case DESTROY_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                project: null
            }
        default:
            return state;
    }
}