import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Footer from '../../components/layout/Footer';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

afterEach(cleanup);

it('renders Login component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Footer/>, div); 
  ReactDOM.unmountComponentAtNode(div);
});

it('renders button correctly', () => {
  const {getByTestId} = render(<Footer />);
  expect(getByTestId('link')).toHaveTextContent("abourgho"); 
});

it('matches snapshot', () => {
  const tree = renderer.create(<Footer />).toJSON(); 
  expect(tree).toMatchSnapshot(); 
}); 

it("should go to the correct link", () => {
  const utils = render(<Footer />)
  const link = utils.getByTestId('link')
  expect(link.closest('a')).toHaveAttribute('href', "https://github.com/AmmarBourghoud/namR")
});