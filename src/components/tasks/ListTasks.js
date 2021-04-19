import React, { Fragment } from 'react'
import Task from './Task';

const ListTasks = () => {

    const tasks = [
        {taskName: "Agregar componentes", status: true},
        {taskName: "Eliminar componentes", status: false},
        {taskName: "editar componentes", status: true},
        {taskName: "Bloquear componentes", status: false},
    ]

    return ( 
        <Fragment>
            <h2>Proyecto: Bufus</h2>
            <ul className="listado-tareas">
                {tasks.length === 0 
                    ? (<li className="tarea"><p>Aún no hay tareas</p></li>)
                    : tasks.map( task => (
                        <Task 
                            task={task}
                        />
                    ))
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
            >&times; Eliminar Proyecto</button>
        </Fragment>
     );
}
 
export default ListTasks