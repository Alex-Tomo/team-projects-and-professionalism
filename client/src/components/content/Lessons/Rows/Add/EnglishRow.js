import React from "react"
import ellipsis from "../../../../../images/ellipsis.svg"
class EnglishRow extends React.Component {

render() {

      let id = !this.props.result.english_questions[0] ? 'Loading...' :this.props.result.english_questions[0].question_id

      return ( 
            <tr key={!this.props.result.english_questions[0] ? 'Loading...' :this.props.result.english_questions[0].question_id}>
                  <td><input type= "checkbox" id = {id} onChange = {this.props.handleChange}/></td>
                  <td><pre >{!this.props.result.english_questions[0] ? 'Loading...' :this.props.result.english_questions[0].question}</pre></td>
                  <td><pre >{!this.props.result.english_questions[0] ? 'Loading...' :this.props.result.english_questions[0].answer}</pre></td>
       
            </tr>
      )}}

export default EnglishRow