import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import classes from "./PokemonInfo.module.css";


const PokemonInfo = () => {

    const {id} = useParams()
    const [pokemon, setPokemon] = useState({})
    const getPokemon = async () => {
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        setPokemon(data)
    }
    useEffect(()=>{
        getPokemon()
    }, [])
    const [image, setImage] = useState([])
    const getImage = async () => {
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        setImage(data.sprites.other.dream_world.front_default)
    }
    useEffect(() => {
        getImage()
    }, []);
    const [stats, setStats] = useState([])
    return (
        <div className={classes.info}>
            <img src={image} alt=""/>
            <p className={classes.name}>{pokemon.name}</p>
            <ul>
                <li><p>height</p><p>{pokemon.height}</p></li>
                <li><p>weight</p><p>{pokemon.weight}</p></li>
                <li><p>base_experience</p><p>{pokemon.base_experience}</p></li>
            </ul>
        </div>
    );
};

export default PokemonInfo;