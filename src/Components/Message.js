import React from 'react';
import {connect} from 'react-redux';
import {saveMessage} from '../Actions/index.js'
import '../Styles/message.css';

class MessageView extends React.Component {
  state = {
      message:'',
      error:null
    }

  sendMessage = () => {
    if(this.state.message){
      this.props.saveMessage(this.state.message)
      this.setState({
        message:'',
        error: null
      })
    }else{
      this.setState({
        error: 'You must write some message'
      })
    }
  }

  changeState= (event) =>{
    this.setState({
      message: event.target.value
      })
  }

  render(){
    return(
      <React.Fragment>
        <h2 className="profile-messages-title">Escriba un mensaje:</h2>
        <textarea className="message" value={this.state.message} onChange={this.changeState} required></textarea>
        {
          this.state.error &&
          <p>{this.state.error}</p>
        }
        <button className="profile-btn" onClick={() => this.sendMessage()}>Guardar</button>
     </React.Fragment>
    )
  }
}
const Message = connect( state => ({
  userLogged: state.userLogged
}), dispatch => ({
  saveMessage: (message) => dispatch(saveMessage(message))
}))(MessageView)

export default Message;