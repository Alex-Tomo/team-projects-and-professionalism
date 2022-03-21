import React from "react"
import axios from "axios"
import AdminTable from "./Table/AdminTable"
import authHeader from "../../services/auth-header"
import UserService from "../../services/user.service"
import PageButtons from "./Elements/PageButtons"

/**
 * The Admin Page
 *
 * @author Alex Thompson, W19007452
 */

class Admin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      results: [],
      page: 1,
      search: "",
      content: "",
      loggedIn: false
    }

    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    UserService.getTutorBoard()
      .then((response) => {
          this.setState({
            content: response.data,
            loggedIn: true
          })
        },
        (error) => {
          this.setState({
            content:
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
          })
        }
      ).then(() => {
        let userId = null
        let userRole = JSON.parse(localStorage.getItem('user')).roles[0]

        if (userRole === "ROLE_TUTOR") {
          userId = JSON.parse(localStorage.getItem('user')).id
        }

        axios.post('http://localhost:8080/api/admin/users',
          {
            id: userId
          },
          {
          headers: authHeader()
        }).then(results => {
          this.setState({ results: results.data })
        }).catch((e) => {
          console.log(e)
        })
    })
  }

  handleRemoveUser = async (idArray = []) => {
    let tempArray = await this.state.results.filter(result => !idArray.includes(result.id))
    await this.setState({
      results: tempArray
    })
  }

  handleAddUser = async (newUser) => {
    let tempArray = this.state.results
    tempArray.push(newUser)
    await this.setState({
      results: tempArray
    })
  }

  handleEditUser = async (updatedUser) => {
    let tempArray = this.state.results
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].id === updatedUser.id) {
        tempArray[i] = updatedUser
      }
    }

    await this.setState({
      results: tempArray
    })
  }

  handlePaginationClick = (pageNumber) => {
    let button = document.getElementById(`page-button-${pageNumber}`)

    let li = document.getElementById('pagination-list-id').getElementsByTagName('li')

    for (let i = 0; i < li.length; i++) {
      let buttons = li[i].getElementsByTagName('button')
      for (let j = 0; j < buttons.length; j++) {
        if (buttons[j] !== undefined) {
          buttons[j].classList.remove("is-current")
        }
      }
    }

    button.classList.add("is-current")
    this.setState({page: pageNumber})
  }

  handleSearch = (e) => {
    this.setState({
      search: e.target.value,
      page: 1
    })
  }

  filterSearch = (s) => {
    return (
      s.username.toLowerCase().includes(this.state.search.toLowerCase()) ||
      s.email.toLowerCase().includes(this.state.search.toLowerCase()) ||
      s.roles[0].name.toLowerCase().includes(this.state.search.toLowerCase()) ||
      s.createdAt.toLowerCase().includes(this.state.search.toLowerCase()) ||
      s.user_added_bies[0].added_by_name.toLowerCase().includes(this.state.search.toLowerCase())
    )
  }

  render() {
    // If the user is not logged in or not a valid user,
    // display this before redirection
    if (!this.state.loggedIn) {
      return (
        <div>
          <h1>You must be logged in to view this page</h1>
        </div>
      )
    }

    let pageButtons = ""
    let results = this.state.results

    if ((this.state.results.length > 0) && (this.state.search !== undefined)) {
      results = this.state.results.filter(this.filterSearch)
    }

    if(this.state.results.length > 0) {
      const pageSize = 10
      let pageMax = this.state.page * pageSize
      let pageMin = pageMax - pageSize

      pageButtons = (
          <PageButtons
            currentPage={this.state.page}
            pageSize={pageSize}
            resultsLength={this.state.results.length}
            handlePaginationClick={(i) => this.handlePaginationClick(i)}
          />
      )

      results = results.slice(pageMin, pageMax)
    }

    const username = JSON.parse(localStorage.getItem('user')).username

    return (
      <div>
        <section className="section is-medium sub-home-background">
          <h1 className="dashboard heading admin-heading">Welcome Back, {username}!</h1>
          <h2 className="dashboard sub-heading admin-subheading">The tutors are gonna hate it.</h2>
        </section>

        <div className="admin-container">
          <h1 className="account-management-title title">Account Management</h1>
          <div className="account-management-title-line"/>
          <AdminTable
              results={results}
              handleSearch={this.handleSearch}
              handleRemoveUser={this.handleRemoveUser}
              handleAddUser={this.handleAddUser}
              handleEditUser={this.handleEditUser}
              handlePaginationClick={this.handlePaginationClick}
              currentPage={this.state.page}
          />
          <div className="users-table-footer">
            <p>Showing {results.length} of {this.state.results.length} results</p>
            {pageButtons}
          </div>
        </div>
      </div>
    )
  }
}

export default Admin