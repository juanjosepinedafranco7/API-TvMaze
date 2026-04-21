import { obtenerSeriePorId } from './service.js';

const iniciarDetalles = async () => {
    const parametrosUrl = new URLSearchParams(window.location.search);
    const idSerie = parametrosUrl.get('id');

    if (!idSerie) {
        document.getElementById('contenedorDetalles').innerHTML = '<p>Error: No se especificó ninguna serie.</p>';
        return;
    }

    const datosSerie = await obtenerSeriePorId(idSerie);
    dibujarDetalles(datosSerie);
};

const dibujarDetalles = (serie) => {
    const contenedor = document.getElementById('contenedorDetalles');
    
    if (!serie) {
        contenedor.innerHTML = '<p>Error al cargar la información de la serie.</p>';
        return;
    }

    const urlImagen = serie.image ? serie.image.original : 'https://via.placeholder.com/600x900?text=Sin+Imagen';
    const resumen = serie.summary || 'No hay descripción disponible.';
    const calificacion = serie.rating?.average || 'N/A';
    const generos = serie.genres?.join(', ') || 'N/A';
    const idioma = serie.language || 'N/A';
    const estado = serie.status || 'N/A';
    const estreno = serie.premiered || 'N/A';

    contenedor.innerHTML = `
        <div class="show-detail-grid">
            <img src="${urlImagen}" alt="${serie.name}" class="detail-image">
            <div class="detail-info">
                <h2>${serie.name}</h2>
                <div class="summary">${resumen}</div>
                <ul class="metadata-list">
                    <li><strong>Calificación:</strong> ${calificacion}</li>
                    <li><strong>Géneros:</strong> ${generos}</li>
                    <li><strong>Idioma:</strong> ${idioma}</li>
                    <li><strong>Estado:</strong> ${estado}</li>
                    <li><strong>Fecha de estreno:</strong> ${estreno}</li>
                </ul>
                <a href="${serie.officialSite}" target="_blank" class="official-site-btn" ${!serie.officialSite ? 'style="display:none;"' : ''}>
                    Visitar sitio web oficial
                </a>
            </div>
        </div>
    `;
};

document.getElementById('botonVolver')?.addEventListener('click', () => {
    window.history.back();
});

document.addEventListener('DOMContentLoaded', iniciarDetalles);