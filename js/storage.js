export const getFavorites = () => {
    const favs = localStorage.getItem('movieExplorerFavs');
    return favs ? JSON.parse(favs) : [];
};

export const toggleFavoriteStorage = (show) => {
    let favorites = getFavorites();
    const exists = favorites.find(f => f.id === show.id);
    
    if (exists) {
        favorites = favorites.filter(f => f.id !== show.id);
    } else {
        favorites.push(show);
    }
    
    localStorage.setItem('movieExplorerFavs', JSON.stringify(favorites));
    return favorites;
};

export const getSearchHistory = () => {
    const history = localStorage.getItem('movieExplorerHistory');
    return history ? JSON.parse(history) : [];
};

export const saveSearchQuery = (query) => {
    let history = getSearchHistory();
    if (!history.includes(query)) {
        history.unshift(query);
        if (history.length > 5) history.pop();
        localStorage.setItem('movieExplorerHistory', JSON.stringify(history));
    }
};