import React from "react"
class MathsRow extends React.Component {

constructor(props){
  super(props)
  this.state={
    name:"",

  }
}

checkQuestion (){
let title = "";
  if (this.props.result.math_questions[0].statement === null){
    title = this.props.result.math_questions[0].question
    
    return title
    
  }
  else{
    //console.log(this.props.result.statement)
    title = this.props.result.math_questions[0].statement

    return title
  }
}

  
render() {
  let title = this.checkQuestion();
  //console.log(this.props.result)
  //console.log(this.state.questions)
  let id = this.props.result.math_questions[0].question_id

      return ( 
          <tr key={this.props.result.math_questions[0].question_id}>
                  <td><input type= "checkbox" id = {id} onChange = {this.props.handleChange}/></td>
         <td>{this.props.result.math_questions[0].question}</td>
         <td>{this.props.result.math_questions[0].answer}</td>

         </tr>
        
          
        

      )}}

export default MathsRow