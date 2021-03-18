import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";
import PokemonList from "./components/pokelist/PokeList";
configure({ adapter: new Adapter() });

describe("<App/>", () => {
  it("Should render without errors", () => {
    const wrapper = shallow(<App />);
    const component = wrapper.find(PokemonList);
    expect(component).toHaveLength(1);
  });
});
