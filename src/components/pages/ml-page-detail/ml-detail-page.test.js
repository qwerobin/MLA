import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import MLDetail from '../../ml-detail/ml-detail';
import MLDetailPage from './ml-detail-page';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('ML-detail-page', () => {
  let data = {
    q: '',
    dataReturned: [],
    pictures: [],
    categories: [],
    author: '',
  }
  it('should mount ML-detail-page in a full DOM', function() {
    expect(mount(<MLDetail dataItem={data}/>).find('.ML_Detail_page').length)
  });
})