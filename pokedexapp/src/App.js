
import { useEffect, useState } from 'react';
import { getPokemons } from './api';
import './App.css';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';

function App() {
  const [pokemons, setPokemons] = useState([])

  const fetchPokemons = async() =>{
    try{
      const data = await getPokemons()
      console.log(data)
      setPokemons(data.results)
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
