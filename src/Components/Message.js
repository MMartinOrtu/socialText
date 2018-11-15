import React from 'react';
import '../Styles/message.css';

class Message extends React.Component {
  state = {
      message:null,
      error:null
    }

  sendMessage = () => {
    if(this.state.message){
      let author = this.props.author
      this.props.saveMessage(this.state.message, author)
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
        <button className="profile-btn" onClick={() => this.sendMessage(this.state.message)}>Guardar</button>
     </React.Fragment>
    )
  }
}

export default Message;