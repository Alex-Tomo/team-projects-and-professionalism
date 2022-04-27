import React from "react"
import Checkbox from "../Elements/Checkbox"

/**
 * Mobile view for each table row
 *
 * @author Alex Thompson, W19007452
 */

class TableRowMobile extends React.Component {
  render() {

    let addedBy = ""
    if ((this.props.result.user_added_bies != null) && (this.props.result.user_added_bies.length > 0)) {
      addedBy = this.props.result.user_added_bies[0].added_by_name
    }

    return (
        <div key={this.props.result.id} className="mobile-row-container">
          <div className="mobile-row-subcontainer">
            <div>
              <Checkbox
                id={this.props.result.id}
                handleChange={this.props.handleChange}
                isChecked={this.props.isCheck.includes(this.props.result.id)}
              />
              <span className="mobile-row-subcontainer-span">Select Account</span>
            </div>
            <div className="mobile-row-subcontainer-div">
              <p className="mobile-row-subcontainer-div-p">Username</p>
              <p>{this.props.result.username}</p>
            </div>
            <div className="mobile-row-subcontainer-div">
              <p className="mobile-row-subcontainer-div-p">Email</p>
              <p>{this.props.result.email}</p>
            </div>
            <div className="mobile-row-subcontainer-div">
              <p className="mobile-row-subcontainer-div-p">Role</p>
              <p>{this.props.result.roles[0].name}</p>
            </div>
            <div className="mobile-row-subcontainer-div">
              <p className="mobile-row-subcontainer-div-p">Date Added</p>
              <p>{this.props.result.createdAt.toString().split('T')[0]}</p>
            </div>
            <div className="mobile-row-subcontainer-div">
              <p className="mobile-row-subcontainer-div-p">Added By</p>
              <p>{addedBy}</p>
            </div>
          </div>
          <div className="mobile-row-buttons-container">
            <button
              className="button admin-option-button mobile-row-buttons"
              onMouseDown={() => {
                this.props.editUser(null, this.props.result.id)
              }}
            >
              Edit
            </button>
            <button
              className="button admin-option-button mobile-row-buttons"
              onMouseDown={() => {
                this.props.changePassword(null, this.props.result.id)
              }}
            >
              Change Password
            </button>
            <button
              className="button is-danger admin-option-button remove-button mobile-row-buttons"
              onMouseDown={() => {
                this.props.removeUserModal(null, [this.props.result.id])
              }}
            >
              Remove
            </button>
          </div>
        </div>
    )
  }
}

export default TableRowMobile