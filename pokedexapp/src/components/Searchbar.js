import React, { useState } from 'react';
import { searchPokemon } from '../api';


function Searchbar(props) {
    const {onSearch} = props;
    const [search, setSearch] = useState('')
    const [pokemon, setPokemon] = useState()

    const onChange = (e) => {
        setSearch(e.target.value)
        if(e.target.value.length === 0){
            onSearch(null)
        }
    }

    const onClick = async (e) => {
        onSearch(search)
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
