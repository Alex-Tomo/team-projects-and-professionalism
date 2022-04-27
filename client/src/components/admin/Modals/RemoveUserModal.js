import React from "react"

/**
 * The remove user modal, pops up when the user clicks the remove button
 *
 * @author Alex Thompson, W19007452
 */

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