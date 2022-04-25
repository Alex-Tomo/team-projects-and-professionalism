import React from "react"
class VerbalHeader extends React.Component {
   
render() {
    return (
      
            <thead>
            <tr className="table-row-head">
              <th>
                <input
                  type="checkbox"
                  onChange={this.props.handleChangeAll}
                  checked={this.props.isCheckAll}
                />
              </th>
              <th>Question</th>
              <th>Example</th>
              <th>Answer</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
            </thead>
          
        )}}

export default VerbalHeader