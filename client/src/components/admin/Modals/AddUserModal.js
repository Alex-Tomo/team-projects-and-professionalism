import React from "react"
import AddUserForm from "../Forms/AddUserForm";

class AddUserModal extends React.Component {
  render() {
    return (
      <div id="modal-add-user" className="modal">
        <div className="modal-background" />

        <div className="modal-content">
          <div className="box">
            <AddUserForm
              handleSubmit={this.props.handleSubmit}
              showMessage={this.props.showMessage}
              handleAddUser={this.props.handleAddUser}
              closeModal={this.props.closeModal}
            />
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

export default AddUserModal