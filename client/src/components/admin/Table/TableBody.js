import React from "react"
import TableRow from "./TableRow"

class TableBody extends React.Component {
  render() {
    let accounts = ""
    if (this.props.results.length > 0) {
      accounts = this.props.results.map((result, i) => {

        return (
          <TableRow
            key={i}
            result={result}
            handleChange={this.props.handleChange}
            isCheck={this.props.isCheck}
            editUser={this.props.editUser}
            changePassword={this.props.changePassword}
            removeOneUser={this.props.removeOneUser}
            handleToggle={this.props.handleToggle}
            closeButtonMenu={this.props.closeButtonMenu}
            removeUserModal={this.props.removeUserModal}
          />
        )
      })
    }

    return (
      <tbody>
        {accounts !== "" ? accounts : null}
      </tbody>
    )
  }
}

export default TableBody