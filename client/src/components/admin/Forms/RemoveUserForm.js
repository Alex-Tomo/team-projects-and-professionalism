import React from "react"
import axios from "axios"
import authHeader from "../../../services/auth-header"

/**
 *
 * @author Alex Thompson, W19007452
 */

class RemoveUserForm extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let rows = ""

    if (this.props.userDetails.length > 0) {
      rows = this.props.userDetails.map((result, i) => {
        return (
          <tr key={i}>
            <td className="admin-modal-column">{result.username}</td>
            <td>{result.email}</td>
            <td>{result.roles[0].name}</td>
            <td>{result.createdAt.toString().split('T')[0]}</td>
            <td>{result.user_added_bies[0].added_by_name}</td>
          </tr>
        )
      })
    }

    return (
        <div>
          <div className="modal-admin">
            <h4 className="title modal-title">Are you sure you want to remove {(this.props.userDetails.length > 1) ? "these users?" : "this user?"} </h4>
          </div>

          <hr className="admin-modal-hr" />

          <table className="users-table">
            <thead>
              <tr className="admin-table-head">
                <th className="admin-modal-column">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Date Added</th>
                <th>Added By</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>

          <hr className="admin-modal-hr" />

          <div className="admin-modal-button-container">
            <button
              className="button admin-modal-submit-button-red"
              onClick={() => {
                (this.props.userDetails.length > 1) ?
                  this.props.removeManyUsers() :
                  this.props.removeOneUser(this.props.userDetails[0].id)
                  this.props.closeModal()
              }}
            >
              Remove
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

export default RemoveUserForm