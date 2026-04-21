export const displayShows = (shows, containerId, favorites) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    shows.forEach(show => {
        const isFav = favorites.some(f => f.id === show.id);
        const card = document.createElement('div');
        card.className = 'movie-card';
        
        const imageUrl = show.image ? show.image.medium : 'https://via.placeholder.com/210x295?text=No+Image';
        const rating = show.rating?.average || 'N/A';
        const genres = show.genres?.join(', ') || 'N/A';
        
        card.innerHTML = `
            <img src="${imageUrl}" alt="${show.name}">
            <div class="movie-card-content">
                <h3>${show.name}</h3>
                <p>Rating: ${rating}</p>
                <p>${genres}</p>
                <button class="fav-btn" onclick="window.toggleFav(${show.id})">
                    ${isFav ? 'Quitar Favorito' : 'Agregar Favorito'}
                </button>
                <a href="show.html?id=${show.id}" class="details-link">Ver detalles</a>
            </div>
        `;
        container.appendChild(card);
    });
};

export const updatePaginationUI = (currentPage) => {
    const indicator = document.getElementById('currentPageIndicator');
    if (indicator) {
        indicator.textContent = `Página ${currentPage}`;
    }
};

export const renderSearchHistory = (history) => {
    const list = document.getElementById('searchHistoryList');
    if (!list) return;
    
    list.innerHTML = '';
    history.forEach(query => {
        const li = document.createElement('li');
        li.textContent = query;
        list.appendChild(li);
    });
};