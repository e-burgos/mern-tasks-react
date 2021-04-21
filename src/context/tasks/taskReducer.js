import { 
    PROJECT_TASKS,
    CREATE_TASK,
    VALIDATE_TASK,
    FORM_TASK,
    DESTROY_TASK,
    STATUS_TASK
} from '../../types/index';

// eslint-disable-next-line
export default (state, action) => {
    switch(action.type) {
        case PROJECT_TASKS:
            return {
                ...state,
                projectTasks: state.tasks.filter( task => task.projectId === action.payload),
            };
        case CREATE_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
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
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };
        case STATUS_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task.id !== action.payload.id 
                    ? action.payload
                    : task )

            }
        default: 
            return state;
    }
}