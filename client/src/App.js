import React, { Component } from 'react';
import Websocket from 'react-websocket';

import Messenger from './Messenger/Messenger'

import constants from './Consts/consts'

class App extends Component {

  state = {
    inv: false,
    dataFromServ: '',
    dataToServ: '',
    connected: false,
    dataReady: false,
    head: constants.NO_CONNECT,
  }

  handleDataFromSever = async ( data ) => {

    await this.setState( {
      inv: !this.state.inv,
      dataFromServ: data,
      dataReady: true,
    } )


    if ( this.state.head === constants.NO_CONNECT ) {
      this.setState( {
        inv: !this.state.inv,
        head: data
      } )

    }
  }

  handleOpen = async () => {
    await this.setState( {
      inv: !this.state.inv,
      connected: true,
      dataReady: false,
    } )
    this.refWebSocket.sendMessage( constants.CONNECTED );
  }

  handleClose = async () => {
    await this.setState( {
      inv: !this.state.inv,
      connected: false,
    } )

    if ( !this.state.connected ) {
      await this.setState( {
        inv: !this.state.inv,
        head: constants.NO_CONNECT
      } )
    }
  }

  sendMessage = ( data ) => {
    if ( this.state.connected ) {
      this.refWebSocket.sendMessage( data );
    }
  }


  render () {

    const optonForMessenger = {
      connected: this.state.connected,
      dataFromServ: this.state.dataFromServ,
      head: this.state.head,
      sendMessage: ( data ) => this.sendMessage( data )
    }

    return (

      <div>
        <Websocket url={ constants.URL_WEBSERV_WINSOCK }
          onMessage={ this.handleDataFromSever }
          onOpen={ this.handleOpen }
          onClose={ this.handleClose }
          reconnect={ true }
          debug={ true }
          ref={ Websocket => {
            this.refWebSocket = Websocket;
          } }
        />
        <Messenger { ...optonForMessenger } />
      </div>
    );
  }
}

export default App;
