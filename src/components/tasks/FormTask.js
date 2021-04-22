import React, { useState, useContext, useEffect } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const FormTask = () => {

    // Extraer si un proyecto esta activo
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    // Extraemos las tareas del proyecto
    const tasksContext = useContext(taskContext);
    const { errorTask, formTask, currentTask, createProjectTask, getProjectTasks, validateTask, showFormTask , clearTask, updateTask} = tasksContext;

    // Effect que detecta si el usuario quiere editar una tarea 
    useEffect(() => {
        if(currentTask !== null){
            setTask(currentTask)
        } else {
            setTask({
                taskName: ''
            })
        }
    }, [currentTask])

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

    // Agregamos una nueva tarea al proyecto actual 
    const onSubmitTask = e => {
        e.preventDefault();

        // Validar formulario
        if(taskName === ''){
            validateTask(); 
            return;
        }; 

        if(currentTask === null){
            createProjectTask(projectSelected.id, taskName); // Agregar tarea al state general
            getProjectTasks(projectSelected.id); // Filtrar y mostrar tareas
        } else {
            updateTask(task);
            getProjectTasks(projectSelected.id); // Filtrar y mostrar tareas
        }

        //Reiniciar formurio
        setTask({
            taskName: ''
        });
        showFormTask(false);
        clearTask();
    }

    // Ocultar formulario de tarea
    const hideForm = () => {
        showFormTask(false); 
        clearTask(); // Limpiar tarea actual
        //Reiniciar formurio
        setTask({
            taskName: ''
        });
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
                                    value={currentTask ? "Editar Tarea" : "Agregar Tarea"}
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