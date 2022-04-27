import React from 'react'

/**
 * A mobile view for the remove user forms,
 * this is needed as the form changes from a table
 * to a section
 *
 * @author Alex Thompson, W19007452
 */

class RemoveUserFormMobile extends React.Component {
  render() {
    let rows = ""

    if (this.props.userDetails.length > 0) {
      rows = this.props.userDetails.map((result, i) => {

        let addedBy = ""
        if ((result.user_added_bies != null) && (result.user_added_bies.length > 0)) {
          addedBy = result.user_added_bies[0].added_by_name
        }

        return (
          <div key={i}>
            <div className="mobile-remove-user">
              <div className="mobile-remove-user-div">
                <p className="mobile-remove-user-div-p">Username</p>
                <p>{result.username}</p>
              </div>
              <div className="mobile-remove-user-div">
                <p className="mobile-remove-user-div-p">Email</p>
                <p>{result.email}</p>
              </div>
              <div className="mobile-remove-user-div">
                <p className="mobile-remove-user-div-p">Role</p>
                <p>{result.roles[0].name}</p>
              </div>
              <div className="mobile-remove-user-div">
                <p className="mobile-remove-user-div-p">Date Added</p>
                <p>{result.createdAt.toString().split('T')[0]}</p>
              </div>
              <div className="mobile-remove-user-div">
                <p className="mobile-remove-user-div-p">Added By</p>
                <p>{addedBy}</p>
              </div>
            </div>
            <hr className="admin-modal-hr" />
          </div>
      )
      })
    }

    return (
      <div>
        <div className="modal-admin">
          <h4 className="title modal-title">
            Are you sure you want to remove {(this.props.userDetails.length > 1) ? "these users?" : "this user?"}
          </h4>
        </div>

        <hr className="admin-modal-hr" />

        {rows}

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

export default RemoveUserFormMobile