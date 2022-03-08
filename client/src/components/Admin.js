import React from "react"
import axios from "axios"
import AdminTable from "./admin/AdminTable";
import authHeader from "../services/auth-header";

class Admin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      results: [],
      page: 1,
      search: ""
    }

    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    axios.post('http://localhost:8080/api/admin/users', null, {
      headers: authHeader()
    }).then(r => {
      this.setState({ results: r.data })
    }).catch(e => {
      console.log(e)
    })
  }

  handlePreviousClick = () => {
    this.setState({page: (this.state.page - 1)})
  }

  handleNextClick = () => {
    this.setState({page: (this.state.page + 1)})
  }

  handlePaginationClick = (e) => {
    let button = e.target

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
    this.setState({page: parseInt(e.target.innerText)})
  }

  handleSearch = (e) => {
    this.setState({
      search: e.target.value,
      page: 1
    })
  }

  filterSearch = (s) => {
    console.log(s)
    console.log(this.state.search)

    return (
      s.username.toLowerCase().includes(this.state.search.toLowerCase()) ||
      s.email.toLowerCase().includes(this.state.search.toLowerCase()) ||
      s.role.toLowerCase().includes(this.state.search.toLowerCase()) ||
      s.dateAdded.toLowerCase().includes(this.state.search.toLowerCase())
    )
  }

  render() {

    let buttons = ""
    let results = this.state.results

    if ((this.state.results.length > 0) && (this.state.search !== undefined)) {
      results = this.state.results.filter(this.filterSearch)
    }

    if(this.state.results.length > 0) {
      const pageSize = 25
      let pageMax = this.state.page * pageSize
      let pageMin = pageMax - pageSize

      buttons = (
        <div
          className="pagination is-rounded"
          role="navigation"
          aria-label="pagination"
        >
          <button
            className="pagination-previous button"
            onClick={this.handlePreviousClick}
            disabled={this.state.page <= 1}>Previous
          </button>
          <button
            className="pagination-next button"
            onClick={this.handleNextClick}
            disabled={this.state.page >= Math.ceil(this.state.results.length / pageSize)}>Next page
          </button>

          <ul
            id="pagination-list-id"
            className="pagination-list"
          >

            <li>
              <button
                className="pagination-link is-current button"
                aria-label="Goto page 1"
                onClick={this.handlePaginationClick}>1
              </button>
            </li>

            <li>
              <span className="pagination-ellipsis">&hellip;</span>
            </li>

            <li>
              <button
                className="pagination-link button"
                aria-label={"Goto page" + Math.ceil(this.state.results.length / pageSize)}
                onClick={this.handlePaginationClick}>{Math.ceil(this.state.results.length / pageSize)}
              </button>
            </li>

          </ul>

        </div>
      )

      results = results.slice(pageMin, pageMax)
    }

    return (
      <div style={{width: "80%", margin: "20px auto auto auto"}}>
        <h1 className="account-management-title title">Account Management</h1>
        <div className="account-management-title-line"/>

        <AdminTable results={results} handleSearch={this.handleSearch} />

        <div className="users-table-footer">
          <p>Showing {results.length} of {this.state.results.length} results</p>
          {buttons}
        </div>
      </div>
    )
  }
}

export default Admin