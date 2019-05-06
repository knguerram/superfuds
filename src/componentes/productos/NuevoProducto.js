import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class NuevoProducto extends Component {
    state = { 
        Producto: '',
        numero: '',
        fecha: '',
        precio: '',
        existencia : ''
     }

     // guardar el producto en la base de datos
     agregarProducto = e => {
         e.preventDefault();

         // tomar una copia del state
        const nuevoProducto = this.state;

        // agregar un arreglo de interesados.
        nuevoProducto.facturar = [];

         // extraer firestore con sus métodos
         const { firestore, history } = this.props;
          
         // añadirlo a la base de datos y redireccionar
         firestore.add({collection: 'productos'}, nuevoProducto)
            .then(() => history.push('/'))
     }

     // almacena lo que el usuario escribe en el state
     leerDato = e => {
         this.setState({
             [e.target.name] : e.target.value
         })
     }


    render() { 
        return ( 
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to="/" className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> {''}
                        Volver al Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        Nuevo Producto
                    </h2>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form
                                onSubmit={this.agregarProducto}
                            >
                                <div className="form-group">
                                    <label>Producto:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="Producto"
                                        placeholder="Nombre del Producto"
                                        required
                                        value={this.state.Producto}
                                        onChange={this.leerDato}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Fecha de Vencimiento:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="fecha"
                                        placeholder="Fecha de vencimiento"
                                        required
                                        value={this.state.fecha}
                                        onChange={this.leerDato}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Número de Lote:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="numero"
                                        placeholder="Número del Lote"
                                        required
                                        value={this.state.numero}
                                        onChange={this.leerDato}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Precio:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="precio"
                                        placeholder="Número del Lote"
                                        required
                                        value={this.state.precio}
                                        onChange={this.leerDato}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Existencia:</label>
                                    <input 
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        name="existencia"
                                        placeholder="Cantidad en Existencia"
                                        required
                                        value={this.state.existencia}
                                        onChange={this.leerDato}
                                    />
                                </div>

                                <input type="submit" value="Agregar Producto" className="btn btn-success"/>

                            </form>
                        </div>
                    </div>
                </div>
            </div> 
    
            
         );
    }
}

NuevoProducto.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default firestoreConnect()( NuevoProducto );
