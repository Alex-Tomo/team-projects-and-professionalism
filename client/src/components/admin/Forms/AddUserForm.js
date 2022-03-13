import React from "react"
import axios from "axios"
import authHeader from "../../../services/auth-header"

/**
 * Displays the Modal for adding a new user
 *
 * @author Alex Thompson, W19007452
 */


  // TODO: add client side validation
  // TODO: When user is added make sure to add the added by column value
class AddUserForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      role: 1
    }
  }

  handleChange = (event) => {
    this.setState({role: event.target.value})
  }

  addUser = () => {
    if (this.state.username.trim() === "") {
      this.props.showMessage("Username Cannot Be Empty!", "is-danger")
      return
    }
    if (this.state.email.trim() === "") {
      this.props.showMessage("Email Cannot Be Empty!", "is-danger")
      return
    }
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
    if (this.state.role < 1 || this.state.role > 3) {
      this.props.showMessage("Invalid Role Selected!", "is-danger")
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

    axios.post('http://localhost:8080/api/admin/adduser', {
          addedById: JSON.parse(localStorage.getItem('user')).id,
          addedByUsername: JSON.parse(localStorage.getItem('user')).username,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          role: this.state.role,
          roles: roles
        },
        {
          headers: authHeader()
        }).then((result) => {
      this.props.handleSubmit()
      this.props.showMessage("New User Added!", "is-success")

      this.props.handleAddUser({
        id: result.data.id,
        username: this.state.username,
        email: this.state.email,
        createdAt: new Date().toISOString(),
        roles: [
          {
            id: this.state.role,
            name: roles[0]
          }
        ]
      })
    }).catch(e => {
      this.props.showMessage("Could Not Add User!", "is-danger")
    })
  }

  handleUsername = (e) => {
    this.setState({username: e.target.value})
  }

  handleEmail = (e) => {
    this.setState({email: e.target.value})
  }

  handlePassword = (e) => {
    this.setState({password: e.target.value})
  }

  handleRepeatPassword = (e) => {
    this.setState({repeatPassword: e.target.value})
  }

  render() {
    return (
        <div>
          <div className="modal-admin">
            <h1 className="title modal-title">Add User</h1>
          </div>

          <br/>
          <input
              className="input is-normal input-admin"
              type="text"
              placeholder="Username..."
              onChange={this.handleUsername}/>
          <br/>
          <br/>

          <input
              className="input is-normal input-admin"
              type="email"
              placeholder="Email..."
              onChange={this.handleEmail}/>
          <br/>
          <br/>

          <select
              className="select is-normal"
              defaultValue={0} name="role"
              onChange={this.handleChange}
          >
            <option value={0}> --- Select a Role---</option>
            <option value={1}>User</option>
            <option value={3}>Tutor</option>
            <option value={2}>Admin</option>
          </select>
          <br/>
          <br/>

          <input
              className="input is-normal input-admin"
              type="password"
              placeholder="Password..."
              onChange={this.handlePassword}/>
          <br/>
          <br/>

          <input
              className="input is-normal input-admin"
              type="password"
              placeholder="Repeat Password..."
              onChange={this.handleRepeatPassword}/>
          <br/>
          <br/>

          <button className="button" onClick={this.addUser}>Add User</button>
        </div>
    )
  }
}

export default AddUserForm