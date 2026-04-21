export const dibujarSeries = (series, idContenedor, listaFavoritos) => {
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) return;
    
    contenedor.innerHTML = '';
    
    series.forEach(serie => {
        const esFavorito = listaFavoritos.some(fav => fav.id === serie.id);
        const tarjeta = document.createElement('div');
        tarjeta.className = 'movie-card';
        
        const urlImagen = serie.image ? serie.image.medium : 'https://via.placeholder.com/210x295?text=Sin+Imagen';
        const calificacion = serie.rating?.average || 'N/A';
        const generos = serie.genres?.join(', ') || 'N/A';
        
        tarjeta.innerHTML = `
            <img src="${urlImagen}" alt="${serie.name}">
            <div class="movie-card-content">
                <h3>${serie.name}</h3>
                <p>Calificación: ${calificacion}</p>
                <p>${generos}</p>
                <button class="fav-btn" onclick="window.alternarFav(${serie.id})">
                    ${esFavorito ? 'Quitar Favorito' : 'Agregar Favorito'}
                </button>
                <a href="show.html?id=${serie.id}" class="details-link">Ver detalles</a>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
};

export const actualizarInterfazPaginacion = (paginaActual) => {
    const indicador = document.getElementById('indicadorPaginaActual');
    if (indicador) {
        indicador.textContent = `Página ${paginaActual}`;
    }
};

export const dibujarHistorial = (historial) => {
    const lista = document.getElementById('listaHistorial');
    if (!lista) return;
    
    lista.innerHTML = '';
    historial.forEach(termino => {
        const elementoLista = document.createElement('li');
        elementoLista.textContent = termino;
        lista.appendChild(elementoLista);
    });
};