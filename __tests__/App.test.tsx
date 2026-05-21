/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('../src/navigations', () => {
  const ReactMock = require('react');
  const { View } = require('react-native');
  return () => ReactMock.createElement(View, { testID: 'app-nav' });
});

import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
