import { Grid } from "@nextui-org/react";
import { FC } from "react";
import { CardFavorite } from "./CardFavorite";

interface props {
  favorites: number[];
}

export const FavoritesPkmn: FC<props> = ({ favorites }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {favorites.map((id) => (
        <CardFavorite id={id} key={id} />
      ))}
    </Grid.Container>
  );
};
