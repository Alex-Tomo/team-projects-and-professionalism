import React from "react"

class Checkbox extends React.Component {
  render() {
    return (
      <input
        type="checkbox"
        id={this.props.id}
        checked={this.props.isChecked}
        onChange={this.props.handleChange}
      />
    )
  }
}

export default Checkbox