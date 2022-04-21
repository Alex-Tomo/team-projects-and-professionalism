import React from 'react'

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
            <div style={{ display: "flex", flexDirection: "column", alignItems: "start", width: "100%", margin: " 20px auto", backgroundColor: "#E4E4E4", borderRadius: "8px"}}>
              <div style={{textAlign: "start", marginTop: "10px", marginLeft: "20px"}}>
                <p  style={{color: "#004888", fontWeight: "bold"}}>Username</p>
                <p>{result.username}</p>
              </div>
              <div style={{textAlign: "start", marginTop: "10px", marginLeft: "20px"}}>
                <p  style={{color: "#004888", fontWeight: "bold"}}>Email</p>
                <p>{result.email}</p>
              </div>
              <div style={{textAlign: "start", marginTop: "10px", marginLeft: "20px"}}>
                <p  style={{color: "#004888", fontWeight: "bold"}}>Role</p>
                <p>{result.roles[0].name}</p>
              </div>
              <div style={{textAlign: "start", marginTop: "10px", marginLeft: "20px"}}>
                <p  style={{color: "#004888", fontWeight: "bold"}}>Date Added</p>
                <p>{result.createdAt.toString().split('T')[0]}</p>
              </div>
              <div style={{textAlign: "start", marginTop: "10px", marginLeft: "20px", marginBottom: "10px"}}>
                <p style={{color: "#004888", fontWeight: "bold"}}>Added By</p>
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
          <h4 className="title modal-title">Are you sure you want to remove {(this.props.userDetails.length > 1) ? "these users?" : "this user?"} </h4>
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