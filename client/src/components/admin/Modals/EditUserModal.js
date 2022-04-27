import React from "react"

/**
 * The edit user modal, pops up when the user clicks the edit button
 *
 * @author Alex Thompson, W19007452
 */

class EditUserModal extends React.Component {
  render() {
    return (
      <div id="modal-edit-user" className="modal">
        <div className="modal-background" />

        <div className="modal-content">
          <div className="box" id="edit-user">
            {this.props.editUser}
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

export default EditUserModal