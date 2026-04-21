import { obtenerSeries, buscarSeries } from './service.js';
import { estado, asignarSeries, asignarPagina, asignarFiltro } from './state.js';
import { dibujarSeries, actualizarInterfazPaginacion, dibujarHistorial } from './ui.js';
import { obtenerFavoritos, alternarFavorito, guardarBusqueda, obtenerHistorialBusqueda } from './storage.js';

const iniciarAplicacion = async () => {
    estado.favoritos = obtenerFavoritos();
    const historial = obtenerHistorialBusqueda();
    dibujarHistorial(historial);

    const seriesIniciales = await obtenerSeries();
    asignarSeries(seriesIniciales);
    
    renderizarEstadoActual();
};

const renderizarEstadoActual = () => {
    const indiceInicio = (estado.paginaActual - 1) * estado.elementosPorPagina;
    const indiceFin = indiceInicio + estado.elementosPorPagina;
    const seriesAMostrar = estado.seriesFiltradas.slice(indiceInicio, indiceFin);
    
    dibujarSeries(seriesAMostrar, 'contenedorSeries', estado.favoritos);
    actualizarInterfazPaginacion(estado.paginaActual);
};

document.getElementById('botonBuscar')?.addEventListener('click', async () => {
    const termino = document.getElementById('entradaBusqueda').value;
    if (termino) {
        guardarBusqueda(termino);
        dibujarHistorial(obtenerHistorialBusqueda());
        const resultados = await buscarSeries(termino);
        asignarSeries(resultados);
        renderizarEstadoActual();
    }
});

document.getElementById('botonAnterior')?.addEventListener('click', () => {
    if (estado.paginaActual > 1) {
        asignarPagina(estado.paginaActual - 1);
        renderizarEstadoActual();
    }
});

document.getElementById('botonSiguiente')?.addEventListener('click', () => {
    const totalPaginas = Math.ceil(estado.seriesFiltradas.length / estado.elementosPorPagina);
    if (estado.paginaActual < totalPaginas) {
        asignarPagina(estado.paginaActual + 1);
        renderizarEstadoActual();
    }
});

document.getElementById('selectorGenero')?.addEventListener('change', (evento) => {
    asignarFiltro(evento.target.value);
    renderizarEstadoActual();
});

window.alternarFav = (id) => {
    const serie = estado.todasLasSeries.find(s => s.id === id) || estado.seriesFiltradas.find(s => s.id === id);
    if (serie) {
        estado.favoritos = alternarFavorito(serie);
        renderizarEstadoActual();
    }
};

document.addEventListener('DOMContentLoaded', iniciarAplicacion);