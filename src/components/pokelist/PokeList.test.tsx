import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PokeList from "./PokeList";
configure({ adapter: new Adapter() });

describe("<PokeList/>", () => {
  it("Should render without errors", () => {
    const wrapper = shallow(<PokeList />);
    const component = wrapper.find(`[data-test="pokeListComponent"]`);
    expect(component).toHaveLength(1);
  });

  it("Should render loadMore button", () => {
    const wrapper = shallow(<PokeList />);
    const button = wrapper.find(`[data-test="loadMore"]`);
    expect(button).toHaveLength(1);
  });

  it("Should render Pokemon logo", () => {
    const wrapper = shallow(<PokeList />);
    const logo = wrapper.find(`[data-test="logo"]`);
    expect(logo).toHaveLength(1);
  });
});
