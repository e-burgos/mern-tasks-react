import React from 'react';

const Task = ({task}) => {
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
                    className="btn btn-primario rb-5"
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario rb-5"
                >Eliminar</button>
            </div>
        </li>
     );
}
 
export default Task;