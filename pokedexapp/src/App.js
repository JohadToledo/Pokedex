
import { useEffect, useState } from 'react';
import { getPokemonData, getPokemons } from './api';
import './App.css';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';

function App() {
  const [pokemons, setPokemons] = useState([])
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)


  const fetchPokemons = async() =>{
    try{
      setLoading(true)
      const data = await getPokemons(50, page * 50)
      const promises = data.results.map( async(pokemon) => {
        return await getPokemonData(pokemon.url) 
      });
      const results = await Promise.all(promises)
      setPokemons(results)
      setLoading(false)
      setTotal(Math.ceil(data.count / 50)) 
    }catch(err){
      console.error(err)
    }
  }
  useEffect(() => {
    fetchPokemons()
  }, [page]);
  

  return (
    <>
      <Navbar />
      <div className="App">
      <Searchbar />
      
      <Pokedex 
        loading={loading}
        pokemons={pokemons}
        page={page}
        setPage={setPage}
        total={total}
      />
      
      </div>
    </>
  );
}

export default App;
