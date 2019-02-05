import React from 'react';
import { shallow } from 'enzyme';
import { App } from './app';

describe('App', () => {
  function render(props = {}) {
    return shallow(<App {...props} />);
  }

  it('it renders as expected', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });
});
