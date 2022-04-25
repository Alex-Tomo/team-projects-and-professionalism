import React from "react"
class AllHeader extends React.Component {
   
render() {
    return (
      
        <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={this.props.handleChangeAll}
                  checked={this.props.isCheckAll}
                />
              </th>
              <th>Question</th>
              <th>Answer</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
            </thead>
          
        )}}

export default AllHeader