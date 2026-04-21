import { getShows, searchShows } from './service.js';
import { state, setShows, setPage, setFilter } from './state.js';
import { displayShows, updatePaginationUI, renderSearchHistory } from './ui.js';
import { getFavorites, toggleFavoriteStorage, saveSearchQuery, getSearchHistory } from './storage.js';

const init = async () => {
    state.favorites = getFavorites();
    const history = getSearchHistory();
    renderSearchHistory(history);

    const initialShows = await getShows();
    setShows(initialShows);
    
    renderCurrentState();
};

const renderCurrentState = () => {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    const showsToDisplay = state.filteredShows.slice(startIndex, endIndex);
    
    displayShows(showsToDisplay, 'showsContainer', state.favorites);
    updatePaginationUI(state.currentPage);
};

document.getElementById('searchButton')?.addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value;
    if (query) {
        saveSearchQuery(query);
        renderSearchHistory(getSearchHistory());
        const results = await searchShows(query);
        setShows(results);
        renderCurrentState();
    }
});

document.getElementById('prevPage')?.addEventListener('click', () => {
    if (state.currentPage > 1) {
        setPage(state.currentPage - 1);
        renderCurrentState();
    }
});

document.getElementById('nextPage')?.addEventListener('click', () => {
    const totalPages = Math.ceil(state.filteredShows.length / state.itemsPerPage);
    if (state.currentPage < totalPages) {
        setPage(state.currentPage + 1);
        renderCurrentState();
    }
});

document.getElementById('genreSelect')?.addEventListener('change', (e) => {
    setFilter(e.target.value);
    renderCurrentState();
});

window.toggleFav = (id) => {
    const show = state.allShows.find(s => s.id === id) || state.filteredShows.find(s => s.id === id);
    if (show) {
        state.favorites = toggleFavoriteStorage(show);
        renderCurrentState();
    }
};

document.addEventListener('DOMContentLoaded', init);