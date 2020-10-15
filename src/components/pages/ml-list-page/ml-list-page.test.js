import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MLTableProducts from '../../ml-table-products/ml-table-products';
import MLBreadCrum from '../../ml-breadcrum/ml-breadcrum';
import sinon from 'sinon';

configure({ adapter: new Adapter() });

describe('ML-list-page > MLBreadCrum', () => {
  let data = {
    q: '',
    dataBread: [],
  }
  it('should mount MLBreadCrum in a full DOM', function() {
    expect(mount(<MLBreadCrum dataBread={data.dataBread} keyData={data.q}/>).find('.ML-breadcrum-container').length)
  });
})

describe('ML-list-page > MLTableProducts', () => {
  let data = {
    data: [],
  }
  it('should mount MLTableProducts in a full DOM', function() {
    expect(mount(<MLTableProducts data={data.data}/>).find('.ML-table-products-container').length)
  });
})

describe('Call in didmount', ()=> {
  let data = {
    data: [],
  }
  it('Correctly updates the state after AJAX call in `componentDidMount` was made', () => {
    const server = sinon.fakeServer.create();
    server.respondWith('GET', 'https://localhost:/api/items?s=perro', [
      200,
      {
        'Content-Type': 'application/json',
        'Content-Length': 0
      },
      '[]'
    ]);
    let wrapper = mount(<MLTableProducts data={data.data}/>);
    server.respond();
    server.restore();
    expect(wrapper.update().state().data).to.be.instanceof(Array);
  });
})