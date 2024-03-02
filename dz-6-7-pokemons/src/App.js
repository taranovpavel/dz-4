import './App.css';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import PokemonCards from "./page/pokemonCards/PokemonCards";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PokemonInfo from "./page/pokemonInfo/PokemonInfo";

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
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<PokemonCards list={pokemons}/>}/>
            <Route path='/:id' element={<PokemonInfo/>}/>
        </Routes>
    </BrowserRouter>

    );
}

export default App;
