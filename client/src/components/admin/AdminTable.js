import React from "react"
import Checkbox from "./Checkbox";
import EditUser from "./EditUser";
import AddUser from "./AddUser";

class AdminTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isCheckAll: false,
      isCheck: [],
      numSelected: 0,
      addUser: "",
      editUser: ""
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChangeAll = () => {
    if(this.state.isCheckAll) {
      this.setState({
        isCheckAll: !this.state.isCheckAll,
        isCheck: [],
        numSelected: 0
      })
    } else {
      let arr = (this.props.results.map(({id}) => id))
      this.setState({
        isCheckAll: !this.state.isCheckAll,
        isCheck: arr,
        numSelected: arr.length
      })
    }

  }

  handleChange = (e) => {
    let arr = []

    if(this.state.isCheck.includes(parseInt(e.target.id))) {
      for(let i = 0; i < this.props.results.length; i++) {
        if(this.props.results[i].id === parseInt(e.target.id) || !this.state.isCheck.includes(this.props.results[i].id)) {
          arr[i] = undefined
        } else {
          arr[i] = this.props.results[i].id
        }
      }
    } else {
      for(let i = 0; i < this.props.results.length; i++) {
        if(this.props.results[i].id === parseInt(e.target.id) || this.state.isCheck.includes(this.props.results[i].id)) {
          arr[i] = this.props.results[i].id
        } else {
          arr[i] = undefined
        }
      }

    }

    if (!arr.includes(undefined)) {
      this.setState({
        isCheckAll: true
      })
    } else {
      this.setState({
        isCheckAll: false
      })
    }

    let numSelected = 0
    arr.forEach(a => {
      if (a !== undefined) numSelected++
    })

    this.setState({
      isCheck: arr,
      numSelected: numSelected
    })
  }

  handleUserClick = (userId) => {
    {alert(`User ${userId} Dashboard`)}
  }

  addUser = () => {
    this.setState({
      addUser: <AddUser closeAddUser={() => {this.setState({addUser: ""})}} />
    })
  }

  editUser = () => {
    let index = null

    for(let i = 0; i < this.state.isCheck.length; i++) {
      if(this.state.isCheck[i] !== undefined) {
        index = i
      }
    }

    this.setState({
      editUser: <EditUser
        userDetails={this.props.results[index]}
        closeEditUser={() => {this.setState({editUser: ""})}}
      />
    })
  }

  removeUser = () => {
    let answer = prompt("Are you sure you want to delete these?\nType 'yes' to confirm")
    if(answer !== 'yes') return

    let idsToBeRemoved = []

    this.state.isCheck.forEach(id => {
      if(id !== undefined) {
        idsToBeRemoved.push(id)
      }
    })

    let params = {
      id: idsToBeRemoved
    }

    let formBody = [];
    for (let property in params) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('http://localhost:8080/api/admin/removeuser', {
      method: 'POST',
      mode: 'cors',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Access-Control-Allow-Headers': 'x-access-token',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTY0NDg2NTk1OSwiZXhwIjoxNjQ0OTUyMzU5fQ.KSgJ-tyHZd8pbr5r_wB2Yl8Bi9t8wQUFoPPz11LHiz4'
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

  render() {
    let accounts = this.props.results.map(({id, username, email, role, dateAdded}) => {
      return (
        <tr key={id}>
          <td>
            <Checkbox
              id={id}
              handleChange={this.handleChange}
              isChecked={this.state.isCheck.includes(id)}
            />
          </td>
          <td onClick={() => this.handleUserClick(id)}>{username}</td>
          <td>{email}</td>
          <td>{role}</td>
          <td>{dateAdded.toString().split('T')[0]}</td>
        </tr>
      )
    })

    return (
      <div>
        {this.state.addUser}
        {this.state.editUser}
        <div className="users-table-options">
          <h2 style={{ textAlign: "start" }}>All Accounts</h2>
          <p>{this.state.numSelected} Selected</p>
          <div className="users-table-options-buttons">
            <button onClick={this.addUser}>Add</button>
            <button onClick={this.editUser} disabled={this.state.numSelected !== 1}>Edit</button>
            <button onClick={this.removeUser} disabled={this.state.numSelected < 1}>Remove</button>
            <input type="search" placeholder="Search" />
          </div>
        </div>

        <table className="users-table">
          <thead>
          <tr className="table-row-head">
            <th>
              <input
                type="checkbox"
                onChange={this.handleChangeAll}
                checked={this.state.isCheckAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Date Added</th>
          </tr>
          </thead>
          <tbody>
          {accounts}
          </tbody>
        </table>
      </div>
    )
  }
}

export default AdminTable