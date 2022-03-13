import React from 'react'
import AuthService from "../services/auth.service"

class PassRecover extends React.Component {
    constructor(props) {
        super(props)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.state = {
            username: "",
            loading: false,
            message: ""}
      }
onChangeUsername(e) {
    e.preventDefault()
        this.setState({
            username: e.target.value
            
        })
        this.handleReset = (e) => {
            this.handleLogin(e)
        }
    }


      handleLogin(e) {
        e.preventDefault()
          let username = this.state.username
        AuthService.passReset(username).then(
            this.setState({message: "If your username matches our records you will be sent a password reset email (remember to check your spam folder)."})
        )
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
                    Password Reset
                </h1>
                {this.state.message && (
                    <div>
                        <div className="has-text-centered has-text-weight-bold has-text-success fade-in" role="alert">{this.state.message}</div>
                    </div>
                )}
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                </div>


                <button className="sign-btn is-clickable">Reset Password</button>
            </form>
        </div>
         )
      }
}

export default PassRecover