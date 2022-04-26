import React from "react"
import Checkbox from "../../../admin/Elements/Checkbox"
import ellipsis from "../../../../images/ellipsis.svg"
import EditQuestion from "../../EditQuestion"
import axios from "axios"
import authHeader from "../../../../services/auth-header"

class EnglishRow extends React.Component {

  removeQuestion()
  {
    let remove = window.confirm("Do you want to delete this Questions?")
    if (remove){
    let arr = []
    
    axios.get("https://kip-learning.herokuapp.com/api/questions/remove",
    {
      headers: authHeader(),
      params:{
        
          question_id: this.props.result.question_id,
          question_type: ""

      }
    }).then(() => {
      this.removeQuestion( 
      {
          
          question_id: this.props.result.question_id,
          question_type: "",
      })
    
      .catch(e => {
        alert ("Couldn't Remove!!")
      })})
  }
}


checkStory = () => {
  let title = ""

  for (let i = 0; i < this.props.story.length; i++) {
    if (!this.props.result.english_questions[0] ? 'Loading...':this.props.result.english_questions[0].story_id === this.props.story[i].story_id) {
      title = this.props.story[i].title
      break
    }
  }

  return title
}

handleToggle = (id) => {
  if (document.getElementById(id).classList.contains("is-hidden")) {
    document.getElementById(id).classList.remove("is-hidden")
  } else {
    document.getElementById(id).classList.add("is-hidden")
  }
}

closeButtonMenu = (id) => {
  document.getElementById(id).classList.add("is-hidden")
}
render() {

let title = this.checkStory()
//console.log(this.props.story)
  let id = !this.props.result.english_questions[0] ? 'Loading...' :this.props.result.english_questions[0].question_id
      return ( 
        <tr key={!this.props.result.english_questions[0] ? 'Loading...' :this.props.result.english_questions[0].question_id}>
      
        <td><input type= "checkbox" id = {id} onChange = {this.props.handleChange}/></td>
        <td classNamme = "js-modal-parent  is-hoverable " 
            data-target = "editQuestion " onClick={() => { document.getElementById("editQuestion").classList.add("is-active")}}>{title}</td>
        <td classNamme = "js-modal-parent  is-hoverable " 
            data-target = "editQuestion " onClick={() => { document.getElementById("editQuestion").classList.add("is-active")}}>{!this.props.result.english_questions[0] ? 'Loading...' :this.props.result.english_questions[0].question}</td>
        
        <td classNamme = "js-modal-parent  is-hoverable " 
            data-target = "editQuestion " onClick={() => { document.getElementById("editQuestion").classList.add("is-active")}}>{!this.props.result.english_questions[0] ? 'Loading...':this.props.result.english_questions[0].answer}</td>
        <td classNamme = "js-modal-parent  is-hoverable " 
            data-target = "editQuestion " onClick={() => { document.getElementById("editQuestion").classList.add("is-active")}}>{!this.props.result.english_questions[0] ? 'Loading...':this.props.result.english_questions[0].createdAt.toString().split('T')[0]}</td>
           <td>
           <div
             className="dropdown is-right is-active"
             onClick={() => {
               this.handleToggle(`menu${id}`);
             } }
             onBlur={() => {
              this.closeButtonMenu(`menu${id}`);
              }}

           >
             <div className="dropdown-trigger">
               <button className="button" aria-haspopup="true" aria-controls="dropdown-menu6">
                 <span className="icon is-small">
                   <img src={ellipsis} alt="Ellipsis" />
                 </span>
               </button>
             </div>
             <div className="dropdown-menu is-hidden" id={`menu${id}`} role="menu">
               <div className="dropdown-content">
                 <div className="dropdown-item">
                   <button
                     style={{ width: "100%" }}
                     className="button is-radiusless"
                     onMouseDown={() => {
                       console.log(this.props.result.question_id);
                     } }
                   >
                     Edit
                   </button>
                   <br />
                   <button
                     style={{ width: "100%"}}
                     className="button is-danger is-radiusless"
                     onMouseDown={() => {
                      this.removeQuestion()
                     } }
                   >
                     Remove
                   </button>
                 </div>
               </div>
             </div>
           </div>
         </td>
         </tr>
      )}}

export default EnglishRow