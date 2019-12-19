import React, { Component } from 'react';
import ChatMess from 'react-simple-chatbot';

import { ThemeProvider } from 'styled-components';

import constants from '../Consts/consts'


class Messenger extends Component {


  steps = [
    {
      id: '0',
      message: constants.MESSAGE_REQ,
      trigger: '1',
    },
    {
      id: '1',
      message: () => this.props.connected ? this.props.dataFromServ : constants.NO_MESSAGE,
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: ( { value, step } ) => this.DataToServer( value, '0' ),
    }
  ]

  DataToServer = ( data, step ) => {
    this.props.sendMessage( data )
    return step
  }

  render () {

    const otherFontTheme = {
      background: '#f5f8fb',
      headerBgColor: () => this.props.connected ? '#078565' : '#fa2c0c',
      headerFontColor: '#fff',
      headerFontSize: '16px',
      botBubbleColor: () => this.props.connected ? '#078565' : '#fa2c0c',
      botFontColor: '#fff',
      userBubbleColor: '#fff',
      userFontColor: '#4a4a4a'
    };


    const setting = {
      style: { margin: 'auto' },
      headerTitle: this.props.head,
      botAvatar: constants.ICON_IMAGE,
      footerStyle: { background: '#d0e6fc' },
      userDelay: 0,
      customDelay: 0,
      botDelay: 1000,
      steps: this.steps,
    }

    return (
      <ThemeProvider theme={ otherFontTheme }>
        <ChatMess { ...setting } />
      </ThemeProvider>

    );
  }
}

export default Messenger;
