export const obtenerFavoritos = () => {
    const favoritosGuardados = localStorage.getItem('misFavoritos');
    return favoritosGuardados ? JSON.parse(favoritosGuardados) : [];
};

export const alternarFavorito = (serie) => {
    let favoritos = obtenerFavoritos();
    const existe = favoritos.find(fav => fav.id === serie.id);
    
    if (existe) {
        favoritos = favoritos.filter(fav => fav.id !== serie.id);
    } else {
        favoritos.push(serie);
    }
    
    localStorage.setItem('misFavoritos', JSON.stringify(favoritos));
    return favoritos;
};

export const obtenerHistorialBusqueda = () => {
    const historial = localStorage.getItem('miHistorial');
    return historial ? JSON.parse(historial) : [];
};

export const guardarBusqueda = (termino) => {
    let historial = obtenerHistorialBusqueda();
    if (!historial.includes(termino)) {
        historial.unshift(termino);
        if (historial.length > 5) historial.pop();
        localStorage.setItem('miHistorial', JSON.stringify(historial));
    }
};