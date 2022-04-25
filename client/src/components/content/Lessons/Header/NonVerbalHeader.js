import React from "react"
class NonVerbalHeader extends React.Component {
   
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
              <th>Answer</th>
            </tr>
            </thead>
          
        )}}

export default NonVerbalHeader