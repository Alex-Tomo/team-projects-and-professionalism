import React from "react"
import AdminTable from "./admin/AdminTable";
import {Accounts} from "./admin/Accounts"

class Admin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      results: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/admin/users', {
      method: 'POST',
      mode: 'cors',
      crossDomain: true,
      headers: {
        'Access-Control-Allow-Headers': 'x-access-token',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTY0NDg2NTk1OSwiZXhwIjoxNjQ0OTUyMzU5fQ.KSgJ-tyHZd8pbr5r_wB2Yl8Bi9t8wQUFoPPz11LHiz4'
      }
    })
    .then(r => {
      return r.json()
    })
    .then(r => {
      this.setState({ results: r })
    })
    .catch(e => {
      console.log(e)
    })
  }

  render() {
    return (
      <div style={{width: "80%", margin: "auto"}}>
        <h1 className="account-management-title">Account Management</h1>
        <div className="account-management-title-line"/>

        <AdminTable results={this.state.results}/>

        <div className="users-table-footer">
          <p>Showing {this.state.results.length} results</p>
          <div className="results-buttons">
            <button className="active-button">1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>&gt;</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Admin