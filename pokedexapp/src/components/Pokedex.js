import React from 'react';

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
              <div key={pokemon.name}>{pokemon.name}</div>
              )
          })}
      </div>
  </>;
}

export default Pokedex;
