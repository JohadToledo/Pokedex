import React from 'react';

export const searchPokemon = async (pokemon)=> {
    try{
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch(err){
        console.log(err);
    }
}


export const getPokemons = async (limit=50, offset=10) => {
    try{
        let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        const response = await fetch(url)
        const data = await response.json()
        return data
    }catch(err){
        console.log(err);
    }
}
