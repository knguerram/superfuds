import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

class EditarProducto extends Component {
    
    // refs
    productoInput = React.createRef();
    fechaInput = React.createRef();
    numeroInput = React.createRef();
    precioInput = React.createRef();
    existenciaInput = React.createRef();

    // Actualiza el producto en firestore
    actualizarProducto = e => {
        e.preventDefault();

        // construir el nuevo objeto
        const productoActualizado = {
            Producto : this.productoInput.current.value,
            fecha : this.fechaInput.current.value,
            numero : this.numeroInput.current.value,
            precio : this.precioInput.current.value,
            existencia : this.existenciaInput.current.value,
        }
        
        // leer firestore y history
        const { firestore, history, producto } = this.props

        // actualizar en firestore
        firestore.update({
            collection: 'productos',
            doc: producto.id
        }, productoActualizado).then(history.push('/'))
    }

    render() { 

        // obtener el producto
        const { producto } = this.props;

        if(!producto) return <Spinner />

        return ( 
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={'/'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> {''}
                        Volver al Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        Editar producto
                    </h2>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form
                                onSubmit={this.actualizarProducto}
                            >
                                <div className="form-group">
                                    <label>Producto:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="Producto"
                                        placeholder="Producto"
                                        required
                                        defaultValue={producto.Producto}
                                        ref={this.productoInput}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Fecha de vencimiento:</label>
                                    <input 
                                        type="date"
                                        className="form-control"
                                        name="fecha"
                                        placeholder="Fecha de vencimiento"
                                        required
                                        defaultValue={producto.fecha}
                                        ref={this.fechaInput}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Numero de Lote:</label>
                                    <input 
                                        type="number"
                                        className="form-control"
                                        name="numero"
                                        placeholder="Número de lote"
                                        required
                                        defaultValue={producto.numero}
                                        ref={this.numeroInput}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Precio:</label>
                                    <input 
                                        type="number" 
                                        min="0"
                                        max="1000000000" 
                                        step="0"
                                        className="form-control"
                                        name="precio"
                                        placeholder="Número de lote"
                                        required
                                        defaultValue={producto.precio}
                                        ref={this.precioInput}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Existencia:</label>
                                    <input 
                                        type="number"
                                        min="0"
                                        max="1000000000000000" 
                                        className="form-control"
                                        name="existencia"
                                        placeholder="Cantidad en Existencia"
                                        required
                                        defaultValue={producto.existencia}
                                        ref={this.existenciaInput}
                                    />
                                </div>

                                <input type="submit" value="Editar producto" className="btn btn-success"/>

                            </form>
                        </div>
                    </div>
                </div>
            </div>     
         );
    }
}
 
EditarProducto.propTypes = {
    firestore: PropTypes.object.isRequired
}
 
export default compose(
    firestoreConnect(props => [
        {
            collection : 'productos',
            storeAs : 'producto',
            doc : props.match.params.id
        }
    ]), 
    connect(({ firestore: { ordered }}, props ) => ({
        producto : ordered.producto && ordered.producto[0]
    }))
)(EditarProducto)