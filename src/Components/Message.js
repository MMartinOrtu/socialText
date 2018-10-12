import React from 'react';

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
        <div>
          <h2>Write a new message</h2>
          <textarea value={this.state.message} onChange={this.changeState}></textarea>
          <button onClick={() => this.sendMessage(this.state.message)}>Save</button>
        </div>
    )
  }
}

export default Message;