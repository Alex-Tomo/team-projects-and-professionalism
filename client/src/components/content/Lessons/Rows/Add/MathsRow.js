import React from "react"

class MathsRow extends React.Component {

constructor(props){
  super(props)
  this.state={
    name:"",

  }
}


  
render() {
  let id = !this.props.result.math_questions[0] ? 'Loading...' :this.props.result.math_questions[0].question_id

      return (
        
                             
          <tr key={!this.props.result.math_questions[0] ? 'Loading...' :this.props.result.math_questions[0].question_id}>
                  <td><input type= "checkbox" id = {id} onChange = {this.props.handleChange}/></td>
          <td style={{width: "40%", wordWrap: "break", whiteSpace: "pre-line"}}><pre >{!this.props.result.math_questions[0] ? 'Loading...' :this.props.result.math_questions[0].statement} </pre></td>    
         <td style={{width: "40%", wordWrap: "break", whiteSpace: "pre-line"}}><pre >{!this.props.result.math_questions[0] ? 'Loading...' :this.props.result.math_questions[0].question} </pre></td>
         <td style={{width: "40%", wordWrap: "break", whiteSpace: "pre-line"}}> <pre >{!this.props.result.math_questions[0] ? 'Loading...' :this.props.result.math_questions[0].answer} </pre></td>

         </tr>
        
          
        

      )}}

export default MathsRow