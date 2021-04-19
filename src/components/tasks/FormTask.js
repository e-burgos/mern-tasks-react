import React from 'react';

const FormTask = () => {
    return ( 
        <div className="formulario">
            <form>
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre de la tarea..."
                        name="taskName"
                    />
                </div>
                 <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-block btn-primario btn-submit"
                        value="Agregar Tareas"
                    />
                </div>
            </form>
        </div>
     );
}
 
export default FormTask;