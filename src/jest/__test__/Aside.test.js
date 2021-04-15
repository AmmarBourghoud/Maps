import { render, cleanup, fireEvent } from '@testing-library/react';
import Aisde from '../../components/layout/Aisde';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

afterEach(cleanup);

it('renders Aside component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Aisde/>, div); 
  ReactDOM.unmountComponentAtNode(div);
});

it('renders list correctly', () => {
  const {getByTestId} = render(<Aisde />);
  expect(getByTestId('list')).toHaveTextContent("view"); 
});

it('matches snapshot', () => {
  const tree = renderer.create(<Aisde />).toJSON(); 
  expect(tree).toMatchSnapshot(); 
}); 

const setup = () => {
  const utils = render(<Aisde />)
  const open = utils.getByTestId('icon')
  return {
    open,
    ...utils,
  }
}

it("should update open status on click", () => {
  const {open} = setup();
  fireEvent.click(open, { target: { setOpen: true } })
  expect(open.setOpen).toBe(true)
});