import Head from "next/head";
import React, { FC } from "react";
import { Navbar } from "../ui";

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
  pokemon?: string;
}

const origin = (typeof window !== "undefined" && window.location.origin) || "";

export const Layout: FC<LayoutProps> = ({
  children,
  title = "PokemonApp",
  pokemon = "Desconocido",
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Camilo Valenzuela" />
        <meta
          name="description"
          content={`Informacion sobre el pokemon ${pokemon}`}
        />
        <meta name="keywords" content={`pokemon, ${pokemon}, pokedex`} />
        <meta
          property="og:title"
          content={`Información sobre el pokémon ${pokemon}`}
        />
        <meta
          property="og:description"
          content={`Esta es la pagina sobre el pokémon ${pokemon}`}
        />
        <meta property="og:image" content={`${origin}/banner.png`} />
      </Head>
      <Navbar />
      <main
        style={{
          padding: "0 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
