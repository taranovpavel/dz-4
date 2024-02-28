import React, {useEffect, useState} from 'react';
import axios from "axios";
import classes from "./PokemonCard.module.css";

const PokemonCard = ({name,url}) => {

    const [image, setImage] = useState([])
    const getImage = async () => {
        const {data} = await axios.get(url)
        setImage(data.sprites.other.dream_world.front_default)
    }
    useEffect(() => {
        getImage()
    }, []);

    const result = name.charAt(0).toUpperCase() + name.slice(1)
    return (
        <li className={classes.card}>
            <img src={image} alt=""/>
            <h2>{result}</h2>
        </li>
    );
};

export default PokemonCard;