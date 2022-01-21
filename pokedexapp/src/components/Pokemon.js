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
            {pokemon.type.map((type, idx) => {
              return <div key={idx}>{type.type.name}</div>;
            })}
          </div>
          <div>🖤</div>
        </div>
      </div>
    </>
  );
};

export default Pokemon;
