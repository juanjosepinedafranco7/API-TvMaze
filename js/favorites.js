import { obtenerFavoritos, alternarFavorito } from './storage.js';
import { dibujarSeries } from './ui.js';

const iniciarFavoritos = () => {
    renderizarFavoritos();
};

const renderizarFavoritos = () => {
    const favoritos = obtenerFavoritos();
    const contenedor = document.getElementById('contenedorFavoritos');
    const mensajeVacio = document.getElementById('mensajeVacio');

    if (favoritos.length === 0) {
        contenedor.innerHTML = '';
        mensajeVacio.style.display = 'block';
    } else {
        mensajeVacio.style.display = 'none';
        dibujarSeries(favoritos, 'contenedorFavoritos', favoritos);
    }
};

window.alternarFav = (id) => {
    const favoritos = obtenerFavoritos();
    const serie = favoritos.find(s => s.id === id);
    
    if (serie) {
        alternarFavorito(serie);
        renderizarFavoritos();
    }
};

document.addEventListener('DOMContentLoaded', iniciarFavoritos);