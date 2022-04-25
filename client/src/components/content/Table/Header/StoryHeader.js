import React from "react"
class StoryHeader extends React.Component {
   
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
              <th>Title</th>
              <th>Story</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
            </thead>
          
        )}}

export default StoryHeader