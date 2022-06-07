export const selectAllPokemon = ( state ) => {
  // debugger
  return Object.values(state.entities.pokemon)
  // return Object.keys(state.entities.pokemon).map(id => state.entities.pokemon[state.entities.pokemon.id]);
};