import { FC, useEffect, useState } from "react";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { Layout } from "../../components/layouts";
import { GetStaticProps, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import { Pokemon, PokemonListResponse } from "../../interfaces";
import { pokeApi } from "../../api";
import confetti from "canvas-confetti";
import { getPokemonInfo, localFavorites } from "../../utils";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: FC<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    setIsInFavorites(localFavorites.existFavorite(pokemon.id));
  }, [pokemon.id]);

  const onClick = () => {
    localFavorites.toggleFavorites(pokemon.id);
    setIsInFavorites(!isInFavorites);
    if (!isInFavorites) {
      if (window.innerWidth >= 960) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.16, x: 0.85 },
        });
      } else {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.45, x: 0.8 },
        });
      }
    }
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2} justify={"flex-start"}>
        <Grid xs={12} sm={4} key={pokemon.id}>
          <Card css={{ padding: "40px", backgroundColor: "black" }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default ?? ""}
                width="100%"
                objectFit="contain"
                height={200}
                alt={pokemon.name}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8} key={pokemon.id}>
          <Card css={{ padding: "40px", backgroundColor: "black" }}>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize" b>
                {pokemon.name}
              </Text>
              <Button
                onClick={onClick}
                color={"gradient"}
                ghost={!isInFavorites}
              >
                {isInFavorites ? "En favoritos" : "Guardar en favoritos"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
  const pkmnNames: string[] = data.results.map((pokemon) => pokemon.name);
  return {
    paths: pkmnNames.map((name) => ({ params: { name } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  return {
    props: {
      pokemon: await getPokemonInfo(name),
    },
  };
};

export default PokemonPage;
