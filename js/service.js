const URL_BASE = 'https://api.tvmaze.com';

export async function obtenerSeries() {
    try {
        const respuesta = await fetch(`${URL_BASE}/shows`);
        if (!respuesta.ok) throw new Error('Error en la red');
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function buscarSeries(terminoBusqueda) {
    try {
        const respuesta = await fetch(`${URL_BASE}/search/shows?q=${terminoBusqueda}`);
        if (!respuesta.ok) throw new Error('Error en la red');
        const datos = await respuesta.json();
        return datos.map(item => item.show);
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function obtenerSeriePorId(id) {
    try {
        const respuesta = await fetch(`${URL_BASE}/shows/${id}`);
        if (!respuesta.ok) throw new Error('Error en la red');
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}