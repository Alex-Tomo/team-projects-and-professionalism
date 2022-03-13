import React from "react"

class TableHead extends React.Component {
  render() {
    return (
      <thead>
        <tr style={{
          height: "52px",
          backgroundColor: "#E5ECFF",
          border: "1px solid #E4E4E4"
        }}>
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