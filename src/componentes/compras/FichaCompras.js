import React from 'react';

const FichaClientes = ({ clientes }) => {
    return ( 
        <div className="card my-3">
            <h3 className="card-header bg-primary text-white">Datos Solicitante</h3>

            <div className="card-body">
                <p className="font-weight-bold">Nombre: {''}
                    <span className="font-weight-normal">{clientes.nombre}</span>
                </p>
                <p className="font-weight-bold">Documento: {''}
                    <span className="font-weight-normal">{clientes.documento}</span>
                </p>
            </div>
        </div>
     );
}
 
export default FichaClientes;