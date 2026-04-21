export const estado = {
    todasLasSeries: [],
    seriesFiltradas: [],
    paginaActual: 1,
    elementosPorPagina: 10,
    filtroActual: 'all'
};

export function asignarSeries(series) {
    estado.todasLasSeries = series;
    aplicarFiltros();
}

export function asignarPagina(numeroPagina) {
    const totalPaginas = Math.ceil(estado.seriesFiltradas.length / estado.elementosPorPagina);
    if (numeroPagina >= 1 && numeroPagina <= totalPaginas) {
        estado.paginaActual = numeroPagina;
    }
}

export function asignarFiltro(genero) {
    estado.filtroActual = genero;
    estado.paginaActual = 1;
    aplicarFiltros();
}

function aplicarFiltros() {
    if (estado.filtroActual === 'all') {
        estado.seriesFiltradas = [...estado.todasLasSeries];
    } else {
        estado.seriesFiltradas = estado.todasLasSeries.filter(serie => 
            serie.genres && serie.genres.includes(estado.filtroActual)
        );
    }
}