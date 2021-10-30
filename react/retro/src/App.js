import './App.css';
import { Inicio } from './paginas/Inicio';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Catalogo } from './paginas/Catalogo';
import { Error404 } from './components/error404/Error404';
import { Producto } from './components/producto/Producto';
import Modales from './components/modal/Modales';
import { FormularioContacto } from './paginas/FormularioContacto';
import React from 'react';

function App() {
  // Importamos el token para saber cuándo el usuario está logueado o no.

  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Inicio />
          </Route>
          <Route exact path='/catalogo' component={Catalogo} />

          <Route exact path='/product/:idProduct'>
            <Producto />
          </Route>
          <Route path='*' component={Error404} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
