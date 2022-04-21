import React from "react"

class TableHead extends React.Component {
  render() {
    return (
      <thead>
        <tr>
          <th>
            <input
                className="clickable checkbox checkbox-admin"
                type="checkbox"
                onChange={this.props.handleChangeAll}
                checked={this.props.isCheckAll}
            />
          </th>
          <th className="table-head-name">Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Date Added</th>
          <th>Added By</th>
          <th>Actions</th>
        </tr>
      </thead>
    )
  }
}

export default TableHead