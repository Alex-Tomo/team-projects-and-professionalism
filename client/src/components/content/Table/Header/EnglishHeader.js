import React from "react"
class EnglishHeader extends React.Component {
   
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
              <th>Story Title</th>
              <th>Question</th>
              <th>Answer</th>
              <th>Updated At</th>              
              <th>Actions</th>
            </tr>
            </thead>
          
        )}}

export default EnglishHeader