import Checkbox from "../Elements/Checkbox"
import ellipsis from "../../../images/ellipsis.svg"
import React from "react"

class TableRow extends React.Component {
  render() {

    let addedBy = ""
    if ((this.props.result.user_added_bies != null) && (this.props.result.user_added_bies.length > 0)) {
      addedBy = this.props.result.user_added_bies[0].added_by_name
    }

    return (
      <tr key={this.props.result.id}>
        <td>
          <Checkbox
            id={this.props.result.id}
            handleChange={this.props.handleChange}
            isChecked={this.props.isCheck.includes(this.props.result.id)}
          />
        </td>
        <td className="table-body-name">{this.props.result.username}</td>
        <td>{this.props.result.email}</td>
        <td>{this.props.result.roles[0].name}</td>
        <td>{this.props.result.createdAt.toString().split('T')[0]}</td>
        <td>{addedBy}</td>
        <td>
          <div
            className="dropdown is-right is-active"
            onClick={() => {
              this.props.handleToggle(`menu${this.props.result.id}`)
            }}
            onBlur={() => {
              this.props.closeButtonMenu(`menu${this.props.result.id}`)
            }}
          >
            <div className="dropdown-trigger">
              <button
                className="button"
                aria-haspopup="true"
                aria-controls="dropdown-menu6"
              >
                <span className="icon is-small">
                  <img
                    src={ellipsis}
                    alt="Ellipsis" />
                </span>
              </button>
            </div>
            <div
              className="dropdown-menu is-hidden"
              id={`menu${this.props.result.id}`}
              role="menu"
            >
              <div className="dropdown-content">
                <div className="dropdown-item">
                  <button
                    style={{width: "100%"}}
                    className="button is-radiusless admin-option-button"
                    onMouseDown={() => {
                      this.props.editUser(`menu${this.props.result.id}`, this.props.result.id)
                    }}
                  >
                    Edit
                  </button>
                  <br/>
                  <button
                    className="button is-radiusless admin-option-button"
                    onMouseDown={() => {
                      this.props.changePassword(`menu${this.props.result.id}`, this.props.result.id)
                    }}
                  >
                    Change Password
                  </button>
                  <br/>
                  <button
                    className="button is-danger is-radiusless admin-option-button remove-button"
                    onMouseDown={() => {
                      this.props.removeUserModal(`menu${this.props.result.id}`, [this.props.result.id])
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    )
  }
}

export default TableRow