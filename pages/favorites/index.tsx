import { Layout } from "../../components/layouts";
import { FavoritesPkmn, NoFavorites } from "../../components/pokemon";
import { useState, useEffect } from "react";
import { localFavorites } from "../../utils";

const FavoritePage = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    setFavorites(localFavorites.getFavorites());
  }, []);

  return (
    <Layout title="Favoritos">
      {favorites.length > 0 ? (
        <FavoritesPkmn favorites={favorites} />
      ) : (
        <NoFavorites />
      )}
    </Layout>
  );
};

export default FavoritePage;
