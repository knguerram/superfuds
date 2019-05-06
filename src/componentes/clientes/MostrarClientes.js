import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const MostrarClientes = ({clientes}) => {
    if(!clientes) return <Spinner />

    return ( 
        <div className="row">
            <div className="col-md-6 mb-4">
                <Link to="/clientes" className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i> {''}
                    Volver al Listado
                </Link> 
            </div>
            <div className="col-md-6">
                <Link to={`/clientes/editar/${clientes.id}`} className="btn btn-primary float-right">
                    <i className="fas fa-pencil-alt"></i> {''}
                    Editar Cliente
                </Link>
            </div>

            <hr className="mx-5 w-100"/>

            <div className="col-12">
                <h2 className="mb-4">
                    {clientes.nombre} {clientes.apellido}
                </h2>

                <p>
                    <span className="font-weight-bold">
                        Documento:
                    </span> {''}
                    {clientes.documento}
                </p>
            </div>
            

        </div>
    );
}

MostrarClientes.propTypes = {
    firestore : PropTypes.object.isRequired
}
 
export default compose(
    firestoreConnect(props => [
        {
            collection : 'clientes',
            storeAs : 'clientes',
            doc : props.match.params.id
        }
    ]), 
    connect(({ firestore: { ordered }}, props ) => ({
        clientes : ordered.clientes && ordered.clientes[0]
    }))
)(MostrarClientes)