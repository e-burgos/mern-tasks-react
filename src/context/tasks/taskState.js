import React, { useReducer} from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import { PROJECT_TASKS } from '../../types/index';

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
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(TaskReducer, initialState);

    //******** Serie de funciones para el CRUD de tareas ********//
    
    // Filtrar las tareas del proyecto seleccionado 
    const getProjectTasks = (projectId) => {
        dispatch({
            type: PROJECT_TASKS,
            payload: projectId
        })
    }
    
    return ( 
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                projectTasks: state.projectTasks,
                getProjectTasks
            }}
        >
            {props.children}
        </TaskContext.Provider>
     );
}
 
export default TaskState;