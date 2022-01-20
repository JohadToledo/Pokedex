
import './App.css';
import Navbar from './components/Navbar';
import Pokedex from './components/Pokedex';
import Searchbar from './components/Searchbar';

function App() {
  return (
    <>
      <Navbar />
      <Searchbar />
      <Pokedex />
    </>
  );
}

export default App;
