import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

class MostrarCompras extends Component {
    state={
        prueba: 0,
    }

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

        var arrayWithDuplicates = producto.facturar;
        // funcion para traer un solo registro de los registros duplicados.
        function removeDuplicates(originalArray, prop) {
             var newArray = [];
             var lookupObject  = {};
        
             for(var i in originalArray) {
                console.log(lookupObject);
                console.log(i);
                lookupObject[originalArray[i][prop]] = originalArray[i];
             }
             console.log(lookupObject);
             console.log(i);
             for(i in lookupObject) {
                 console.log(lookupObject);
                 newArray.push(lookupObject[i]);
             }
              return newArray;
         }
        
        var uniqueArray = removeDuplicates(arrayWithDuplicates, "documento");
        return ( 
            <div className="row">
                <div className="col-md-6 mb-4">
                    <Link to="/compras" className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> {''}
                        Volver Al Listado
                    </Link> 
                </div>

                <hr className="mx-5 w-100"/>

                <div className="col-12">
                <h2 className="mb-4">{producto.Producto}</h2>
               
                    {/* Muestra las personas que tienen los productos */}

                    <h3 className="my-2">Clientes que tienen en caja el producto</h3>
                    {uniqueArray.map(facturar =>(
                    
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

                            <p>
                                <span className="font-weight-bold">
                                    Precio unidad:
                                </span> {''}
                                ${producto.precio}
                            </p>

                        </div>

                        <div className="card-footer">
                            <button 
                                type="button"
                                className="btn btn-success font-weight-bold"
                                onClick={() => this.devolverProducto(facturar.documento)}
                            > Realizar Devolución del producto </button>
                        </div>
                    </div>)
                    
                        )}
                       
                </div>
            </div>        
         );
    }
}

MostrarCompras.propTypes = {
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
)(MostrarCompras)