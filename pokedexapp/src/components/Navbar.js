import React, { useContext } from "react";
import FavoriteContext from "../Context/favoriteContext";

function Navbar() {
  const { favoritePokemons } = useContext(FavoriteContext);
  console.log(favoritePokemons);
  return (
    <>
      <h1>Pokedex</h1>
      <div>💗 ({favoritePokemons.length})</div>
    </>
  );
}

export default Navbar;
