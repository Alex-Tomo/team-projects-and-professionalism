import React from "react"
import magnifyingGlass from "../../../images/magnifying_glass.svg"

class TableOptions extends React.Component {
  render() {
    return (
      <div className="users-table-options">
        <h2 style={{textAlign: "start"}}><strong>All Accounts</strong></h2>
        <p><strong>{this.props.numSelected} Selected</strong></p>
        <div className="field has-addons">

          <p className="control">
            <button id="add-button" className="button" onClick={this.props.openModal}>Add</button>
          </p>

          <p className="control">
            <button id="remove-button" className="button is-danger" onClick={this.props.removeManyUsers}
                    disabled={this.props.numSelected < 1}>Remove
            </button>
          </p>

          <div className="control has-icons-right">
            <input className="input" type="search" placeholder="Search" onChange={this.props.handleSearch}/>
            <span className="icon is-small is-right">
              <img src={magnifyingGlass} alt="Magnifying Glass" />
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default TableOptions