import { useEffect, useState } from "react";
import { getPokemonData, getPokemons, searchPokemon } from "./api";
import "./App.css";
import Navbar from "./components/Navbar";
import Pokedex from "./components/Pokedex";
import Searchbar from "./components/Searchbar";
import { FavoriteProvider } from "./Context/favoriteContext";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false)
 
  const localStorageKey = 'favorite_pokemon'

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(25, page * 25);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(data.count / 25));
      setNotFound(false)
    } catch (err) {
      console.error(err);
    }
  };

  const loadFavoritePokemons = () =>{
    const pokemons = 
      JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavorites(pokemons)
  }
  useEffect(() => {
    loadFavoritePokemons();
  }, []);
  
  useEffect(() => {
    if(!searching){
      fetchPokemons();
    }
  }, [page]);

  const updateFavoritePokemons = (name) => {
    const updated = [...favorites]
    const isFavorite = updated.indexOf(name);
    if(isFavorite >= 0){
      updated.splice(isFavorite, 1);
    }else updated.push(name);
    setFavorites(updated);
    window.localStorage.setItem(localStorageKey, JSON.stringify(updated))
  };

  const onSearch = async (pokemon) =>{
    if(!pokemon){
      return fetchPokemons()
    }
    setLoading(true)
    setNotFound(false);
    setSearching(true);
    const result = await searchPokemon(pokemon)
    if(!result){
      setNotFound(true)
      setLoading(false)
      return
    }else {
    setPokemons([result]);
    setPage(0)
    setTotal(1)
    
    }
    setLoading(false)
    setSearching(false)
  }
  return (
    <>
      <FavoriteProvider
        value={{
          favoritePokemons: favorites,
          updateFavoritePokemons: updateFavoritePokemons,
        }}
      >
        <Navbar />
        <div className="App">
          <Searchbar onSearch={onSearch}/>
          {notFound ? 
          <div className='notfound-text'>We could not found the pokemon that you are looking for...</div>
          :
          <Pokedex
            loading={loading}
            pokemons={pokemons}
            page={page}
            setPage={setPage}
            total={total}
          />
          }
        </div>
      </FavoriteProvider>
    </>
  );
}

export default App;
