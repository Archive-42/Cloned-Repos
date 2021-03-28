import React from 'react';
import { render } from 'react-dom';

class PokemonIndex extends React.Component {

  componentDidMount () {
    this.props.requestAllPokemon();
  }

  render() {
    // debugger
    const { pokemon } = this.props 
    const pokemons = pokemon.map(poke => (
    <li key={poke.id}>{poke.name}
      <img src={poke.image_url}/>
    </li>
    ))
    return(
      <div>
        <ul className="Pokemon">
          {pokemons}
        </ul>
      </div>
    )

  }
}

export default PokemonIndex