import React, { Fragment } from 'react'
import Task from './Task';

const ListTasks = () => {

    const tasks = [
        {id: 1, taskName: "Agregar componentes", status: true},
        {id: 2, taskName: "Eliminar componentes", status: false},
        {id: 3, taskName: "editar componentes", status: true},
        {id: 4, taskName: "Bloquear componentes", status: false},
    ]

    return ( 
        <Fragment>
            <h2>Proyecto: Bufus</h2>
            <ul className="listado-tareas">
                {tasks.length === 0 
                    ? (<li className="tarea"><p>Aún no hay tareas</p></li>)
                    : tasks.map( task => (
                        <Task
                            key={task.id} 
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