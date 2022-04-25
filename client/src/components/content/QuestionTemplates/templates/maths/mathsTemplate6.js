import React from "react"
import axios from "axios";
import authHeader from "../../../../../services/auth-header";
class MathsTemplate6 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input1: "",
      input2: "",
      input3: "{?}",
      symbol: "+",

      statement:"",
      question: "",
      answer: "",
      question_type:6,
      inputs: [ {question: "", firstAnswer: "", secondAnswer: ""}]
      
      }
    }
    
    createRow(){
      return this.state.inputs.map((el, i) => <tr key = {i}>
      <td>
        <input className="input is-normal" />
      </td>
      <td>
        <input className="input is-normal" />
      </td>
      <td>
        <input className="input is-normal"/>
      </td>
        <td>
          <button className="button" aria-haspopup="true" onClick = {this.removeClick.bind(this,i)}>
            <span className="icon is-small">
              -
            </span>
          </button>
          </td>
        <td><button className="button" aria-haspopup="true" onClick = {this.addClick.bind(this)}>
            <span className="icon is-small">
              +
            </span>
          </button>
      </td>
      </tr>)
    }

    handleChange(i, e) {
      const { name, value } = e.target;
      let inputs = [...this.state.inputs];
      inputs[i] = {...inputs[i], [name]: value};
      this.setState({ inputs });
   }

   handleSubmit(event) {
    alert('A name was submitted: ' + JSON.stringify(this.state.users));
    event.preventDefault();
    }

    addClick(){
      this.setState(prevState => ({inputs: [...prevState.inputs, {question: "", firstInput: "", secondInput: "" }]}))
    }

    removeClick(i){
      let inputs = [...this.state.inputs];
      inputs.splice(i,1);
      this.setState({ inputs });
   }

    addQuestion = () => {
    /*  if(this.state.inputs.trim() === "") {
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
      }*/
      
      this.state.question = this.state.input1 +" "+ this.state.symbol +" "+ this.state.input2 + " = " + this.state.input3;
      console.log(this.state.inputs)
      alert(this.state.inputs.question + this.state.inputs.firstAnswer + this.state.inputs.secondAnswer)
     
     /* axios.get("https://kip-learning.herokuapp.com/api/mathslesson/add",
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
    )*/
    }



  render() {
    
    return (

      
    

      <div>
        
        <div className="modal is-fullwidth" id = "MathsTemp6">
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
                  <th>Statement</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                  
                  <tr>
                    <td>
                  <input className="input is-normal" 
                        type="number" name="name" 
                        placeholder="454"
                        maxLength={5}
                        onChange={this.handleInput1} />
                  </td>
                  </tr>
                </tbody>
                </table>
                <table className="table is-striped users-table">
                <thead>
                  <tr className="table-row-head">
                  <th>Questions</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
                </thead>
                <thead>
                  <tr className="table-row-head">
                  <th>Question:</th>
                  <th>Answers:</th>
                  <th></th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                  <input type = "text"className="input is-normal" value={this.state.inputs.question}/>
                      </td>
                      <td>
                        <input type = "text"className="input is-normal" value={this.state.inputs.firstAnswer}/>
                      </td>
                      <td>
                        <input type = "text"className="input is-normal" value={this.state.inputs.secondAnswer}/>
                      </td>
                    <td>
                      <div className="dropdown-trigger">
                    <button className="button" aria-haspopup="true" onClick = {this.addClick.bind(this)}>
                      <span className="icon is-small">
                      +
                      </span>
                    </button>
                    </div>
                  </td>
                  </tr>
                  {this.createRow()}

                  
                </tbody>
                </table>
                </div>
            </section>

            <footer className="modal-card-foot">
            <button className="button is-success" onClick = {this.addQuestion}>Submit</button>
            <button className="button is-danger" data-target = "MathsTemp1">Cancel</button>
            </footer>
          </div>
          </div>
          </div>
    )
  }
}

export default MathsTemplate6