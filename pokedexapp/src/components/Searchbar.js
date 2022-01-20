import React, { useState } from 'react';
import { searchPokemon } from '../api';


function Searchbar() {
    const [search, setSearch] = useState('')
    const [pokemon, setPokemon] = useState()

    const onChange = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }

    const onClick = async (e) => {
        e.preventDefault();
        const data = await searchPokemon(search)
        setPokemon(data)
    }
  return <>
  <div>
      <input placeholder="Search pokemon..." type="text" onChange={onChange}/>
  </div>
  <div>
      <button onClick={onClick}>Search</button>
  </div>
  <div>
      {pokemon && <><div>
          {pokemon.name}
      </div>
      <br />
      <div>
          {pokemon.weight}
      </div>
      <div>
          <img src={pokemon.sprites.front_default} alt="" />
      </div>
      </>}
  </div>
  </>;
}

export default Searchbar;
