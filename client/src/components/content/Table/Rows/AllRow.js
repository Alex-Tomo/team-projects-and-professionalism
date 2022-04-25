import React from "react"
import Checkbox from "../../Functionality/Checkbox"
import ellipsis from "../../../../images/ellipsis.svg"
import EditQuestion from "../../EditQuestion"
import axios from "axios"
import authHeader from "../../../../services/auth-header"

class AllRow extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      content: "",
      edit: "",
      images : this.importAll(require.context("../../../lessons/nonverbalreasoningimages", false, /\.(svg)$/)),
    }
  }

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

checkResult = (result) => {
    let obj = {}

    if (result.math_questions.length > 0) {
        obj = {
            id: result.math_questions[0].question_id,
            question: result.math_questions[0].question,
            answer: result.math_questions[0].answer,
            updatedAt: result.math_questions[0].updatedAt.toString().split('T')[0]
        }
    } else if (result.english_questions.length > 0) {
        obj = {
            id: result.english_questions[0].question_id,
            question: result.english_questions[0].question,
            answer: result.english_questions[0].answer,
            updatedAt: result.english_questions[0].updatedAt.toString().split('T')[0]
        }
    } else if (result.verbal_reasoning_questions.length > 0) {
        obj = {
            id: result.verbal_reasoning_questions[0].question_id,
            question: result.verbal_reasoning_questions[0].question,
            example: result.verbal_reasoning_questions[0].example,
            answer: result.verbal_reasoning_questions[0].answer,
            updatedAt: result.verbal_reasoning_questions[0].updatedAt.toString().split('T')[0]
        }
    } else if (result.non_verbal_reasoning_questions.length > 0) {
        obj = {
            id: result.non_verbal_reasoning_questions[0].question_id,
            question:  <img src={this.state.images[result.non_verbal_reasoning_questions[0].filename]} alt="Non-Verbal" />,
            answer: result.non_verbal_reasoning_questions[0].answer,
            updatedAt: result.non_verbal_reasoning_questions[0].updatedAt.toString().split('T')[0]
        }
    }

    return obj
}

editQuestion = () =>{
  document.getElementById("editQuestion").classList.add("is-active")
  
 //console.log("oioi")
  this.setState({

    edit : <EditQuestion result = {this.props.result}/>,
    
  })

  
  
    
}

importAll = (r) => {

  let images = {}

  r.keys().forEach((item, index) => {

      images[item.replace('./', '')] = r(item)

  })

  return images

}


render() {
 // let title = this.checkQuestion();
  //console.log(this.props.result)

  

  let result = this.checkResult(this.props.result);

  //let filename = result.non_verbal_reasoning_questions[0].filename;
  
  

  let id = this.props.result.question_id


  
      return ( 
        <>
       
        <tr key={result.id} id = {id} >
      
     

        <td><input type= "checkbox" id = {id} onChange = {this.props.handleChange}/>
       
         </td>
         <td style={{wordWrap: "break", whiteSpace: "pre-line"}}
         
            classNamme = "is-pulled-left js-modal-parent  is-hoverable  is-flex-direction-column" 
            data-target = "editQuestion " onClick={() => {this.editQuestion()}}>
            <pre style={{width: "400px",wordWrap: "break", whiteSpace: "pre-line"}}>
           {result.question}
           </pre>
          </td>
         <td style={{width: "40%", wordWrap: "break", whiteSpace: "pre-line"}} classNamme = "is-pulled-left js-modal-parent  is-hoverable "
        
              data-target = "editQuestion " onClick={() => {this.editQuestion()}}>
                 <pre style={{width: "100%", wordWrap: "break", whiteSpace: "pre-line"}}>
           {result.answer}
           </pre>
           </td>
         <td><pre
            classNamme = "js-modal-parent  is-hoverable " 
            data-target = "editQuestion " onClick={() => { document.getElementById("editQuestion").classList.add("is-active")}}>
            {result.updatedAt}
         </pre>
         </td>
         <td>
           <div
             className="dropdown is-right is-active"
             onClick={() => {
               this.handleToggle(`menu${result.id}`);
             } }
             onBlur={() => {
              this.closeButtonMenu(`menu${result.id}`);
              }}

           >
             <div className="dropdown-trigger">
               <button className="button" aria-haspopup="true" aria-controls="dropdown-menu6">
                 <span className="icon is-small">
                   <img src={ellipsis} alt="Ellipsis" />
                 </span>
               </button>
             </div>
             <div className="dropdown-menu is-hidden" id={`menu${result.id}`} role="menu">
               <div className="dropdown-content">
                 <div className="dropdown-item">
                   <button
                     style={{ width: "100%" }}
                     className="button is-radiusless"
                     onMouseDown={() => {
                       console.log(result.id);
                     } }
                   >
                     Edit
                   </button>
                   <br />
                   <button
                     style={{ width: "100%"}}
                     className="button is-danger is-radiusless"
                     onMouseDown={() => this.removeQuestion()}
                   >
                     Remove
                   </button>
                   {this.state.edit}
                 </div>
               </div>
             </div>
           </div>
         </td>
         </tr>
         </>
      )}}

export default AllRow