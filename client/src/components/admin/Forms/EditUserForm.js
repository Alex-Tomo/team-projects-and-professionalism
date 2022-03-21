import React from "react"
import axios from "axios"

import authHeader from "../../../services/auth-header"

/**
 * Displays the Modal for editing an existing users details
 *
 * @author Alex Thompson, W19007452
 */

class EditUserForm extends React.Component {
  constructor(props) {
    super(props)

    let userRole = null
    switch (this.props.userDetails.roles[0].name) {
      case "user":
        userRole = '1';
        break;
      case "tutor":
        userRole = '3';
        break;
      case "admin":
        userRole = '2';
        break;
    }

    this.state = {
      username: this.props.userDetails.username,
      email: this.props.userDetails.email,
      role: userRole,
      id: this.props.userDetails.id
    }
  }

  handleUsername = (event) => {
    this.setState({username: event.target.value})
  }

  handleEmail = (event) => {
    this.setState({email: event.target.value})
  }

  handleChange = (event) => {
    this.setState({role: event.target.value})
  }

  updateUser = () => {
    if (this.state.username.trim() === "") {
      this.props.showMessage("Username Cannot Be Empty!", "is-danger")
      return
    }
    if (this.state.username.trim().includes(" ")) {
      this.props.showMessage("Username Cannot Contain Spaces!", "is-danger")
      return
    }
    if ((this.state.username.length <= 7) || (this.state.username.length > 32)) {
      this.props.showMessage("Username Must Be Between 8 and 32 Characters!", "is-danger")
      return
    }

    if (this.state.email.trim() === "") {
      this.props.showMessage("Email Cannot Be Empty!", "is-danger")
      return
    }
    if (this.state.email.trim().includes(" ")) {
      this.props.showMessage("Email Cannot Contain Spaces!", "is-danger")
      return
    }

    if (this.state.role < 1 || this.state.role > 3) {
      this.props.showMessage("Invalid Role Selected!", "is-danger")
      return
    }

    if (
        (this.state.username === this.props.userDetails.username) &&
        (this.state.email === this.props.userDetails.email) &&
        (parseInt(this.state.role) === parseInt(this.props.userDetails.roles[0].id))
    ) {
      this.props.showMessage("All Fields Are The Same!", "is-danger")
      return
    }

    let roles = []
    switch (this.state.role) {
      case '1':
        roles.push('user');
        break;
      case '3':
        roles.push('tutor');
        break;
      case '2':
        roles.push('admin');
        break;
    }

    axios.post('http://localhost:8080/api/admin/edituser',
  {
        id: this.state.id,
        username: (this.state.username === this.props.userDetails.username) ? null : this.state.username,
        email: (this.state.email === this.props.userDetails.email) ? null : this.state.email,
        role: (parseInt(this.state.role) === parseInt(this.props.userDetails.roles[0].id)) ? null : this.state.role,
        roles: roles
      },
      {
        headers: authHeader()
      })
        .then(() => {
          this.props.handleSubmit()
          this.props.showMessage("User Updated!", "is-success")

          this.props.handleEditUser({
            id: this.state.id,
            username: this.state.username,
            email: this.state.email,
            createdAt: this.props.userDetails.createdAt,
            user_added_bies: [{
              added_by_name: JSON.parse(localStorage.getItem('user')).username
            }],
            roles: [{
              id: this.state.role,
              name: roles[0]
            }]
          })
        }).catch((error) => {
          console.log(error)
          this.props.showMessage("Could Not Update User!", "is-danger")
        })
  }

  render() {
    return (
      <div>
        <div className="modal-admin">
          <h4 className="title modal-title">Edit existing user</h4>
        </div>

        <hr className="admin-modal-hr" />

        <div className="admin-modal-container">
          <label className="admin-modal-label">Username</label>
          <input
              type="text"
              className="input is-normal admin-modal-input"
              defaultValue={this.state.username}
              onChange={this.handleUsername}
              placeholder="Username..."
          />
        </div>


        <div className="admin-modal-container">
          <label className="admin-modal-label">Email</label>
          <input
              type="email"
              onChange={this.handleEmail}
              className="input is-normal admin-modal-input"
              defaultValue={this.state.email}
              placeholder="Email..." />
        </div>

        <div className="admin-modal-container">
          <label className="admin-modal-label">Role</label>
          <select
              style={{color: (this.state.role === 0) ? "lightgray" : ""}}
              className="select is-normal admin-modal-select"
              defaultValue={this.state.role}
              name="role"
              onChange={this.handleChange}
          >
            <option value={0} hidden={true}>Select a role</option>
            <option value={1} className="admin-modal-option">User</option>
            {(JSON.parse(localStorage.getItem('user')).roles[0] === "ROLE_ADMIN") ? <option value={3} style={{color: "black"}}>Tutor</option> : ""}
            {/*<option value={2} className="admin-modal-option">Admin</option>*/}
          </select>
        </div>

        <hr className="admin-modal-hr" />

        <div className="admin-modal-button-container">
          <button
            className="button admin-modal-submit-button"
            onClick={this.updateUser}
          >
            Save changes
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

export default EditUserForm