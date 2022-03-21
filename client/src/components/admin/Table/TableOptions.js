import React from "react"
import magnifyingGlass from "../../../images/magnifying_glass.svg"

class TableOptions extends React.Component {
  render() {
    return (
      <div className="users-table-options">
        <h2 className="admin-table-options-subheading">
          <strong>All Accounts</strong>
        </h2>
        <div className="field has-addons admin-table-options">
          <p className="admin-table-options-para">
            <strong>{this.props.numSelected} Selected</strong>
          </p>

          <div className="admin-options-button-container">
            <button
              id="add-button"
              className="button"
              onClick={this.props.openModal}
            >
              Add
            </button>

            <button
              className="button is-danger remove-button"
              onClick={() => this.props.removeUserModal()}
              disabled={this.props.numSelected < 1}
            >
              Remove
            </button>
          </div>

          <div className="control has-icons-right admin-table-search-container">
            <input
              id="admin-search"
              className="input"
              type="search"
              placeholder="Search"
              onChange={this.props.handleSearch}
            />
            <span className="icon is-small is-right">
              <img
                src={magnifyingGlass}
                alt="Magnifying Glass"
              />
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default TableOptions