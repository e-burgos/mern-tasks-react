import React, {useContext, useEffect} from 'react';
import taskContext from '../../context/tasks/taskContext';
import projectContext from '../../context/projects/projectContext';

const Task = ({task}) => {

    // Obtener funciones del context de tarea
    const tasksContext = useContext(taskContext);
    const { destroyTask, getProjectTasks, changeStatusTask, showFormTask, selectTask } = tasksContext;

    // Extraer el state proyecto si esta activo
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    // Aplicar Array destrcturing para extrar el proyecto actual
    const [currentProject] = project;

    // Eliminar una tarea
    const onClickDestroy = () => {
        destroyTask(task._id, currentProject._id);
        getProjectTasks(currentProject._id);
    };

    // Cambiar estado de la tarea
    const changeStatus = task => {
        if(task.status) {
            task.status = false;
        } else {
            task.status = true;
        }
        changeStatusTask(task);
    };

    // Seleccionar una tarea para ser actualizada 
    const selectUpdateTask = (task) => {
        showFormTask(true);
        selectTask(task);
    };

    return ( 
        <li className="tarea sombra">
            <p>{task.taskName}</p>
            <div className="estado">
                {task.status
                    ? (<button 
                            type="button" 
                            className="completo"
                            onClick={() => changeStatus(task)}
                        >Completo</button>)
                    : (<button 
                            type="button" 
                            className="incompleto"
                            onClick={() => changeStatus(task)}
                        >Incompleto</button>)
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario br-5"
                    onClick={() => selectUpdateTask(task)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario br-5"
                    onClick={onClickDestroy}
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Task;