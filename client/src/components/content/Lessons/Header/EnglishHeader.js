import React from "react"
class EnglishHeader extends React.Component {
   
render() {
    return (
      
            <thead>
            <tr >
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

export default EnglishHeader