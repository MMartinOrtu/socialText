import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/login.css';

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
         <div className="login">
            {
                islogged ?
                <p className="logged-message">¡Hola&nbsp;&nbsp;{currentUser.fullname}!&nbsp;&nbsp;
                <Link className="logout" to="/"><span  onClick={this.props.logOut}>Log out</span></Link>
                </p>  :

                <form className="login-form" onSubmit={this.submit}>
                    <div className="login-item">
                        <label>Ussuario:&nbsp;<input className="input-item" type= "text" value={this.state.login} onChange={(e) => this.changeState('login')(e)} autoComplete="username"/></label>
                    </div>
                    <div className="login-item">
                        <label>Contraseña:&nbsp;<input className="input-item" type="password" value={this.state.password} onChange={(e) => this.changeState('password')(e)} autoComplete="current-password"/></label>

                    </div>
                    <div className="login-item">
                    {
                        loginError &&
                        <p className="error">Usuario o contraseña incorrectos</p>
                    }
                        <input className="button-item" type="submit" value="Login" />
                    </div>

                </form>
            }
         </div>
        )
}
}

export default Login;