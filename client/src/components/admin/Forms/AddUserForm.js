import React from "react"
import axios from "axios"
import authHeader from "../../../services/auth-header"

/**
 * Displays the Modal for adding a new user
 *
 * @author Alex Thompson, W19007452
 */


class AddUserForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            email: "",
            password: "",
            repeatPassword: "",
            role: 0
        }
    }

    handleChange = (event) => {
        this.setState({ role: event.target.value })
    }

    addUser = () => {
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
        if (!this.state.email.trim().includes("@")) {
            this.props.showMessage("Invalid Email Format!", "is-danger")
            return
        }

        if ((this.state.password.length <= 7) || (this.state.password.length > 32)) {
            this.props.showMessage("Password Must Be Between 8 and 32 Characters!", "is-danger")
            return
        }
        if (this.state.password.trim() === "") {
            this.props.showMessage("Password Cannot Be Empty!", "is-danger")
            return
        }
        if (this.state.password.trim().includes(" ")) {
            this.props.showMessage("Password Cannot Contain Spaces!", "is-danger")
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

        axios.post('https://kip-learning.herokuapp.com/api/admin/adduser', {
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
                    user_added_bies: [{
                        added_by_name: JSON.parse(localStorage.getItem('user')).username
                    }],
                    roles: [
                        {
                            id: this.state.role,
                            name: roles[0]
                        }
                    ]
                }).then(() => {
                    this.setState({
                        username: "",
                        email: "",
                        password: "",
                        repeatPassword: "",
                        role: 0
                    })
                })
            }).catch((e) => {
                this.props.showMessage(e.response.data.message, "is-danger")
            })
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
            <div>
                <div className="modal-admin">
                    <h4 className="title modal-title">Add a user</h4>
                </div>
                <hr className="admin-modal-hr" />

                <div className="admin-modal-container">
                    <label className="admin-modal-label">Username</label>
                    <input
                        className="input is-normal input-admin admin-modal-input"
                        type="text"
                        placeholder="JohnJohnson"
                        value={this.state.username}
                        onChange={this.handleUsername} />
                </div>


                <div className="admin-modal-container">
                    <label className="admin-modal-label">Email</label>
                    <input
                        className="input is-normal admin-modal-input"
                        type="email"
                        placeholder="Example@gmail.com"
                        value={this.state.email}
                        onChange={this.handleEmail} />
                </div>

                <div className="admin-modal-container">
                    <label className="admin-modal-label">Role</label>
                    <select
                        style={{ color: (this.state.role === 0) ? "lightgray" : "" }}
                        className="select is-normal admin-modal-select"
                        value={this.state.role}
                        name="role"
                        onChange={this.handleChange}
                    >
                        <option value={0} hidden={true}>Select a role</option>
                        <option value={1} className="admin-modal-option">User</option>
                        {(JSON.parse(localStorage.getItem('user')).roles[0] === "ROLE_ADMIN") ? <option value={3} style={{ color: "black" }}>Tutor</option> : ""}
                        {/*<option value={2} className="admin-modal-option">Admin</option>*/}
                    </select>
                </div>

                <div className="admin-modal-container">
                    <label className="admin-modal-label">Password</label>
                    <input
                        className="input is-normal admin-modal-input"
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handlePassword} />
                </div>

                <div className="admin-modal-container">
                    <label className="admin-modal-label">Confirm Password</label>
                    <input
                        className="input is-normal admin-modal-input"
                        type="password"
                        placeholder="Confirm Password"
                        value={this.state.repeatPassword}
                        onChange={this.handleRepeatPassword} />
                </div>

                <hr className="admin-modal-hr" />

                <div className="admin-modal-button-container">
                    <button
                        className="button admin-modal-submit-button"
                        onClick={this.addUser}
                    >
                        Add
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

export default AddUserForm