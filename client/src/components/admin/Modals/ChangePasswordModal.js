import React from "react"

class ChangePasswordModal extends React.Component {
  render() {
    return (
      <div id="modal-change-password" className="modal">
        <div className="modal-background" />

        <div className="modal-content">
          <div className="box" id="change-password">
            {this.props.changePassword}
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

export default ChangePasswordModal