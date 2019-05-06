import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

class MostrarProducto extends Component {

    devolverProducto = id => {
        // extraer firestore
        const { firestore } = this.props;

        // copia del Producto
        const productoActualizado = {...this.props.producto};

        // eliminar la persona que esta realizando la devolución de facturar
        const facturar = productoActualizado.facturar.filter(elemento => elemento.documento !== id);
        productoActualizado.facturar = facturar;

        // actualizar en firebase
        firestore.update({
            collection : 'productos',
            doc: productoActualizado.id
        }, productoActualizado);
    }

    render() {
        // extraer el Producto
        const { producto } = this.props;

        if(!producto) return <Spinner />;

        // boton para solicitar un  producto
        let btnFacturar;

        if(producto.existencia - producto.facturar.length > 0 ) {
            btnFacturar = <Link to={`/productos/facturar/${producto.id}`}
                                className="btn btn-success my-3"
                            >Solicitar Producto</Link>
        } else {
            btnFacturar = null;
        }
        
        return ( 
            <div className="row">
                <div className="col-md-6 mb-4">
                    <Link to="/" className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> {''}
                        Volver Al Listado
                    </Link> 
                </div>
                <div className="col-md-6 mb-4">
                    <Link to={`/productos/editar/${producto.id}`} className="btn btn-primary float-right">
                        <i className="fas fa-pencil-alt"></i> {''}
                        Editar producto
                    </Link> 
                </div>

                <hr className="mx-5 w-100"/>

                <div className="col-12">
                    <h2 className="mb-4">{producto.Producto}</h2>

                    <p>
                        <span className="font-weight-bold">
                            Producto:
                        </span> {''}
                        {producto.Producto}
                    </p>

                    <p>
                        <span className="font-weight-bold">
                            Fecha de vencimiento:
                        </span> {''}
                        {producto.fecha}
                    </p>

                    <p>
                        <span className="font-weight-bold">
                            Precio:
                        </span> {''}
                        {producto.precio}
                    </p>

                    <p>
                        <span className="font-weight-bold">
                            Existencia:
                        </span> {''}
                        {producto.existencia}
                    </p>

                    <p>
                        <span className="font-weight-bold">
                            Disponibles:
                        </span> {''}
                        {producto.existencia - producto.facturar.length }
                    </p>

                    {/* Boton para solicitar una factura de producto */}
                    {btnFacturar}

                    {/* Muestra las personas que tienen los productos */}

                    <h3 className="my-2">Clientes que tienen en caja el producto</h3>

                    {producto.facturar.map(facturar => (
                        <div key={facturar.documento} className="card my-2">
                            <h4 className="card-header">
                                {facturar.nombre} {facturar.apellido}
                            </h4>

                            <div className="card-body">
                                <p>
                                    <span className="font-weight-bold">
                                        Documento:
                                    </span> {''}
                                    {facturar.documento}
                                </p>

                                <p>
                                    <span className="font-weight-bold">
                                        Fecha Solicitud:
                                    </span> {''}
                                    {facturar.fecha_solicitud}
                                </p>
                            </div>

                            <div className="card-footer">
                                <button 
                                    type="button"
                                    className="btn btn-success font-weight-bold"
                                    onClick={() => this.devolverProducto(facturar.documento)}
                                > Realizar Devolución del producto </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>        
         );
    }
}

MostrarProducto.propTypes = {
    firestore : PropTypes.object.isRequired
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
)(MostrarProducto)