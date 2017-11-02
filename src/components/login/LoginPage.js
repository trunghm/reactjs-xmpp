import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoginForm from './LoginForm';
import * as loginActions from '../../actions/loginActions';
import {browserHistory} from 'react-router';
import './style.css';


class LoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onTextChange = this.onTextChange.bind(this);
    this.handlePressLogin = this.handlePressLogin.bind(this);
    this.state = {
      user: {username: '', password: ''},
      logging: false
    };
    this.isAttempting = false;
  }

  onTextChange(event) {
    const field = event.target.name;
    let user = Object.assign({}, this.state.user);
    user[field] = event.target.value;
    return this.setState({user: user});
  }

  redirectToAddCoursePage() {
    browserHistory.push('/home');
  }

  onLogin(user) {
    this.redirectToAddCoursePage();
  }

  handlePressLogin() {
    const {username, password} = this.state.user;

    this.isAttempting = true;
    // attempt a login - a reducer is listening to pick it up from here.
    this.props.actions.login(username, password);
  }

  render() {
    return (
      <LoginForm
        user={this.state.user}
        onLogin={this.handlePressLogin}
        logging={this.state.logging}
        onTextChange={this.onTextChange}/>

    );
  }
}

LoginPage.propTypes = {
  actions: PropTypes.object.isRequired
};


function mapStateToProps(state, ownProps) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
