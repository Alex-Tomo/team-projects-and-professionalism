import React from "react"

/**
 * Generic Checkbox component
 *
 * @author Alex Thompson, W19007452
 */

class Checkbox extends React.Component {
  render() {
    return (
      <input
        className="clickable checkbox checkbox-admin"
        type="checkbox"
        id={this.props.id}
        checked={this.props.isChecked}
        onChange={this.props.handleChange}
      />
    )
  }
}

export default Checkbox