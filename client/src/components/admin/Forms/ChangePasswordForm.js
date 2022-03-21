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
      case "user": userRole = "User"; break;
      case "tutor": userRole = "Tutor"; break;
      case "admin": userRole = "Admin"; break;
      default: userRole = "Select a role"; break;
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
          <h4 className="title modal-title">Change password</h4>
        </div>
        <hr className="admin-modal-hr" />

        <div className="admin-modal-container">
          <label className="admin-modal-label">Username</label>
          <input
            className="input is-normal admin-modal-input"
            type="text"
            placeholder="Username..."
            defaultValue={this.state.name}
            disabled={true} />
        </div>

        <div className="admin-modal-container">
          <label className="admin-modal-label">Email</label>
          <input
            className="input is-normal admin-modal-input"
            type="email"
            defaultValue={this.state.email}
            placeholder="Email..."
            disabled={true} />
        </div>

        <div className="admin-modal-container">
          <label className="admin-modal-label">Role</label>
          <input
            className="input is-normal admin-modal-input"
            type="email"
            defaultValue={this.state.role}
            placeholder="Email..."
            disabled={true} />
        </div>

        <div className="admin-modal-container">
          <label className="admin-modal-label">Password</label>
          <input
            className="input is-normal admin-modal-input"
            type="password"
            placeholder="Password"
            onChange={this.handlePassword} />
      </div>

        <div className="admin-modal-container">
          <label className="admin-modal-label">Confirm password</label>
          <input
            className="input is-normal admin-modal-input"
            type="password"
            placeholder="Confirm password"
            onChange={this.handleRepeatPassword} />
      </div>

        <hr className="admin-modal-hr" />

        <div className="admin-modal-button-container">
          <button
            className="button admin-modal-submit-button"
            onClick={this.changePassword}
          >
            Update password
          </button>
          <button
            className="button admin-modal-cancel-button"
            onClick={this.props.closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }
}

export default ChangePasswordForm