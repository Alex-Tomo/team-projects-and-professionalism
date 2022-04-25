import React from "react"
import axios from "axios";
import authHeader from "../../services/auth-header";
import EnglishHeader from "./Lessons/Header/EnglishHeader"
import MathsHeader from "./Lessons//Header/MathsHeader"
import NonVerbalHeader from "./Lessons/Header/NonVerbalHeader"
import VerbalHeader from "./Lessons/Header/VerbalHeader"


class EditQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
        result:!this.props.result?"Loading":this.props.result,
        
       
       
    }
    
      
  }




       render() {

         console.log(this.state.result.question_id)
        let id = !this.state.result?"Loading":this.state.result.question_id

        return (
            <div>
                <div className="modal" id ="editQuestion">
                <div className = "modal-background"></div>
                <div className= "modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">View Question</p>
                        <button className="delete" aria-label="close" onClick={() => { document.getElementById("editQuestion").classList.remove("is-active")}}></button>
                    </header>
                    <section className="modal-card-body">
                        <div className ="question-container">
                            {id}
                        </div> 
                    </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick ={""}>Edit</button>
                    <button className="button is-danger" onClick={() => { document.getElementById("editQuestion").classList.remove("is-active")}}>Cancel</button>
                </footer>
                </div>
                </div>
            </div>
        )
      }
    }

export default EditQuestion