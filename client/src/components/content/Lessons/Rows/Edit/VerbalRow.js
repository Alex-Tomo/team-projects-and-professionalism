import React from "react"

class VerbalRow extends React.Component {
render() {
  //console.log(this.props.result)

  let id = this.props.result.verbal_reasoning_questions[0].question_id

      return ( 
            <tr key={this.props.result.verbal_reasoning_questions[0].question_id}>
                  <td><input type= "checkbox" id = {id} onChange = {this.props.handleChange}/></td>
        <td>{this.props.result.verbal_reasoning_questions[0].question}</td>
        <td>{this.props.result.verbal_reasoning_questions[0].answer}</td>
         </tr>
      )}}

export default VerbalRow