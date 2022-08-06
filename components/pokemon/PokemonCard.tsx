import React, { FC } from "react";
import { Card, Grid, Row, Text } from "@nextui-org/react";
import { SmallPokemon } from "../../interfaces/pokemon-list";
import { useRouter } from "next/router";

interface Props {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon: { id, image, name } }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/name/${name}`);
  };

  return (
    <Grid xs={6} sm={4} md={2} xl={1} key={id}>
      <Card
        onClick={onClick}
        isPressable
        isHoverable
        variant="bordered"
        css={{ mw: "400px" }}
      >
        <Card.Body>
          <Card.Image src={image} objectFit="contain" height={140} alt={name} />
          <Card.Footer css={{ justifyItems: "flex-start" }}>
            <Row wrap="wrap" justify="space-between" align="center">
              <Text transform="capitalize" b>
                {name}
              </Text>
              <Text
                css={{
                  color: "$accents7",
                  fontWeight: "$semibold",
                  fontSize: "$sm",
                }}
              >
                # {id}
              </Text>
            </Row>
          </Card.Footer>
        </Card.Body>
      </Card>
    </Grid>
  );
};
