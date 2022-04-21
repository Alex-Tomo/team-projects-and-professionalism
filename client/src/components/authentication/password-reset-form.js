import React from 'react'
import AuthService from "../../services/auth.service"

class PassResetForm extends React.Component {
    constructor(props) {
        super(props)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.state = {
            password: "",
            token: "",
            loading: false,
            message: ""}
      }
onChangePassword(e) {
    e.preventDefault()
        this.setState({
            password: e.target.value
        })
        this.handleReset = (e) => {
            this.handleLogin(e)
        }
    }


      handleLogin(e) {
        e.preventDefault()
          let password = this.state.password
          let token = this.state.token
        AuthService.passChange(password, token).then(
            this.setState({message: "Password reset, you can now log into your account."})
        )
    }
    componentDidMount() {
        var url = window.location;
        var access_token = new URLSearchParams(url.search).get('token');
        this.setState({token: access_token})
    }

      render(){

         return(
            <div className="container is-max-desktop login-box-size">
            <form
                onSubmit={this.handleReset}
                ref={(c) => {
                    this.form = c
                }}
                className="box"
            >
                <h1 className="is-size-4 has-text-centered has-text-weight-bold">
                    Change Password
                </h1>
                {this.state.message && (
                    <div>
                        <div className="has-text-centered has-text-weight-bold has-text-success fade-in" role="alert">{this.state.message}</div>
                    </div>
                )}
                <div className="field">
                    <label className="label">New Password</label>
                    <div className="control">
                        <input
                            className="input"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                </div>


                <button className="sign-btn is-clickable">Change Password</button>
            </form>
        </div>
         )
      }
}

export default PassResetForm