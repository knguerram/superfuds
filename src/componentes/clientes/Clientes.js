import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const Clientes = ({clientes, firestore}) => {

    if(!clientes) return <Spinner />;

    // Eliminar clientes
    const eliminarClientes = id => {
        // eliminar
        firestore.delete({
            collection : 'clientes', 
            doc : id
        });
    }

    return ( 
        <div className="row">
            <div className="col-md-12 mb-4">
                <Link
                    to="/clientes/nuevo"
                    className="btn btn-primary"
                >
                    <i className="fas fa-plus"></i> {''}
                    Nuevo Cliente
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-users"></i> Clientes
                </h2>
            </div>

            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Nombre</th>
                        <th>Documento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {clientes.map(clientes => (
                        <tr key={clientes.id}>
                            <td>{clientes.nombre} {clientes.apellido}</td>
                            <td>{clientes.documento}</td>
                            <td>
                                <Link
                                    to={`/clientes/mostrar/${clientes.id}`}
                                    className="btn btn-success btn-block"
                                >
                                    <i className="fas fa-angle-double-right"></i> {''}
                                    Más Información
                                
                                </Link>

                                <button
                                    type="button"
                                    className="btn btn-danger btn-block"
                                    onClick={ () => eliminarClientes(clientes.id) }
                                >
                                    <i className="fas fa-trash-alt"></i> {''}
                                    Eliminar

                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
     );
}
Clientes.propTypes = {
    firestore : PropTypes.object.isRequired,
    clientes : PropTypes.array
}

 
export default compose(
    firestoreConnect([{ collection : 'clientes' }]),
    connect((state, props) => ({
        clientes : state.firestore.ordered.clientes
    }))
)(Clientes);