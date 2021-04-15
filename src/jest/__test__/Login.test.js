import { render, cleanup, fireEvent } from '@testing-library/react';
import Login from '../../components/views/Login';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

afterEach(cleanup);

it('renders Login component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Login/>, div); 
  ReactDOM.unmountComponentAtNode(div);
});

it('renders button correctly', () => {
  const {getByTestId} = render(<Login />);
  expect(getByTestId('button')).toHaveTextContent("Se connecter"); 
});

it('renders email form text field', () => {
  const {getByTestId} = render(<Login />);
  expect(getByTestId('mail')).toHaveTextContent("admin@admin.com"); 
});

it('renders password form text field', () => {
  const {getByTestId} = render(<Login />);
  expect(getByTestId('password')).toHaveTextContent("admin"); 
});

it('matches snapshot', () => {
  const tree = renderer.create(<Login />).toJSON(); 
  expect(tree).toMatchSnapshot(); 
}); 

const setup = () => {
  const utils = render(<Login />)
  const inputMail = utils.getByTestId('mail')
  const inputPassword = utils.getByTestId('password')
  return {
    inputMail,
    inputPassword,
    ...utils,
  }
}

it("should update mail on change", () => {
  const {inputMail} = setup();
  fireEvent.change(inputMail, { target: { mail: 'admin@admin' } })
  expect(inputMail.mail).toBe('admin@admin')
});

it("should update password on change", () => {
  const {inputPassword} = setup();
  fireEvent.change(inputPassword, { target: { password: 'admin' } })
  expect(inputPassword.password).toBe('admin')
});

