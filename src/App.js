import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

import Productos from './componentes/productos/Productos';
import MostrarProductos from './componentes/productos/MostrarProducto';
import NuevoProductos from './componentes/productos/NuevoProducto';
import EditarProductos from './componentes/productos/EditarProducto';

import Clientes from './componentes/clientes/Clientes';
import MostrarClientes from './componentes/clientes/MostrarClientes';
import EditarClientes from './componentes/clientes/EditarClientes';
import NuevoClientes from './componentes/clientes/NuevoClientes';

import Compras from './componentes/compras/Compras';
import MostrarCompras from './componentes/compras/MostrarCompras';
import PrestamoCompras from './componentes/compras/PrestamoCompras';

import Login from './componentes/auth/Login';
import Navbar from './componentes/layout/Navbar';

import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth';

function App() {
  return (
    <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
                <Route exact path="/" component={UserIsAuthenticated(Productos)} />
                <Route exact path="/productos/mostrar/:id" component={UserIsAuthenticated(MostrarProductos)} />
                <Route exact path="/productos/nuevo" component={UserIsAuthenticated(NuevoProductos)} />
                <Route exact path="/productos/editar/:id" component={UserIsAuthenticated(EditarProductos)} />

                <Route exact path="/clientes" component={UserIsAuthenticated(Clientes)} />
                <Route exact path="/clientes/nuevo" component={UserIsAuthenticated(NuevoClientes)} />
                <Route exact path="/clientes/mostrar/:id" component={UserIsAuthenticated(MostrarClientes)} />
                <Route exact path="/clientes/editar/:id" component={UserIsAuthenticated(EditarClientes)} />

                <Route exact path="/compras" component={UserIsAuthenticated(Compras)} />
                <Route exact path="/compras/mostrar/:id" component={UserIsAuthenticated(MostrarCompras)} />
                <Route exact path="/compras/facturar/:id" component={UserIsAuthenticated(PrestamoCompras)} />


                <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
            </Switch>
          </div>
      </Router>
    </Provider>
  );
}

export default App;
