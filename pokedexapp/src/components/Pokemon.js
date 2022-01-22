import React, { useContext } from "react";
import FavoriteContext from "../Context/favoriteContext";

const Pokemon = (props) => {
  const { pokemon } = props;
  const {favoritePokemons, updateFavoritePokemons} = useContext(FavoriteContext)

  const redHeart = '💗'
  const blackHeart = '🖤'
  const heart = favoritePokemons.includes(pokemon.name) ? redHeart : blackHeart

  const clickHeart = (e) => {
    e.preventDefault()
    updateFavoritePokemons(pokemon.name)
  }
  return (
    <>
      <div className="pokemon-card">
        <div className="pokemon-img-container">
          <img src={pokemon.sprites.front_default} alt="" className='pokemon-img' />
        </div>
        <div className='card-body'>
          <div className='card-top'>
            <h3>{pokemon.name}</h3>
            <div>#{pokemon.id}</div>
          </div>
        <div className='card-bottom'>
            <div className='pokemon-type'>
                {pokemon.types.map((types, idx) => {
                return <div key={idx}>{types.type.name}</div>;
                })}
            </div>
            <button onClick={clickHeart}>
            <div className='pokemon-favorite'>{heart}</div>
            </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default Pokemon;
