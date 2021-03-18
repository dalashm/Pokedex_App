import axios from "axios";
import { Component } from "react";
import PokeDetails from "../pokedetails/PokeDetails";
import PokeCard from "../pokecard/PokeCard";
import "./PokeList.css";

//Define State´s Data-Types For PokeList Component
interface PokeListState {
  pokemons: any[];
  pokemonsDetails: any[];
  singlePokeDetails: any;
  offset: number;
}
const loadNumber = 12;

export default class PokeList extends Component {
  //Create State For PokeList Component
  state: PokeListState = {
    pokemons: [],
    pokemonsDetails: [],
    singlePokeDetails: null,
    offset: 0,
  };

  componentDidMount() {
    this.getPokemons();
  }

  getNextOffset = () => {
    return this.state.offset + loadNumber;
  };

  // Increase The Offset With Every Call
  getMorePokemons = () => {
    const newOffset = this.getNextOffset();
    this.setState({ offset: newOffset }, () => {
      this.getPokemons();
    });
  };

  getAllPokemon = () => {
    this.setState({ singlePokeDetails: null });
  };

  //Show Single Pokemon Data By ID
  getSinglePokemon = (id: string) => {
    const singlePokeDetails = this.state.pokemonsDetails.filter(
      (item) => item.id === id
    );
    if (singlePokeDetails.length > 0) {
      this.setState({ singlePokeDetails: singlePokeDetails[0] });
    } else {
      this.setState({ singlePokeDetails: null });
    }
  };

  //Fetching Pokemon´s Data from Pokeapi Using Axios Library And Async Await Function
  getPokemons = async () => {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=${this.state.offset} +&limit=${loadNumber}`;
    const { data } = await axios.get(url);
    this.setState({ pokemons: data.results });
    return this.state.pokemons.map(async (pokemon) => {
      const { data }: any = await axios.get(pokemon.url);
      const pokeArray = this.state.pokemonsDetails;
      pokeArray.push(data);
      this.setState({ pokemonsDetails: pokeArray });
    });
  };

  //Mapping Through pokemonsDetails Array To Fetch All Elements And Pass Them To Pokecard Component As A Props
  renderedPokeList = () => {
    const { pokemonsDetails } = this.state;
    return pokemonsDetails.map((pokemon) => {
      return (
        <div key={pokemon.id} className="col-12 col-md-6 col-lg-4">
          <PokeCard pokemon={pokemon} getPokemon={this.getSinglePokemon} />
        </div>
      );
    });
  };

  render() {
    const { singlePokeDetails } = this.state;
    if (singlePokeDetails) {
      const { name, order, types, moves, stats, abilities, id } = singlePokeDetails;

      return (
        <PokeDetails
          name={name}
          order={order}
          types={types}
          moves={moves}
          stats={stats}
          abilities={abilities}
          id={id}
          getAllPokemon={this.getAllPokemon}
        />
      );
    }

    return (
      <div data-test="pokeListComponent">
        <div className="mt-5 text-center">
          <img
            data-test="logo"
            className="logo"
            src="Pokemon.png"
            alt="Pokemon"
          />
        </div>
        <div className="container mt-5">
          <div className="row">{this.renderedPokeList()}</div>
        </div>
        <div className="d-flex justify-content-center my-3">
          <button
            data-test="loadMore"
            className="btn mr-0"
            type="button"
            onClick={this.getMorePokemons}
          >
            <img className="ball" src="pokeball.svg" alt="PokeBall" />
          </button>
        </div>
      </div>
    );
  }
}
