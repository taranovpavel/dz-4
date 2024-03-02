import React, {useEffect, useState} from 'react';
import axios from "axios";
import classes from "./PokemonCard.module.css";
import { Link } from 'react-router-dom';

const PokemonCard = ({name,url}) => {

    const [image, setImage] = useState([])
    const getImage = async () => {
        const {data} = await axios.get(url)
        setImage(data.sprites.other.dream_world.front_default)
    }
    useEffect(() => {
        getImage()
    }, []);

    const [id, setId] = useState([])
    const getId = async () => {
        const {data} = await axios.get(url)
        setId(data.id)
    }
    useEffect(() => {
        getId()
    }, []);
    console.log(id)

    const result = name.charAt(0).toUpperCase() + name.slice(1)
    return (
        <li className={classes.card}>
            <img src={image} alt=""/>
            <h2>{result}</h2>
            <Link to={`/${id}`}>подробнее</Link>
        </li>
    );
};

export default PokemonCard;