import React from 'react';
import '../Styles/message.css';

class Message extends React.Component {
  state = {
      message:''
    }

  sendMessage = () => {
     let author = this.props.author
     this.props.saveMessage(this.state.message, author)
     this.setState({
       message:''
     })
  }

  changeState= (event) =>{
    this.setState({
      message: event.target.value
      })
  }

  render(){
    return(
      <React.Fragment>
        <h2 className="profile-messages-title">Write a new message:</h2>
        <textarea className="message" value={this.state.message} onChange={this.changeState}></textarea>
        <button className="profile-btn" onClick={() => this.sendMessage(this.state.message)}>Save</button>
      </React.Fragment>
    )
  }
}

export default Message;