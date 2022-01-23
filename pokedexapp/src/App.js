import { useEffect, useState } from "react";
import { getPokemonData, getPokemons } from "./api";
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
 
  const localStorageKey = 'favorite_pokemon'

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(50, page * 50);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(data.count / 50));
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
    fetchPokemons();
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
          <Searchbar />

          <Pokedex
            loading={loading}
            pokemons={pokemons}
            page={page}
            setPage={setPage}
            total={total}
          />
        </div>
      </FavoriteProvider>
    </>
  );
}

export default App;
