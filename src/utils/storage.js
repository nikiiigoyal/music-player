export const addToFavorites = (song) => {
  const favorites = JSON.parse(localStorage.getItem("favourites")) || [];
  if (!favorites.some((item) => item.id === song.id)) {
    localStorage.setItem("favorites", JSON.stringify([...favorites, song]));
  }
};

export const removeFromFavorites = (songID) => {
  const favorites = JSON.parse(localStorage.getItem("favourites")) || [];
  const updatedFavorites = favorites.filter((song) => song.id !== songID);

  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

export const isFavorite = (songId) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  return favorites.some((song) => song.id === songId);
};

// Recently played
export const RecentlyPlayed = () => {
  return JSON.parse(sessionStorage.getItem("recentlyPlayed")) || [];
};
