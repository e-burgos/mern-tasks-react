import React, { useReducer} from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import {v4 as uuid} from 'uuid';
import { 
    PROJECT_TASKS, 
    CREATE_TASK,
    VALIDATE_TASK,
    FORM_TASK,
    DESTROY_TASK,
    STATUS_TASK,
 } from '../../types/index';

const TaskState = (props) => {
    
    // Definir state inicial
    const initialState = {
        tasks: [
            {id: 1, taskName: "Agregar componentes", status: true, projectId: 1},
            {id: 2, taskName: "Eliminar componentes", status: false, projectId: 1},
            {id: 3, taskName: "editar componentes", status: true, projectId: 2},
            {id: 4, taskName: "Bloquear componentes", status: false, projectId: 3},
        ],
        projectTasks: null,
        errorTask: false,
        formTask: false,
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(TaskReducer, initialState);

    //******** Serie de funciones para el CRUD de tareas ********//
    
    // Filtrar las tareas del proyecto seleccionado 
    const getProjectTasks = projectId => {
        dispatch({
            type: PROJECT_TASKS,
            payload: projectId
        })
    };

    // Agregar una tarea al proyecto actual  
    const createProjectTask = (projectId, taskName) => {
        const task = {
            id: uuid(),
            taskName: taskName,
            status: false,
            projectId: projectId
        }
        dispatch({
            type: CREATE_TASK,
            payload: task
        })
    };
    
    // Validar errores 
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK,
        })
    };

    // Ocultar/Mostrar formulario de tareas
    const showFormTask = condition => {
        dispatch({
            type: FORM_TASK,
            payload: condition
        })
    };

    // Eliminar tarea
    const destroyTask = taskId => {
        dispatch({
            type: DESTROY_TASK, 
            payload: taskId
        })
    }

    // Cambiar estado de la tarea 
    const changeStatusTask = task => {
        dispatch({
            type: STATUS_TASK,
            payload: task
        })
    }

    
    return ( 
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                projectTasks: state.projectTasks,
                errorTask: state.errorTask,
                formTask: state.formTask,
                getProjectTasks,
                createProjectTask,
                validateTask,
                showFormTask,
                destroyTask,
                changeStatusTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
     );
}
 
export default TaskState;