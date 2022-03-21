import React from "react"
import RemoveUserForm from "../Forms/RemoveUserForm"

class RemoveUserModal extends React.Component {
  render() {
    return (
        <div id="modal-remove-user" className="modal">
          <div className="modal-background" />

          <div className="modal-content">
            <div className="box">
              {this.props.removeUser}
            </div>
          </div>

          <button
              className="modal-close is-large"
              aria-label="close"
              onClick={this.props.closeModal}
          />
        </div>
    )
  }
}

export default RemoveUserModal