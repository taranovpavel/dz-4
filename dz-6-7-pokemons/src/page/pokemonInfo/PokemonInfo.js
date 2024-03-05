import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import classes from "./PokemonInfo.module.css";


const PokemonInfo = () => {

    const {id} = useParams()
    const [pokemon, setPokemon] = useState({})
    const [ loading, setLoading ] = useState(false);
    const getPokemon = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            return data;
        } catch(e) {
            console.log('Error', e.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(()=>{
        getPokemon().then(pokemon=>setPokemon(pokemon))
    }, [ id ])


    return (
        <div className={classes.info}>
            {
                loading
                    ?
                    <p>Загрузка</p>
                    :
                    <>
                        <img src={pokemon?.sprites?.other?.dream_world?.front_default} alt="pokemon"/>
                        <p>Name: {pokemon?.name}</p>
                        <p>Abilities: {pokemon?.abilities?.map(value=> value.ability.name).join(', ')}</p>
                        <p>Stats: {pokemon?.stats?.map(value=> value.stat.name).join(', ')}</p>
                        <p>Types: {pokemon?.types?.map(value=> value.type.name).join(', ')}</p>
                        <p>Some-moves: {pokemon?.moves?.slice(0,5).map(value=> value.move.name).join(', ')}</p>

                    </>
            }
        </div>
    );
};

export default PokemonInfo;