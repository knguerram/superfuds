import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class NuevoClientes extends Component {
    state = { 
        nombre: '',
        apellido: '',
        documento : ''
    }

    // Agrega un nuevo cliente a la base de datos
    agregarClientes = e => {
        e.preventDefault();

        // extraer los valores del state
        const nuevoClientes = this.state;

        // extraer firestore  de props
        const { firestore, history } = this.props

        //Guardarlo en la base de datos
        firestore.add({ collection : 'clientes' }, nuevoClientes)
            .then(() => history.push('/clientes') )
    }

    // extrae los valores del input y los coloca en el state
    leerDato = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() { 
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
                        <i className="fas fa-user-plus"></i> {''}
                        Nuevo Cliente
                    </h2>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form
                                onSubmit={this.agregarClientes}
                            >
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        placeholder="Nombre del cliente"
                                        required
                                        onChange={this.leerDato}
                                        value={this.state.nombre}
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
                                        onChange={this.leerDato}
                                        value={this.state.apellido}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Documento:</label>
                                    <input 
                                        type="number"
                                        min="0"
                                        max="1000000000000000" 
                                        className="form-control"
                                        name="documento"
                                        placeholder="Documento del cliente"
                                        required
                                        onChange={this.leerDato}
                                        value={this.state.documento}
                                    />
                                </div>

                                <input 
                                    type="submit"
                                    value="Agregar cliente"
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

NuevoClientes.propTypes = {
    firestore : PropTypes.object.isRequired
}
 
export default firestoreConnect()( NuevoClientes );