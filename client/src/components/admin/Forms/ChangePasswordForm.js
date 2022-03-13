import React from "react"
import axios from "axios"

import authHeader from "../../../services/auth-header"

/**
 * Modal for changing a users password
 *
 * @author Alex Thompson, W19007452
 */

  // TODO: add client side validation
class ChangePasswordForm extends React.Component {
  constructor(props) {
    super(props)

    let userRole = null
    switch (this.props.userDetails.roles[0].name) {
      case "user": userRole = 1; break;
      case "tutor": userRole = 3; break;
      case "admin": userRole = 2; break;
      default: userRole = 1; break;
    }

    this.state = {
      id: this.props.userDetails.id,
      name: this.props.userDetails.username,
      email: this.props.userDetails.email,
      role: userRole,
      password: "",
      repeatPassword: "",
    }
  }

  changePassword = () => {
    if (this.state.password.trim() === "") {
      this.props.showMessage("Password Cannot Be Empty!", "is-danger")
      return
    }
    if (this.state.repeatPassword.trim() === "") {
      this.props.showMessage("Passwords Do Not Match!", "is-danger")
      return
    }
    if (this.state.password !== this.state.repeatPassword) {
      this.props.showMessage("Passwords Do Not Match!", "is-danger")
      return
    }

    axios.post('http://localhost:8080/api/amin/changepassword', {
      id: this.state.id,
      password: this.state.password
    }, {
      headers: authHeader()
    }).then(() => {
      this.props.handleSubmit()
      this.props.showMessage("Password changed!", "is-success")
    }).catch(() => {
      this.props.showMessage("Could Not Change Password!", "is-danger")
    })
  }

  handlePassword = (event) => {
    this.setState({ password: event.target.value })
  }

  handleRepeatPassword = (event) => {
    this.setState({ repeatPassword: event.target.value })
  }

  render() {
    return (
      <div>
        <div className="modal-admin">
          <h1 className="title modal-title">Change Password</h1>
        </div>

        <br />
        <input
          className="input is-normal input-admin"
          type="text"
          placeholder="Username..."
          defaultValue={this.state.name}
          disabled={true} />
        <br />
        <br />

        <input
          className="input is-normal input-admin"
          type="email"
          defaultValue={this.state.email}
          placeholder="Email..."
          disabled={true} />
        <br />
        <br />

        <select
          defaultValue={this.state.role}
          className="select is-normal"
          onChange={this.handleChange}
          disabled={true}
        >
          <option value={0}>   --- Select a Role---   </option>
          <option value={1}>User</option>
          <option value={2}>Tutor</option>
          <option value={3}>Admin</option>
        </select>
        <br />
        <br />

        <input
          className="input is-normal input-admin"
          type="password"
          placeholder="Password..."
          onChange={this.handlePassword} />
        <br />
        <br />

        <input
          className="input is-normal input-admin"
          type="password"
          placeholder="Repeat Password..."
          onChange={this.handleRepeatPassword} />
        <br />
        <br />

        <button className="button" onClick={this.changePassword}>Change Password</button>
      </div>
    )
  }
}

export default ChangePasswordForm