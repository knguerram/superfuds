import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

import FichaClientes from '../clientes/FichaClientes';

// REDUX Actions
import { buscarUsuario } from '../../actions/buscarUsuarioActions';

class FacturarCompras extends Component {
    state = { 
        noResultados: false,
        busqueda : '',
        cantidad: '',
    }

    // Buscar cliente por Documento
    buscarClientes = e => {
        e.preventDefault();

        // obtener el valor a buscar
        const { busqueda } = this.state;

        // cantidad a comprar
        const { cantidad } = this.state;
        console.log(cantidad);
        // extraer firestore
        const { firestore, buscarUsuario } = this.props;

        // hacer la consulta
        const coleccion = firestore.collection('clientes');
        const consulta = coleccion.where("documento", "==", busqueda).get();

        // leer los resultados
        consulta.then(resultado => {
            if(resultado.empty) {
                // no hay resultados

                // almacenar en redux un objeto vacio
                buscarUsuario({})

                // actualizar el state en base a si hay resultados
                this.setState({
                    noResultados: true
                });
            } else {
                // si hay resultados

                // colocar el resultado en el state de Redux
                const datos = resultado.docs[0];
                buscarUsuario(datos.data());

                // actualizar el state en base a si hay resultados
                this.setState({
                    noResultados: false,
                })
            }
        })
    }

    // almacena los datos del cliente para solicitar el Producto
    solicitarFacturar = () => {
        const { usuario } = this.props;

        // fecha de alta
        usuario.fecha_solicitud = new Date().toLocaleDateString();

        // No se pueden mutar los pros, tomar una copia y crear un arreglo nuevo
        let facturar = [];
        facturar = [...this.props.producto.facturar, usuario];

        // Copiar el objeto y agregar los facturados
        const producto = {...this.props.producto};

        // eliminar la facturaciones anteriores
        delete producto.facturar;

        // asignar la factura
        producto.facturar = facturar;

        // extraer firestore
        const {firestore, history} = this.props;

        // almacenar en la BD
        firestore.update({
            collection: 'productos',
            doc: producto.id
        }, producto ).then(history.push('/compras'));
    }


    // Almacenar el documento en el state
    leerDato = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    render() { 
        // Extaer el producto
        const { producto } = this.props;
    
        // mostrar el spinner
        if(!producto) return <Spinner />

        // extraer los datos del cliente
        const {  usuario } = this.props;

        let fichaClientes, btnSolicitar;
        if(usuario.nombre) {
            fichaClientes = <FichaClientes
                        clientes={usuario}
                         />
            btnSolicitar = <button
                                type="button"
                                className="btn btn-primary btn-block"
                                onClick={this.solicitarFacturar}
                                >Solicitar Productos</button>
        } else {
            fichaClientes = null;
            btnSolicitar = null;
        }

        // Mostrar mensaje de error
        const {noResultados} = this.state;

        let mensajeResultado = '';
        if(noResultados) {
            mensajeResultado = <div className="alert alert-danger text-center font-weight-bold">No hay resultados para ese documento.</div>
        } else {
            mensajeResultado = null;
        }

        return ( 
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={'/compras'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> {''}
                        Volver al Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-book"></i> {''}
                        Solicitar Producto : {producto.Producto}
                    </h2>

                    <div className="row justify-content-center mt-5">
                        <div className="col-md-8">
                            <form
                                onSubmit={this.buscarClientes}
                                className="mb-4"
                            >
                                <legend className="color-primary text-center">
                                    Busca el Cliente por Documento
                                </legend>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="busqueda"
                                        className="form-control"
                                        onChange={this.leerDato}
                                    />
                                </div>
                                <input value="Buscar cliente" type="submit" className="btn btn-success btn-block"/>
                            </form>

                            {/* Muestra la ficha del cliente y el botón para solicitar */}
                            {fichaClientes}
                            {btnSolicitar}

                            {/* Muestra un mensaje de no resultados */}
                            
                            {mensajeResultado}

                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
FacturarCompras.propTypes = {
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
    connect(({ firestore: { ordered }, usuario}, props ) => ({
        producto : ordered.producto && ordered.producto[0],
        usuario: usuario
    }), {  buscarUsuario })
)(FacturarCompras)