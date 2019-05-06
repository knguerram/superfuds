import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

class EditarClientes extends Component {

    // crear los refs
    nombreInput = React.createRef();
    apellidoInput = React.createRef();
    documentoInput = React.createRef();

    // Edita los clientes  en la base de datos
    editarClientes = e => {
        e.preventDefault();

        // crear el objeto que va a actualizar
        const clientesActualizado = {
            nombre : this.nombreInput.current.value,
            apellido : this.apellidoInput.current.value,
            documento : this.documentoInput.current.value,
        }
        // extraer firestore, y history de props
        const { clientes, firestore, history } = this.props;
        
        // almacenar en la base de datos con firestore
        firestore.update({
            collection: 'clientes',
            doc: clientes.id
        }, clientesActualizado ).then(history.push('/clientes'));

    }


    render() { 

        const { clientes } = this.props;

        if(!clientes) return <Spinner />

        return ( 
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={'/clientes'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> {''}
                        Volver al Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-user"></i> {''}
                        Editar Cliente
                    </h2>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form
                                onSubmit={this.editarClientes}
                            >
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        placeholder="Nombre del cliente"
                                        required
                                        ref={this.nombreInput}
                                        defaultValue={clientes.nombre}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Apellido:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="apellido"
                                        placeholder="Apellido del cliente"
                                        required
                                        ref={this.apellidoInput}
                                        defaultValue={clientes.apellido}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Documento:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="documento"
                                        placeholder="Documento del cliente"
                                        required
                                        ref={this.documentoInput}
                                        defaultValue={clientes.documento}
                                    />
                                </div>

                                <input 
                                    type="submit"
                                    value="Editar cliente"
                                    className="btn btn-success"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EditarClientes.propTypes = {
    firestore: PropTypes.object.isRequired
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
)(EditarClientes)