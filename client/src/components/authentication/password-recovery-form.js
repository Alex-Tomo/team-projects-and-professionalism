import React from 'react'
import AuthService from "../../services/auth.service"
import Reaptcha from 'reaptcha';

class PassRecoverForm extends React.Component {
    constructor(props) {
        super(props)
        this.onChangeUsername = this.onChangeUsername.bind(this)
        this.state = {
            username: "",
            loading: false,
            message: "",
            verified: false,
            hideForm: false,
            btnMessage: "Reset Password"
        }
      }

      onVerify = recaptchaResponse => {
        this.setState({
          verified: true
        });
        var element = document.getElementById("submit-btn");
        element.classList.remove("sign-btn-disabled");
        element.classList.add("sign-btn");
      };

      onFormHiding = () => {
          this.setState({ hideForm: true, btnMessage: "Email Sent"})
          var element = document.getElementById("submit-btn");
          element.classList.remove("sign-btn");
          element.classList.add("sign-btn-disabled");
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
          let btnMessage = this.state.btnMessage
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
                    <div className="wrapper"> <svg className="checkmark"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
            </div>
                )}
                {this.state.message && (
                    <div>
                        <div className="has-text-centered has-text-weight-bold has-text-success fade-in" role="alert">{this.state.message}</div>
                    </div>
                )}
                                <div className="field">
                                {!this.state.hideForm ? <label className="label">Username</label> : null}
                                <div className="control">
                                {!this.state.hideForm ? <input
                                        className="input"
                                        type="text"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                    /> : null}
                                </div>
                                <br></br>
                                <Reaptcha  className="g-recaptcha" sitekey="6LdV3dQeAAAAAIJVDWQ7UNjvGj03Jmzp0nkEduIg" onVerify={this.onVerify} />
                            <br></br>
                            </div>  
                            <button id="submit-btn" disabled={!this.state.verified} onClick={this.onFormHiding} className="sign-btn-disabled is-clickable">{btnMessage}</button>
            </form>
        </div>

        
         )
         
      }
      
}

export default PassRecoverForm