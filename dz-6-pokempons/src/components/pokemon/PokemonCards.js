import React from 'react';
import PokemonCard from "../pokemonCard/PokemonCard";
import classes from "./PokemonCards.module.css"

const PokemonCards = ({list}) => {
    return (
        <ul className={classes.cards}>
            {list.map(pokemonCard =>
                <PokemonCard
                    url={pokemonCard.url}
                    name={pokemonCard.name}
                />)}
        </ul>
    );
};

export default PokemonCards;