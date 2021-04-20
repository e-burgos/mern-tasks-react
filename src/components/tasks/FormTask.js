import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';

const FormTask = () => {

    // Extraer si un proyecto esta activo
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    // Verificamos si no hay proyecto seleccionado 
    if(!project) return null;

    // Aplicamos array destructuring para extraer el proyecto
    const [ projectSelected ] = project;

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