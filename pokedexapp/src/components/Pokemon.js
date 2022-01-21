import React from "react";

const Pokemon = (props) => {
  const { pokemon } = props;
  return (
    <>
      <div className="pokemon-card">
        <div>
          <img src={pokemon.sprites.front_default} alt="" />
        </div>
        <div>
          <h3>{pokemon.name}</h3>
          <div>#{pokemon.id}</div>
        </div>
        <div>
          <div>
            {pokemon.types.map((types, idx) => {
              return <div key={idx}>{types.type.name}</div>;
            })}
          </div>
          <div>🖤</div>
        </div>
      </div>
    </>
  );
};

export default Pokemon;
