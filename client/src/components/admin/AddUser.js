import React from "react"

class AddUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      role: 1
    }
  }

  handleChange = (e) => {
    this.setState({role: e.target.value})
    console.log(this.state.role)
  }

  addUser = () => {
    if(this.state.username.trim() === "") {
      alert("error")
      return
    }
    if(this.state.email.trim() === "") {
      alert("error")
      return
    }
    if(this.state.password.trim() === "") {
      alert("error")
      return
    }
    if(this.state.repeatPassword.trim() === "") {
      alert("error")
      return
    }
    if(this.state.password !== this.state.repeatPassword) {
      alert("error")
      return
    }
    if(this.state.role < 1 || this.state.role > 3) {
      alert("error")
      return
    }

    let params = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role
    }

    let formBody = [];
    for (let property in params) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('http://localhost:8080/api/auth/signup', {
      method: 'POST',
      mode: 'cors',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
    .then(() => {
      alert("successfully added!")
    })
    .catch(e => {
      console.log(e)
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
      <div id="overlay">
        <div>
          <div style={{
            display: "flex",
            justifyContent: "center"
          }}>
            <h1 style={{margin: "auto"}}>Add User</h1>
            <button onClick={this.props.closeAddUser}>X</button>
          </div>

          <label htmlFor="name">Name:</label>
          <input type="text" name="name" onChange={this.handleUsername} />
          <br/>
          <br/>

          <label htmlFor="email">Email:</label>
          <input type="email" name="email" onChange={this.handleEmail} />
          <br/>
          <br/>

          {/* TODO: Edit this to fit with the 3 roles DB currently has 2 options */}
          <label htmlFor="role">Role:</label>
          <select defaultValue={1} name="role" onChange={this.handleChange}>
            {/*<option value="Student">Student</option>*/}
            {/*<option value="Tutor">Tutor</option>*/}
            {/*<option value="Admin">Admin</option>*/}
            <option value={1}>User</option>
            <option value={2}>Admin</option>
          </select>
          <br/>
          <br/>

          <label htmlFor="password">Password:</label>
          <input type="password" name="password" onChange={this.handlePassword} />
          <br/>
          <br/>

          <label htmlFor="repeatPassword">Repeat Password:</label>
          <input type="password" name="repeatPassword" onChange={this.handleRepeatPassword} />
          <br/>
          <br/>

          <button onClick={this.addUser}>Add User</button>
        </div>
      </div>
    )
  }
}

export default AddUser