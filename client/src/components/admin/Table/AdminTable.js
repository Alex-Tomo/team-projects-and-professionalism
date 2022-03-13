import React from "react"
import axios from "axios"

import authHeader from "../../../services/auth-header"

import EditUserForm from "../Forms/EditUserForm"
import ChangePasswordForm from "../Forms/ChangePasswordForm"

import AddUserModal from "../Modals/AddUserModal"
import ChangePasswordModal from "../Modals/ChangePasswordModal"
import EditUserModal from "../Modals/EditUserModal"

import TableOptions from "./TableOptions"
import TableHead from "./TableHead"
import TableBody from "./TableBody"

/**
 * Displays the admin table with the users details
 * Add, edit and remove users from this page
 *
 * @author Alex Thompson, W19007452
 */


class AdminTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isCheckAll: false,
      isCheck: [],
      numSelected: 0,
      addUser: "",
      editUser: "",
      changePassword: "",
      results: this.props.results
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

  editUser = async (id = null, userId = null) => {
    if (id !== null) {
      this.closeButtonMenu(id)
    }

    if (userId !== null) {
      for (let i = 0; i < this.props.results.length; i++) {
        if(userId === this.props.results[i].id) {
          await this.setState({
            editUser: <EditUserForm
              userDetails={this.props.results[i]}
              handleSubmit={() => this.closeModal("modal-edit-user")}
              showMessage={(msg, cls) => this.displayNotification(msg, cls)}
              handleEditUser={this.props.handleEditUser}
            />
          })
          break
        }
      }

      await this.openModal('modal-edit-user')
    }
  }

  removeOneUser = (id = null) => {
    if (id === null) return
    this.closeButtonMenu(id)

    // let answer = prompt("Are you sure you want to delete these?\nType 'yes' to confirm")
    // if(answer !== 'yes') return

    let params = {
      id: id
    }

    let formBody = [];
    for (let property in params) {
      let encodedKey = encodeURIComponent(property)
      let encodedValue = encodeURIComponent(params[property])
      formBody.push(encodedKey + "=" + encodedValue)
    }
    formBody = formBody.join("&")

    axios.post('http://localhost:8080/api/admin/removeuser', formBody, {
      headers: authHeader()
    }).then(result => {
      if (result.data === true) {
        this.props.handleRemoveUser([id])
        this.displayNotification("User Deleted!", "is-danger")

        if (this.props.results.length === 1) {
          if (this.props.currentPage > 1) {
            this.props.handlePaginationClick(this.props.currentPage-1)
          } else {
            this.props.handlePaginationClick(1)
          }
        }

        if (this.state.isCheckAll) {
          this.setState({
            isCheckAll: false,
          })
        }
        this.setState({
          numSelected: 0
        })
      }
    }).catch(() => {
      this.displayNotification("Could Not Delete User!", "is-danger")
    })
  }

  removeManyUsers = () => {
    // let answer = prompt("Are you sure you want to delete these?\nType 'yes' to confirm")
    // if(answer !== 'yes') return

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
      let encodedKey = encodeURIComponent(property)
      let encodedValue = encodeURIComponent(params[property])
      formBody.push(encodedKey + "=" + encodedValue)
    }
    formBody = formBody.join("&")

    axios.post('http://localhost:8080/api/admin/removeuser', formBody, {
      headers: authHeader()
    }).then(result => {
      if (result.data === true) {
        this.props.handleRemoveUser(idsToBeRemoved)
        if (idsToBeRemoved.length > 1) {
          this.displayNotification("Users Deleted!", "is-danger")
        } else {
          this.displayNotification("User Deleted!", "is-danger")
        }

        if (this.props.results.length === idsToBeRemoved.length) {
          if (this.props.currentPage > 1) {
            this.props.handlePaginationClick(this.props.currentPage-1)
          } else {
            this.props.handlePaginationClick(1)
          }

          if (this.state.isCheckAll) {
            this.setState({
              isCheckAll: false,
            })
          }
        }
        this.setState({
          numSelected: 0
        })
      }
    }).catch(() => {
      if (idsToBeRemoved.length > 1) {
        this.displayNotification("Could Not Delete Users!", "is-danger")
      } else {
        this.displayNotification("Could Not Delete User!", "is-danger")
      }
    })
  }

  changePassword = async (id = null, userId = null) => {
      if (id !== null) {
        this.closeButtonMenu(id)
      }

    if (userId !== null) {
      for (let i = 0; i < this.props.results.length; i++) {
        if(userId === this.props.results[i].id) {
          await this.setState({
            changePassword: <ChangePasswordForm
              userDetails={this.props.results[i]}
              handleSubmit={() => this.closeModal("modal-change-password")}
              showMessage={(msg, cls) => this.displayNotification(msg, cls)}
            />
          })
          break
        }
      }

      await this.openModal('modal-change-password')
    }
  }

  handleToggle = (id) => {
    if (document.getElementById(id).classList.contains("is-hidden")) {
      document.getElementById(id).classList.remove("is-hidden")
    } else {
      document.getElementById(id).classList.add("is-hidden")
    }
  }

  closeButtonMenu = (id) => {
    document.getElementById(id).classList.add("is-hidden")
  }

  openModal = (el) => {
    document.getElementById(el).classList.add('is-active');

    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach((close) => {

      close.addEventListener('click', () => {
        this.closeModal(el)
      })
    })
  }

  closeModal = (el) => {
    document.getElementById(el).classList.remove('is-active');
    this.setState({
      addUser: "",
      editUser: "",
      changePassword: ""
    })
  }

  hideNotification = () => {
    let notification = document.getElementById("notification")

    notification.classList.add("hide")
    notification.classList.remove("is-success")
    notification.classList.remove("is-danger")

    let p = notification.getElementsByTagName("p")[0]

    p.innerText = ""
  }

  displayNotification = (notificationMessage, notificationClassName) => {
    let notification = document.getElementById("notification")

    notification.classList.add(notificationClassName)
    notification.classList.remove("hide")

    let p = notification.getElementsByTagName("p")[0]

    p.innerText = notificationMessage

    setTimeout(this.hideNotification, 5000)
  }

  render() {
    return (
      <div>

        <TableOptions
          openModal={() => { this.openModal('modal-add-user')}}
          removeManyUsers={() => { this.removeManyUsers() }}
          handleSearch={this.props.handleSearch}
          numSelected={this.state.numSelected}
        />

        <table className="users-table">
          <TableHead
            handleChangeAll={this.handleChangeAll}
            isCheckAll={this.state.isCheckAll}
          />
          <TableBody
            results={this.props.results}
            handleChange={this.handleChange}
            isCheck={this.state.isCheck}
            editUser={this.editUser}
            changePassword={this.changePassword}
            removeOneUser={this.removeOneUser}
            handleToggle={this.handleToggle}
            closeButtonMenu={this.closeButtonMenu}
          />
        </table>

        <AddUserModal
          handleSubmit={() => this.closeModal("modal-add-user")}
          showMessage={(msg, cls) => this.displayNotification(msg, cls)}
          closeModal={() => this.closeModal("modal-add-user")}
          handleAddUser={this.props.handleAddUser}
        />

        <ChangePasswordModal
          changePassword={this.state.changePassword}
          closeModal={() => this.closeModal("modal-change-password")}
        />

        <EditUserModal
          editUser={this.state.editUser}
          closeModal={() => this.closeModal("modal-edit-user")}
        />

        <div id="notification" className="notification hide">
          <button className="delete" onClick={this.hideNotification} />
          <p />
        </div>

      </div>
    )
  }
}

export default AdminTable