import { 
    PROJECT_TASKS,
    CREATE_TASK,
    VALIDATE_TASK,
    FORM_TASK,
    DESTROY_TASK,
    STATUS_TASK,
    CURRENT_TASK,
    UPDATE_TASK,
    CLEAR_TASK
} from '../../types/index';

// eslint-disable-next-line
export default (state, action) => {
    switch(action.type) {
        case PROJECT_TASKS:
            return {
                ...state,
                projectTasks: action.payload,
            };
        case CREATE_TASK:
            return {
                ...state,
                projectTasks: [action.payload, ...state.projectTasks],
                errorTask: false,
            };
        case VALIDATE_TASK:
            return {
                ...state,
                errorTask: true,
            };
        case FORM_TASK: 
            return {
                ...state,
                formTask: action.payload,
            };
        case DESTROY_TASK:
            return {
                ...state,
                projectTasks: state.projectTasks.filter(task => task._id !== action.payload)
            };
        case UPDATE_TASK:
        case STATUS_TASK:
            return {
                ...state,
                projectTasks: state.projectTasks.map(task => task._id === action.payload._id 
                    ? action.payload
                    : task ),
                currentTask: null
            };
        case CURRENT_TASK:
            return {
                ...state, 
                currentTask: action.payload
            };
        case CLEAR_TASK:
            return {
                ...state,
                currentTask: null
            }
        default: 
            return state;
    }
}