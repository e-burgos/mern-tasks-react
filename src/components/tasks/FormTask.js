import React, { useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const FormTask = () => {

    // Extraer si un proyecto esta activo
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    // Extraemos las tareas del proyecto
    const tasksContext = useContext(taskContext);
    const { errorTask, formTask, createProjectTask, getProjectTasks, validateTask, showFormTask } = tasksContext;

    // state de tarea 
    const [task, setTask] = useState({
        taskName: ''
    })

    // Verificamos si no hay proyecto seleccionado 
    if(!project) return null;

    // Aplicamos array destructuring para extraer el proyecto
    const [ projectSelected ] = project;


    // Extraemos campos de la tarea 
    const { taskName } = task;

    // Leermos formulario para agregar tarea
    const onChange = e => {
        setTask({
            ...task, 
            [e.target.name]: e.target.value
        })
    }

    // agregamos una nueva tarea al proyecto actual 
    const onSubmitTask = e => {
        e.preventDefault();

        // Validar formulario
        if(taskName === ''){
            validateTask(); 
            return;
        }; 
        
        // Agregar tarea al state general
        createProjectTask(projectSelected.id, taskName);

        // Filtar y mostrar tareas
        getProjectTasks(projectSelected.id);

        //Reiniciar formurio
        setTask({
            taskName: ''
        });
        showFormTask(false);
    }

    const hideForm = () => {
        showFormTask(false)
    }


    return ( 
        <div>
            {formTask ? 
                (<div className="formulario">
                    <form
                        onSubmit={onSubmitTask}
                    >
                        <div className="contenedor-input">
                            <input 
                                type="text"
                                className="input-text"
                                placeholder="Nombre de la tarea..."
                                name="taskName"
                                value={taskName}
                                onChange={onChange}
                            />
                        </div>
                        <div className="row">
                            <div className="contenedor-input w-50 mr-1">
                                <input 
                                    type="submit"
                                    className="btn btn-block btn-primario btn-submit"
                                    value="Agregar Tareas"
                                />
                            </div>
                            <div className="contenedor-input w-50 ml-1">
                                <input 
                                    type="button"
                                    className="btn btn-block btn-secundario"
                                    value="Ocultar"
                                    onClick={hideForm} 
                                />
                            </div>
                        </div>
                    </form>
                    {errorTask ? (<p className="mensaje error">El nombre de la tarea es requerido</p>) : null}
                </div>) : null}

        </div>
     );
}
 
export default FormTask;