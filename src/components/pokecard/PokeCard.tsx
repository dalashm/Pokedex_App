import { Component } from "react";
import "./PokeCard.css";

//Define Data-Types of props which passed from PokeList Component
interface PokeCardProps {
  pokemon: {
    name: string;
    id: number;
    sprites: any;
    order: number;
    moves: { move: { name: string } }[];
    types: { type: { name: string } }[];
    abilities: { ability: { name: string } }[];
    stats: { stat: { name: string } }[];
  };
  getPokemon: any;
}
export default class PokeCard extends Component<PokeCardProps> {
  getPokemon = () => {
    this.props.getPokemon(this.props.pokemon.id);
  };

  render() {
    const { sprites, name, types, abilities, order } = this.props.pokemon;
    return (
      <div className="card ml-4 mb-4">
        <div className="d-flex justify-content-center img">
          <img
            src={sprites["front_default"]}
            className="card-img-top pokeimage"
            alt={name}
          />
          <img
            src={sprites["back_default"]}
            className="card-img-top pokeimage"
            alt={name}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title pokeName"> {name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Types:{" "}
            {types
              .map((type) => {
                return type.type.name;
              })
              .join(",")}
          </li>
          <li className="list-group-item">
            Abilities:{" "}
            {abilities
              .map((ability) => {
                return ability.ability.name;
              })
              .join(",")}
          </li>
          <li className="list-group-item order">Order: {order}</li>
        </ul>
        <div className="card-body">
          <button
            data-test="loadMore"
            className="btn btn-info mr-0"
            type="button"
            onClick={this.getPokemon}
          >
            More Details
          </button>
        </div>
      </div>
    );
  }
}
