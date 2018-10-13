import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    state = {
        login:'',
        password:''
    }

    submit = (event) => {
        event.preventDefault()
        const {login, password} = this.state
        this.props.checklogin(login, password)
    }

    changeState = (field) => (event) => this.setState({
        [field]: event.target.value
    })

    render(){
        const {islogged, currentUser, loginError}= this.props
        return (
         <div>
            {
                islogged ?
                <p>Hola&nbsp;{currentUser.fullname}
                <Link to="/"><span onClick={this.props.logOut}>Log out</span></Link>
                </p>  :

                <form onSubmit={this.submit}>
                    <div>
                        <label>Login&nbsp;<input type= "text" value={this.state.login} onChange={(e) => this.changeState('login')(e)} autoComplete="username"/></label>
                    </div>
                    <div>
                        <label>Password&nbsp;<input type="password" value={this.state.password} onChange={(e) => this.changeState('password')(e)} autoComplete="current-password"/></label>

                    </div>
                    {
                        loginError &&
                        <span style={{color: 'red'}}>
                        { 'Usuario o contraseña incorrectas'  }
                        </span>
                    }
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