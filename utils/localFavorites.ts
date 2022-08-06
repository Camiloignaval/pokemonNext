const toggleFavorites = (id: number) => {
  let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (favorites.includes(id)) {
    favorites = favorites.filter((pokeId: number) => pokeId !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const existFavorite = (id: number): boolean => {
  if (typeof window === "undefined") return false;
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  return favorites.includes(id);
};

const getFavorites = (): number[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

export default { toggleFavorites, existFavorite, getFavorites };
