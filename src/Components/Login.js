import React from 'react';

class Login extends React.Component {
    state = {
        formData: {login: '', passwd:''},
      }
     /*  validate = () =>
        this.state.formData.passwd === this.state.formData.repeat_passwd */

      submit = (event) => {
        event.preventDefault()
        const {login, passwd} = this.state.formData
        this.props.checklogin(login, passwd)
       /*  if (this.validate()) {
          const {login, passwd} = this.state.formData
          
        } */
       /*  else{
          this.setState({
            errors: {passwd: -ERRORS.DONTMATCH}
          })
        } */
      }
      changeState = (field) => (event) => this.setState({
        formData: {
          ...this.state.formData,
          [field]: event.target.value,
        }
      })
    render(){
        return (
            <form onSubmit={this.submit}>
                <div>
                    <label>Login&nbsp;<input value={this.state.formData.login} onChange={this.changeState('login')} autoComplete="username"/></label>
                </div>
                <div>
                    <label>Password&nbsp;
                    <input type="password" value={this.state.formData.passwd} onChange={this.changeState('passwd')} autoComplete="current-password"/>
                    </label>
                </div>
                <div>
                    <input type="submit" value="Login" />
                </div>
            </form>
        )
    }
}

export default Login;