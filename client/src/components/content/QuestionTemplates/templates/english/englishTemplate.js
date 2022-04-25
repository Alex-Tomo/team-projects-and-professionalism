import React from "react"
import axios from "axios"
import authHeader from "../../../../../services/auth-header"

class EnglishTemplate extends React.Component {
 constructor(props){
     super(props)

     this.state= {

        story_id: this.props.id,
        
        answer: "",
        input1:"",
        input2:"",
        input3:"",
        input4:"",
        question:"",

     }
 }

 handleInput1 = (e) => {
    this.setState({input1: e.target.value})
  }
  handleInput2 = (e) => {
    this.setState({input2: e.target.value})
  }
  handleInput3 = (e) => {
    this.setState({input3: e.target.value})
  }
  handleInput4 = (e) => {
    this.setState({input4: e.target.value})
  }
  handleQuestion = (e) => {
    this.setState({question: e.target.value})
  }
  handleAnswer = (e) => {
    this.setState({answer: e.target.value})
  }
  
    addQuestion = () => {
        if(this.state.input1.trim() === "") {
          alert("Input field cannot be empty")
          return
        }
        if(this.state.input2.trim() === "") {
          alert("Input field cannot be empty")
          return
        }
        if(this.state.input3.trim() === "") {
            alert("Input field cannot be empty")
            return
          }
          if(this.state.input4.trim() === "") {
            alert("Input field cannot be empty")
            return
          }
          if(this.state.question.trim() === "") {
            alert("Input field cannot be empty")
            return
          }
        if(this.state.answer.trim() === "") {
          alert("Input field cannot be empty")
          return
        }
    
        //console.log(this.state.question)
        //console.log("Question: " +this.state.question + " Answer: " + this.state.answer)
        
       axios.get("https://kip-learning.herokuapp.com/api/englishlesson/add",
      {
        headers: authHeader(),
        params:{
          
            question: this.state.question,
            answer: this.state.answer,
            incorrect_answer_one: this.state.input1,
            incorrect_answer_two: this.state.input2,
            incorrect_answer_three: this.state.input3,
            incorrect_answer_four: this.state.input4,
            story_id: this.props.id
  
        }
      }).then(() => {
        
        alert("Question: " +this.state.question +" // Story ID:" + this.props.id +" // Answer: " + this.state.answer + " // Incorrect: "+ this.state.input1  + this.state.input2 + this.state.input3 +this.state.input4 )
        
        this.handleCreate({
          
            question: this.state.question,
            answer: this.state.answer,
            incorrect_answer_one: this.state.input1,
            incorrect_answer_two: this.state.input2,
            incorrect_answer_three: this.state.input3,
            incorrect_answer_four: this.state.input4,
            story_id: this.props.id,
            updatedAt: new Date().toISOString(),
        })
        .catch(e => {
          alert ("Couldn't add Question!!!")
        })
      }
      )
  
    
      }

    render() {
        console.log(this.state.question)
            return (
                <div>
                    <div className="modal is-fullwidth" id ="englishTemplate">
                    <div className = "modal-background"></div>
                    <div className= "modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">New Question</p>
                            <button className="delete" aria-label="close"></button>
                        </header>
                        <section className="modal-card-body">
                            <div className ="question-container">
                                <table className="table is-striped users-table">
                                <thead>
                                        <tr className="table-row-head">
                                            <th>Question</th>
                                        </tr>
                                    </thead>
                                <tbody>
                                 <tr>
                                    <td>
                                        <input className ="input"  type="text" onChange={this.handleQuestion}></input>
                                    </td>
                                </tr>
                                </tbody>
                                </table>
                                <table className="table is-striped users-table">   
                                    <thead>
                                        <tr className="table-row-head">
                                            <th>Answers</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                <tbody>
                                 <tr>
                                    <td>Correct Answer</td> 
                                    <td>
                                        <input className ="input is-normal" onChange={this.handleAnswer}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Incorrect Answers</td> 
                                    <td>
                                        <input className ="input is-normal" onChange={this.handleInput1}></input>
                                    </td>
                                    
                                </tr>
                                <tr>
                                    <td></td> 
                                    <td>
                                        <input className ="input is-normal" onChange={this.handleInput2}></input>
                                    </td>
                                    
                                </tr>
                                <tr>
                                    <td></td> 
                                    <td>
                                        <input className ="input is-normal" onChange={this.handleInput3}></input>
                                    </td>
                                    
                                </tr>
                                <tr>
                                    <td></td> 
                                    <td>
                                        <input className ="input is-normal" onChange={this.handleInput4}></input>
                                    </td>
                                    
                                </tr>
                                </tbody>
                                </table>
                            </div> 
                        </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={this.addQuestion}>Submit</button>
                        <button className="button is-danger" data-target = "english">Cancel</button>
                    </footer>
                    </div>
                    </div>
                </div>
        )
        }
    }


export default EnglishTemplate 