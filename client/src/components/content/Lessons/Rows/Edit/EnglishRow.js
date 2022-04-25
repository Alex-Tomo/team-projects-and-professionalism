import React from "react"

class EnglishRow extends React.Component {

render() {

      let id = this.props.result.english_questions[0].question_id

      return ( 
            <tr key={this.props.result.english_questions[0].question_id}>
                  <td><input type= "checkbox" id = {id} onChange = {this.props.handleChange}/></td>
                  <td>{this.props.result.english_questions[0].question}</td>
                  <td>{this.props.result.english_questions[0].answer}</td>
            </tr>
      )}}

export default EnglishRow