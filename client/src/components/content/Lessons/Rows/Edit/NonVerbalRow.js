import React from "react"

class NonVerbalRow extends React.Component {

render() {
  let id = this.props.result.non_verbal_reasoning_questions[0].question_id

      return ( 
            <tr key={this.props.result.non_verbal_reasoning_questions[0].question_id}>
                  <td><input type= "checkbox" id = {id} onChange = {this.props.handleChange}/></td>
        <td>{this.props.result.non_verbal_reasoning_questions[0].filename}</td>
        <td>{this.props.result.non_verbal_reasoning_questions[0].answer}</td>

         </tr>
      )}}

export default NonVerbalRow