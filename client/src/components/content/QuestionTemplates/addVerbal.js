import React from "react"
import axios from "axios"
import authHeader from "../../../services/auth-header";
import "../Modals"
class AddVerbal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        
        story: "",
        question: "",
        example: "",
        type: 1,
    }
    
      
}
openModal($el) {

    $el.classList.add('is-active');
 
}

handleCreate = async (newInsert) => {
    let tempArray = this.state.newResults
    tempArray.push(newInsert)
    await this.setState({
      newResults: tempArray
    })
  }
  
handleQuestion = (e) => {
    this.setState({question: e.target.value})
}
handleAnswer = (e) => {
    this.setState({answer: e.target.value})
  }
  
addQuestion = () => {
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
        
       axios.get("https://kip-learning.herokuapp.com/api/verballesson/add",
      {
        headers: authHeader(),
        params:{
          
            question: this.state.question,
            answer: this.state.answer,
            example: this.state.example,
            type: this.state.type,
  
        }
      }).then(() => {
        
        alert("Question: " +this.state.question +" // Answer: " + 
        this.state.answer)
        
        this.handleCreate({
          
            question: this.state.question,
            answer: this.state.answer,
            example: this.state.example,
            type: this.state.type,
            updatedAt: new Date().toISOString(),
        })
        .catch(e => {
          alert ("Couldn't add Question!!!")
        })
        }
    )    
}

       render() {
        
        (document.querySelectorAll('.js-modal-parent') || []).forEach(($trigger) => {
            const modal = $trigger.dataset.target;
            const $target = document.getElementById(modal);
           // console.log($target);
        
            $trigger.addEventListener('click', () => {
              this.openModal($target);
            });
          });
        return (
            <div>
                <div className="modal is-fullwidth" id ="verbal">
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
                                    <textarea id = "inputarea" className = "input" onChange = {this.handleQuestion}></textarea>
                                </td>
                            </tr>
                            </tbody>
                                <thead>
                                    <tr className="table-row-head">
                                    
                                        <th>Answer</th>
                                    </tr>
                                </thead>
                            <tbody>
                             <tr>
                                <td>
                                    <input className = "input" onChange = {this.handleAnswer}></input>
                                </td>
                            </tr>
                            </tbody>
                            </table>
                        </div> 
                    </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick = {this.addQuestion}>Submit</button>
                    <button className="button is-danger">Cancel</button>
                </footer>
                </div>
                </div>
            </div>
        )
      }
    }

export default AddVerbal