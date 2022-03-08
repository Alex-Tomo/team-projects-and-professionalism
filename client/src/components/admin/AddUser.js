import React from "react"
//import authHeader from "../../services/auth-header";
//import axios from "axios";

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
        this.setState({ role: e.target.value })
        console.log(this.state.role)
    }

    addUser = () => {
        if (this.state.username.trim() === "") {
            alert("Username field cannot be empty")
            return
        }
        if (this.state.email.trim() === "") {
            alert("Email field cannot be empty")
            return
        }
        if (this.state.password.trim() === "") {
            alert("Password field cannot be empty")
            return
        }
        if (this.state.repeatPassword.trim() === "") {
            alert("Repeated password field cannot be empty")
            return
        }
        if (this.state.password !== this.state.repeatPassword) {
            alert("Passwords do not match")
            return
        }
        if (this.state.role < 1 || this.state.role > 3) {
            alert("Invalid role")
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

        // axios.post('http://localhost:8080/api/auth/signup', null, {
        //   headers: authHeader(),
        //   body: formBody
        // }).then(() => {
        //   alert("successfully added!")
        // }).catch(e => {
        //   console.log(e)
        // })
    }

    handleUsername = (e) => {
        this.setState({ username: e.target.value })
    }

    handleEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    handlePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    handleRepeatPassword = (e) => {
        this.setState({ repeatPassword: e.target.value })
    }

    render() {
        return (
            <div id="overlay">
                <div>
                    <div style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <h1
                            className="title"
                            style={{ margin: "auto" }}>Add User
                        </h1>
                        <button
                            className="button"
                            onClick={this.props.closeAddUser}>X
                        </button>
                    </div>

                    <input
                        style={{ width: "50%" }}
                        className="input is-normal"
                        type="text"
                        name="name"
                        placeholder="Username..."
                        onChange={this.handleUsername} />
                    <br />
                    <br />

                    <input
                        style={{ width: "50%" }}
                        className="input is-normal"
                        type="email"
                        name="email"
                        placeholder="Email..."
                        onChange={this.handleEmail} />
                    <br />
                    <br />

                    <select
                        className="select is-normal"
                        defaultValue={0} name="role"
                        onChange={this.handleChange}
                    >
                        <option value={0}>   --- Select a Role---   </option>
                        <option value={1}>User</option>
                        <option value={2}>Admin</option>
                        <option value={3}>Tutor</option>
                    </select>
                    <br />
                    <br />

                    <input
                        style={{ width: "50%" }}
                        className="input is-normal"
                        type="password"
                        name="password"
                        placeholder="Password..."
                        onChange={this.handlePassword} />
                    <br />
                    <br />

                    <input
                        style={{ width: "50%" }}
                        className="input is-normal"
                        type="password"
                        name="repeatPassword"
                        placeholder="Repeat Password..."
                        onChange={this.handleRepeatPassword} />
                    <br />
                    <br />

                    <button className="button" onClick={this.addUser}>Add User</button>
                </div>
            </div>
        )
    }
}

export default AddUser