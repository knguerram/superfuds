import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';


const Productos = ({productos, firestore}) => {

    const eliminarProducto = id => {
        // eliminar producto de Firestore
        firestore.delete({
            collection : 'productos',
            doc : id
        });
        
    }

    if(!productos) return <Spinner />


    return ( 
        <div className="row">
            <div className="col-12 mb-4">
                <Link to="/productos/nuevo" className="btn btn-success">
                    <i className="fas fa-plus"></i> {''}
                    Nuevo Producto
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    Producto
                </h2>
            </div>

            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Producto</th>
                        <th>Numero de Lote</th>
                        <th>Fecha de vencimiento</th>
                        <th>Precio</th>
                        <th>Existencia</th>
                        <th>Disponibles</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.id}>
                            <td>{producto.Producto}</td>
                            <td>{producto.numero}</td>
                            <td>{producto.fecha}</td>
                            <td>{producto.precio}</td>
                            <td>{producto.existencia}</td>
                            <td>{producto.existencia - producto.facturar.length}</td>
                            <td>
                                <Link 
                                    to={`/productos/mostrar/${producto.id}`}
                                    className="btn btn-success btn-block"
                                > 
                                    <i className="fas fa-angle-double-right"></i> {''}  
                                    Más Información
                                </Link>

                                <button 
                                    type="button"
                                    className="btn btn-danger btn-block"
                                    onClick={() => eliminarProducto(producto.id)}
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

Productos.propTypes = {
    firestore : PropTypes.object.isRequired,
    productos: PropTypes.array
}
 
export default compose(
    firestoreConnect([{ collection : 'productos' }]),
    connect((state, props) => ({
        productos : state.firestore.ordered.productos
    }))
)(Productos);