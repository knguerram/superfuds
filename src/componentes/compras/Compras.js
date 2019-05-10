import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';


const Productos = ({productos, firestore}) => {
    
    if(!productos) return <Spinner />

    return ( 
        <div className="row">
            <div className="col-md-8">
                <h2>
                    Productos
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
                            <td>${producto.precio}</td>
                            <td>{producto.existencia}</td>
                            <td>{producto.existencia - producto.facturar.length}</td>
                            <td>
                                <Link 
                                    to={`/compras/mostrar/${producto.id}`}
                                    className="btn btn-success btn-block"
                                > 
                                    <i className="fas fa-angle-double-right"></i> {''}  
                                    Productos a Facturar 
                                </Link>
                                <Link to={`/compras/facturar/${producto.id}`}
                                 className="btn btn-success btn-block"
                                >   
                                 <i className="fas fa-angle-double-right"></i> {''}  
                                 Solicitar Productos 
                                </Link>
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