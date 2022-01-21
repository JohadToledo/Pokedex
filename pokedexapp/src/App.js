
import { useEffect, useState } from 'react';
import { getPokemonData, getPokemons } from './api';
import './App.css';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';

function App() {
  const [pokemons, setPokemons] = useState([])

  const fetchPokemons = async() =>{
    try{
      const data = await getPokemons()
      console.log(data.results)
      const promises = data.results.map( async(pokemon) => {
        return await getPokemonData(pokemon.url) 
      });
      const result = await Promise.all(promises)
      console.log(result)
      setPokemons(result)
    }catch(err){
      console.error(err)
    }
  }
  useEffect(() => {
    fetchPokemons()
  }, []);
  

  return (
    <>
      <Navbar />
      <Searchbar />
      <Pokedex pokemons={pokemons}/>
    </>
  );
}

export default App;
