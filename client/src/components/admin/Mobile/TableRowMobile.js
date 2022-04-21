import Checkbox from "../Elements/Checkbox"
import React from "react"

class TableRowMobile extends React.Component {
  render() {

    let addedBy = ""
    if ((this.props.result.user_added_bies != null) && (this.props.result.user_added_bies.length > 0)) {
      addedBy = this.props.result.user_added_bies[0].added_by_name
    }

    return (
        <div key={this.props.result.id} style={{border: "1px solid black", borderRadius: "8px", marginBottom: "20px"}}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "start", width: "90%", margin: " 20px auto"}}>
            <div>
              <Checkbox
                id={this.props.result.id}
                handleChange={this.props.handleChange}
                isChecked={this.props.isCheck.includes(this.props.result.id)}
              />
              <span style={{marginLeft: "10px", fontWeight: "bold"}}>Select Account</span>
            </div>
            <div style={{textAlign: "start", marginTop: "10px"}}>
              <p  style={{color: "#004888", fontWeight: "bold"}}>Username</p>
              <p>{this.props.result.username}</p>
            </div>
            <div style={{textAlign: "start", marginTop: "10px"}}>
              <p  style={{color: "#004888", fontWeight: "bold"}}>Email</p>
              <p>{this.props.result.email}</p>
            </div>
            <div style={{textAlign: "start", marginTop: "10px"}}>
              <p  style={{color: "#004888", fontWeight: "bold"}}>Role</p>
              <p>{this.props.result.roles[0].name}</p>
            </div>
            <div style={{textAlign: "start", marginTop: "10px"}}>
              <p  style={{color: "#004888", fontWeight: "bold"}}>Date Added</p>
              <p>{this.props.result.createdAt.toString().split('T')[0]}</p>
            </div>
            <div style={{textAlign: "start", marginTop: "10px"}}>
              <p style={{color: "#004888", fontWeight: "bold"}}>Added By</p>
              <p>{addedBy}</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px"}}>
            <button
              style={{width: "90%", margin: "5px auto", borderRadius: "8px"}}
              className="button admin-option-button"
              onMouseDown={() => {
                this.props.editUser(null, this.props.result.id)
              }}
            >
              Edit
            </button>
            <button
              style={{width: "90%", margin: "5px auto", borderRadius: "8px"}}
              className="button admin-option-button"
              onMouseDown={() => {
                this.props.changePassword(null, this.props.result.id)
              }}
            >
              Change Password
            </button>
            <button
              style={{width: "90%", margin: "5px auto", borderRadius: "8px"}}
              className="button is-danger admin-option-button remove-button"
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