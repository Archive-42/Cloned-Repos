import { connect } from 'react-redux';
import { selectAllPokemon } from "../../reducers/selectors";
import PokemonIndex from './pokemon_index.jsx';
import { requestAllPokemon } from '../../actions/pokemon_actions'



const mapStateToProps = state => {
  // debugger
  return {
  pokemon: selectAllPokemon(state)
  }
};

const mapDispatchToProps = dispatch => ({
  requestAllPokemon: () => dispatch(requestAllPokemon())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonIndex);

