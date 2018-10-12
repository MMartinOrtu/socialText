import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    state = {
        loginData: {login: '', passwd:''},
      }
      submit = (event) => {
        event.preventDefault()
        const {login, passwd} = this.state.loginData
        this.props.checklogin(login, passwd)
      }
      changeState = (field) => (event) => this.setState({
        loginData: {
          ...this.state.loginData,
          [field]: event.target.value
        }
      })
    render(){
        const {islogged, currentUser}= this.props
        return (
            <div>
                {
                    islogged ?
                    <p>Hola{currentUser.fullname}
                    <Link to="/"><span onClick={this.props.logOut}>Log out</span></Link>
                    </p>  :
                <form onSubmit={this.submit}>
                    <div>
                        <label>Login&nbsp;<input type= "text" value={this.state.loginData.login} onChange={this.changeState('login')} autoComplete="username"/></label>
                    </div>
                    <div>
                        <label>Password&nbsp;
                        <input type="password" value={this.state.loginData.passwd} onChange={this.changeState('passwd')} autoComplete="current-password"/>
                        </label>
                    </div>
                    <div>
                         <input type="submit" value="Login" />
                    </div>
                </form>
                }
            </div>
        )
    }
}

export default Login;