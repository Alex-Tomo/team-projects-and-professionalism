import React from "react"
class VerbalHeader extends React.Component {
   
render() {
    return (
      
            <thead className = "table is-fullwidth">
            <tr className="table-row-head">
              <th>
                <input
                  type="checkbox"
                  onChange={this.props.handleChangeAll}
                  checked={this.props.isCheckAll}
                />
              </th>
              <th>Question</th>
              <th>Answer</th>
            </tr>
            </thead>
          
        )}}

export default VerbalHeader