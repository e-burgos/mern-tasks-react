import React, {useContext} from 'react';
import taskContext from '../../context/tasks/taskContext';
import projectContext from '../../context/projects/projectContext';


const Task = ({task}) => {

    // Obtener funciones del context de tarea
    const tasksContext = useContext(taskContext);
    const { destroyTask, getProjectTasks } = tasksContext;

    // Extraer el proyecto esta activo
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    const [currentProject] = project;

    const onClickDestroy = () => {
        destroyTask(task.id);
        getProjectTasks(currentProject.id);
    };

    return ( 
        <li className="tarea sombra">
            <p>{task.taskName}</p>
            <div className="estado">
                {task.status
                    ? (<button 
                            type="button" 
                            className="completo"
                        >Completo</button>)
                    : (<button 
                            type="button" 
                            className="incompleto"
                        >Incompleto</button>)
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario br-5"
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