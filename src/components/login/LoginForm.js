import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import TextInput from '../common/TextInput';

const LoginForm = ({user, onLogin, logging, onTextChange}) => {
  const trueValue = true;
  return (
    <div className="login-container">
      <div className="header">Login</div>
      <TextInput
        name="userName"
        label="userName"
        onChange={onTextChange}
        className="input"
        placeholder="Username"
        value={user.userName}
      />
      <TextInput
        name="password"
        label="password"
        onChange={onTextChange}
        className="input"
        placeholder="Password"
        value={user.password}
        secureTextEntry={trueValue}/>

      <input
        type="submit"
        disabled={logging}
        value={logging ? 'Login...' : 'Login'}
        className="button"
        onClick={onLogin}/>

    </div>
  );
};

LoginForm.propTypes = {
  user: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired,
  logging: PropTypes.bool.isRequired,
  onTextChange: PropTypes.func.isRequired
};

export default LoginForm;
