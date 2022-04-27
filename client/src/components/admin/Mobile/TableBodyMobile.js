import React from 'react'
import TableRowMobile from "./TableRowMobile"

/**
 * Mobile view for each table rows content
 *
 * @author Alex Thompson, W19007452
 */

class TableBodyMobile extends React.Component {
  render() {
    let accounts = ""
    if (this.props.results.length > 0) {
      accounts = this.props.results.map((result, i) => {

      return (
          <TableRowMobile
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
      <>
        {accounts !== "" ? accounts : null}
      </>
    )
  }
}

export default TableBodyMobile