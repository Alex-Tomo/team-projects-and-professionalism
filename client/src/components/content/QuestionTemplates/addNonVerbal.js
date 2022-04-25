import React from "react"
import axios from "axios";
import authHeader from "../../../services/auth-header";
import "../Modals"

class AddNonVerbal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        filename: null,
        answer: "",
    }
    
      
} 


openModal($el) {
    $el.classList.add('is-active');
  }

handleChange = (e) => {
  
    
    this.setState({ filename: e.target.files[0]})
  
  }
  
handleAnswer = (e) => {
this.setState({answer: e.target.value})

}

  addQuestion = () => {


    if(this.state.filename == "") {
      alert("Input field cannot be empty")
      return
    }
    if(this.state.answer.trim() === "") {
      alert("Input field cannot be empty")
      return
    }
   axios.get("https://kip-learning.herokuapp.com/api/nonverballesson/add",
  {
    headers: authHeader(),
    params:{
      
     
      filname: this.state.filename,
      answer: this.state.answer,

    }
  }).then(() => {
    
    alert("Question: " +this.state.filename + " Answer: " + this.state.answer + " Added!")
    
    this.handleCreate({
       
        filname: this.state.filename,
        answer: this.state.answer,
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
                <div className="modal is-fullwidth" id ="nonverbal">
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
                                    
                                        <th>Answer</th>
                                  
                                
                                    </tr>
                                </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input className = "input" type="file" onChange={this.handleChange} ref={""} />
                                    </td>
                                    <td>
                                        <input className = "input"  type="input" onChange ={this.handleAnswer}/>
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

export default AddNonVerbal