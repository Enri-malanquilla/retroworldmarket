import { SeccionListaArticulos } from '../components/seccion-lista-articulos/SeccionListaArticulos';
import { Categorias } from '../components/categorias/Categorias';
import { Footer } from '../components/footer/Footer';
import { Link } from 'react-router-dom';

// Falta ubicar PlusArticuloModal en los productos
// importar Categorias

export const Inicio = ({ articulo }) => {
    return (
        <div>
            <main id='mainPaginaPrincipal'>
                <aside id='botonesCompraVenta'>
                    <button>
                        <Link to='/catalogo'>Compra tu retro</Link>
                    </button>
                    <button>
                        <Link to='/ventas'>Vende tu retro</Link>
                    </button>
                </aside>
                <SeccionListaArticulos articulo={articulo} />
                <Categorias />
            </main>
            <Footer />
        </div>
    );
};
