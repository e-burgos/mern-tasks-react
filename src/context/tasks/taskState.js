import React, { useReducer} from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import axiosClient from '../../config/axios';
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

const TaskState = (props) => {
    
    // Definir state inicial
    const initialState = {
        projectTasks: [],
        errorTask: false,
        formTask: false,
        currentTask: null,
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(TaskReducer, initialState);

    //******** Serie de funciones para el CRUD de tareas ********//
    
    // Filtrar las tareas del proyecto seleccionado 
    const getProjectTasks = async projectId => {
        try {
            const response = await axiosClient.get('/api/tasks', { params: {projectId} });
        dispatch({
                type: PROJECT_TASKS,
                payload: response.data.tasks
            });
        } catch (error) {
            console.log(error);
        };
    };

    // Agregar una tarea al proyecto actual  
    const createProjectTask = async (projectId, taskName) => {
        try {
            const response = await axiosClient.post('/api/tasks', {projectId, taskName});
            dispatch({
                type: CREATE_TASK,
                payload: response.data.task
            }) 
        } catch (error) {
            console.log(error.response.data.errors)
        }
    };
    
    // Validar errores 
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK,
        });
    };

    // Ocultar/Mostrar formulario de tareas
    const showFormTask = condition => {
        dispatch({
            type: FORM_TASK,
            payload: condition
        });
    };

    // Eliminar tarea
    const destroyTask = async (taskId, projectId) => {
        try {
            const response = await axiosClient.delete(`/api/tasks/${taskId}`, {params: {projectId}})
            //console.log(response)
            dispatch({
                type: DESTROY_TASK, 
                payload: taskId
            })
        } catch (error) {
            console.log(error.response.data)
        };
    };

    // Cambiar estado de la tarea 
    const changeStatusTask = async task => {
        try {
            const response = await axiosClient.put(`/api/tasks/${task._id}`, task);
            //console.log(response)
            dispatch({
                type: STATUS_TASK,
                payload: response.data.task
            });
        } catch (error) {
            console.log(error.response.data)
        };
    };

    // Agregar tarea seleccionada para actualizarla
    const selectTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        });
    };

    // Actualizar la tarea seleccionada
    const updateTask = async task => {
        try {
            const response = await axiosClient.put(`/api/tasks/${task._id}`, task);
            //console.log(response)
            dispatch({
                type: UPDATE_TASK,
                payload: response.data.task
            });
        } catch (error) {
            console.log(error.response.data)
        };
    };

    // Limpiar tarea actual o seleccionada 
    const clearTask = () => {
        dispatch({
            type: CLEAR_TASK
        });
    };

    
    return ( 
        <TaskContext.Provider
            value={{
                projectTasks: state.projectTasks,
                errorTask: state.errorTask,
                formTask: state.formTask,
                currentTask: state.currentTask,
                getProjectTasks,
                createProjectTask,
                validateTask,
                showFormTask,
                destroyTask,
                changeStatusTask,
                selectTask,
                updateTask,
                clearTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
     );
}
 
export default TaskState;