import React from 'react';
import Pokemon from './Pokemon';

function Pokedex(props) {
    const {pokemons} = props;
  return <>
      <div>
          <h1>Pokedex</h1>
          <div>Pagination</div>
      </div>
      <div>
          {pokemons.map((pokemon, idx) => {
              return(
                  <Pokemon pokemon={pokemon} key={pokemon.name}/>
              )
          })}
      </div>
  </>;
}

export default Pokedex;
