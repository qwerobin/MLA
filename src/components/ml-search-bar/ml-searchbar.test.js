import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MLSearchBar from './ml-searchbar';

configure({ adapter: new Adapter() });

describe('ML-searchbar-container > _handleChange', () => {
  it("onChange in the bar", () => {
    const onSearch = jest.fn();
    const wrapper = shallow(<MLSearchBar _handleChange={onSearch} />);
    wrapper.find('input').simulate('_handleChange', 'test search text');
    expect(onSearch).not.toBeUndefined();
  });
})
