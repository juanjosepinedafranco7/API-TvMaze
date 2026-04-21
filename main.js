import { getShows, searchShows } from './service.js';
import { state, setState } from './state.js';
import { displayShows, updatePaginationUI } from './ui.js';
import { initPersistence, trackSearch } from './persistance.js';

const init = async () => {
    initPersistence();
    const initialShows = await getShows(state.currentPage);
    setState('shows', initialShows);
    displayShows(state.shows, 'results-container', state.favorites);
    updatePaginationUI(state.currentPage);
};

document.getElementById('search-button')?.addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    if (query) {
        trackSearch(query);
        const results = await searchShows(query);
        setState('shows', results);
        displayShows(state.shows, 'results-container', state.favorites);
    }
});

document.getElementById('prev-page')?.addEventListener('click', async () => {
    if (state.currentPage > 0) {
        state.currentPage--;
        const shows = await getShows(state.currentPage);
        setState('shows', shows);
        displayShows(state.shows, 'results-container', state.favorites);
        updatePaginationUI(state.currentPage);
    }
});

document.getElementById('next-page')?.addEventListener('click', async () => {
    state.currentPage++;
    const shows = await getShows(state.currentPage);
    setState('shows', shows);
    displayShows(state.shows, 'results-container', state.favorites);
    updatePaginationUI(state.currentPage);
});

window.toggleFavorite = (id) => {
    const show = state.shows.find(s => (s.show ? s.show.id : s.id) === id);
    const isFav = state.favorites.some(f => f.id === id);

    if (isFav) {
        const newFavs = state.favorites.filter(f => f.id !== id);
        setState('favorites', newFavs);
    } else {
        const showData = show.show ? show.show : show;
        setState('favorites', [...state.favorites, showData]);
    }
    displayShows(state.shows, 'results-container', state.favorites);
};

document.addEventListener('DOMContentLoaded', init);