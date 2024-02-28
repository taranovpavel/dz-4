import './App.css';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import PokemonCards from "./components/pokemon/PokemonCards";

function App() {
    const [pokemons, setPokemons] = useState([])
    const getPokemons = async () => {
        const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon')
        setPokemons(data.results)
    }
    useEffect(() => {
        getPokemons()
    }, []);

    return (
        <>
            <PokemonCards list={pokemons} />
        </>
    );
}

export default App;
