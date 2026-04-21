export const createShowCard = (show, isFavorite) => {
    const { id, name, image, rating, genres } = show;
    const img = image ? image.medium : 'https://placehold.co/210x295?text=No+Image';
    
    return `
        <div class="movie-card">
            <img src="${img}" alt="${name}">
            <div class="movie-card-content">
                <h3>${name}</h3>
                <p>⭐ ${rating.average || 'N/A'}</p>
                <p>${genres.join(', ')}</p>
                <div class="card-buttons">
                    <a href="show.html?id=${id}">Detalle</a>
                    <button class="btn-fav" onclick="toggleFavorite(${id})">
                        ${isFavorite ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        </div>
    `;
};

export const displayShows = (items, containerId, favorites) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = items.map(item => {
        const show = item.show ? item.show : item;
        const isFavorite = favorites.some(f => f.id === show.id);
        return createShowCard(show, isFavorite);
    }).join('');
};

export const updatePaginationUI = (page) => {
    const el = document.getElementById('current-page');
    if (el) el.innerText = page + 1;
};