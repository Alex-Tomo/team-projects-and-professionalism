import React from "react"
import axios from "axios";
import authHeader from "../../../../../services/auth-header";
class MathsTemplate2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input1: "{?}",
      input2: "",
      input3: "",
      symbol: "+",

      statement:"",
      question: "",
      answer: "",
      question_type:2,
      }
    }

    handleChange = (e) => {
      this.setState({symbol: e.target.value})
      console.log(this.state.symbol)
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
      if(this.state.answer.trim() === "") {
        alert("Input field cannot be empty")
        return
      }
      
      this.state.question = this.state.input1 +" "+ this.state.symbol +" "+ this.state.input2 + " = " + this.state.input3;
      //console.log(this.state.question)
      //console.log("Question: " +this.state.question + " Answer: " + this.state.answer)
      
     axios.get("https://kip-learning.herokuapp.com/api/mathslesson/add",
    {
      headers: authHeader(),
      params:{
        
        statement: this.state.statement,
        question: this.state.question,
        answer: this.state.answer,
        question_type: this.state.question_type

      }
    }).then(() => {
      
      alert("Question: " +this.state.question + " Answer: " + this.state.answer + " Added!")
      
      this.handleCreate({
        
        statement: this.state.statement,
        question: this.state.question,
        answer: this.state.answer,
        question_type: this.state.question_type,
        updatedAt: new Date().toISOString(),
      })
      .catch(e => {
        alert ("Couldn't add Question!!!")
      })
    }
    )

  
    }

  render() {
    return (
      <div className="modal is-fullwidth" id = "MathsTemp2">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">New Question</p>
          <button className="delete" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
        <div className = "question-container">
            <table className="table is-striped users-table">
            <thead>
              <tr className="table-row-head">
              <th>Question</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>Answer</th>
            </tr>
            </thead>
            <tbody>
                  <tr>
                    <td>
                  <input className="input is-normal" 
                        type="number" name="name" 
                        placeholder="?" disabled
                        maxLength={5}
                        />
                  </td>
                  <td className ="select" >
                      <select onChange={this.handleChange}style = {{marginTop: "6px"}}>
                        <option value = "+">+</option>
                        <option value = "-">-</option>
                        <option value = "X">X</option>
                        <option value = "/">÷</option>
                      </select>
                    
                  </td>
                  <td>
                  <input className="input is-normal" 
                        type="number" name="name" 
                        placeholder="297"
                        maxLength={5}
                        
                        onChange={this.handleInput2} />
                  </td>
                  <td>
                    <h2>=</h2>
                  </td>
                  <td>
                    <input className="input is-disaled" 
                        type="number" name="name"
                        placeholder="751" 
                        onChange={this.handleInput3}
                         />
                  </td>
                  <td>
                  </td>
                  <td>
                    <input className="input is-normal" 
                        type="number" name="name" 
                        placeholder="?"
                        maxLength={9}
                        onChange={this.handleAnswer} />
                  </td>
                  </tr>
                </tbody>
            </table>
            </div>
        </section>

        <footer className="modal-card-foot">
        <button className="button is-success" onClick = {this.addQuestion}>Add Button</button>
        <button className="button is-danger" data-target = "MathsTemp2">Cancel</button>
        </footer>
      </div>
      </div>
    )
  }
}

export default MathsTemplate2