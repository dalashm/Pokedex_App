import { Component } from "react";
import "./PokeDetails.css";

export default class PokeDetails extends Component<any> {
  render() {
    const { name, order, types, moves, stats, abilities, id } = this.props;
    return (
      <div className="container text-light mt-5 text-dark">
        <div className="jumbotron pt-1">
          <div className="w-100 my-5 d-flex justify-content-center">
            <img
              className="pokeDetailsImg"
              alt={name}
              src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`}
            />
          </div>
          <p className="lead text-center info">Name : {name}</p>
          <p className="lead text-center info">
            Types :{" "}
            {types
              .map((type: any) => {
                return type.type.name;
              })
              .join(",")}
          </p>
          <p className="lead text-center info">Order : {order}</p>
          <p className="lead text-center info">
            Abilities :{" "}
            {abilities
              .map((ability: any) => {
                return ability.ability.name;
              })
              .join(",")}
          </p>
          <p className="lead text-center info">
            States :
            {stats
              .map((stat: any) => {
                return stat.stat.name;
              })
              .join(",")}
          </p>
          <p className="lead text-center info">
            Moves :{" "}
            {moves
              .map((move: any) => {
                return move.move.name;
              })
              .join(",")}
          </p>
          <div className="d-flex justify-content-center">
            <button
              data-test="loadMore"
              className="btn btn-info mr-0"
              type="button"
              onClick={this.props.getAllPokemon}
            >
              See All Pokemons
            </button>
          </div>
        </div>
      </div>
    );
  }
}
