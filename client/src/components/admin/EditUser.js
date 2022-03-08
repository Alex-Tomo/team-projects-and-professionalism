import React from "react"

class EditUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      option: this.props.userDetails.role
    }
  }

  handleChange = (e) => {
    this.setState({option: e.target.value})
  }

  render() {
    return (
      <div id="overlay">
        <div>
          <div style={{
            display: "flex",
            justifyContent: "center"
          }}>
            <h1 style={{margin: "auto"}}>Edit User</h1>
            <button onClick={this.props.closeEditUser}>X</button>
          </div>

          <label htmlFor="newName">New Name:</label>
          <input type="text" name="newName" defaultValue={this.props.userDetails.username}/>
          <br/>
          <br/>

          <label htmlFor="newEmail">New Email:</label>
          <input type="email" name="newEmail" defaultValue={this.props.userDetails.email}/>
          <br/>
          <br/>

          {/* TODO: Edit this to fit with the 3 roles DB currently has 2 options */}
          <label htmlFor="role">Role:</label>
          <select defaultValue={this.state.option} name="role" onChange={this.handleChange}>
            {/*<option value="Student">Student</option>*/}
            {/*<option value="Tutor">Tutor</option>*/}
            {/*<option value="Admin">Admin</option>*/}
            <option value={1}>User</option>
            <option value={2}>Admin</option>
          </select>
          <br/>
          <br/>

          <label htmlFor="newPassword">New Password:</label>
          <input type="password" name="newPassword"/>
          <br/>
          <br/>

          <label htmlFor="repeatNewPassword">Repeat New Password:</label>
          <input type="password" name="repeatNewPassword"/>
          <br/>
          <br/>

          <button>Update</button>
        </div>
      </div>
    )
  }
}

export default EditUser