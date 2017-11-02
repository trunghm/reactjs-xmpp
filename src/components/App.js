/* eslint-disable import/default */
// This component handles the App template used on every page.
import React from 'react';
import PropTypes from 'prop-types';
import Header from './common/Header';
import WebIM from '../lib/webIM';
import {connect} from 'react-redux';
import * as LoginActions from '../actions/loginActions';
import configureStore from '../store/configureStore';
const store = configureStore();


class App extends React.Component {
  constructor(props, context){
    super(props, context);
    WebIM.conn.listen({
      // xmpp connected successfully
      onOpened: (msg) => {
        // send notification if presence
        WebIM.conn.setPresence();
        // get contacts
        //store.dispatch(RosterActions.getContacts());
        // login succeed
        store.dispatch(LoginActions.loginSuccess(msg));
/*        // get blacklist
        store.dispatch(BlacklistActions.getBlacklist());
        // get group list
        store.dispatch(GroupActions.getGroups());

        NavigationActions.contacts();*/
      },

      // presence status
      onPresence: (msg) => {
        console.debug('onPresence', msg);
        /*console.debug('onPresence', msg, store.getState());
        switch (msg.type) {
          case 'subscribe':
            // Add friend is a process of two ways subscription
            // if both parties agree to add each other as friend, then one party will subscribe automatically
            // Does not need notification, indicated as state=[resp:true]
            if (msg.status === '[resp:true]') {
              return;
            }
            store.dispatch(SubscribeActions.addSubscribe(msg));
            break;
          case 'subscribed':
            store.dispatch(RosterActions.getContacts());
            Alert.alert(msg.from + ' ' + I18n.t('subscribed'));
            break;
          case 'unsubscribe':
            // TODO: partial UI refresh
            store.dispatch(RosterActions.getContacts());
            break;
          case 'unsubscribed':
            // un-friended
            store.dispatch(RosterActions.getContacts());
            Alert.alert(msg.from + ' ' + I18n.t('unsubscribed'));
            break;
        }*/
      },

      // Errors
      onError: (error) => {
        console.log(error);

        // 16: server-side close the websocket connection
        /*if (error.type == WebIM.statusCode.WEBIM_CONNCTION_DISCONNECTED) {
          console.log('WEBIM_CONNCTION_DISCONNECTED', WebIM.conn.autoReconnectNumTotal, WebIM.conn.autoReconnectNumMax);
          if (WebIM.conn.autoReconnectNumTotal < WebIM.conn.autoReconnectNumMax) {
            return;
          }
          Alert.alert('Error', 'server-side close the websocket connection');
          NavigationActions.login();
          return;
        }
        // 8: logout due to l
        if (error.type == WebIM.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
          console.log('WEBIM_CONNCTION_SERVER_ERROR');
          Alert.alert('Error', 'offline by multi login');
          NavigationActions.login();
          return;
        }
        // login error
        if (error.type == 1) {
          let data = error.data ? error.data.data : '';
          data && Alert.alert('Error', data);
          store.dispatch(LoginActions.loginFailure(error));
        }*/
      },

      // disconnected
      onClosed: (msg) => {
        console.log('onClosed');
      },

      // blacklist updated
      onBlacklistUpdate: (list) => {
        /*store.dispatch(BlacklistActions.updateBlacklist(list));*/
      },

      // text message received
      onTextMessage: (message) => {
        console.log('onTextMessage', message);
        /*store.dispatch(MessageActions.addMessage(message, 'txt'));*/
      },

      // picture message received
      onPictureMessage: (message) => {
        console.log('onPictureMessage', message);
        /*store.dispatch(MessageActions.addMessage(message, 'img'));*/
      }
    });

  }
  render() {
    return (
      <div className="container-fluid">
        <Header
          loading={this.props.loading}
        />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}

export default connect(mapStateToProps)(App);
