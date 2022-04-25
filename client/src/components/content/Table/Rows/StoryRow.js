import React from "react"
import Checkbox from "../../../admin/Elements/Checkbox"
import ellipsis from "../../../../images/ellipsis.svg"
import EditQuestion from "../../EditQuestion"
import axios from "axios"
import authHeader from "../../../../services/auth-header"
class StoryRow extends React.Component {

  removeStory(){
    console.log(this.props.result.story_id)
    let remove = window.confirm("Do you want to delete this Story?")
    if (remove){
    axios.get("https://kip-learning.herokuapp.com/api/englishstory/remove",
    {
      headers: authHeader(),
      params:{
        
          story_id: this.props.result.story_id,
          title: ""

      }
    }).then(() => {
      this.removeStory( 
      {
          
        story_id: this.props.result.story_id,
        title: ""
      }).catch(e => {
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

render() {
  let id = this.props.result.story_id
      return ( 
      
        <tr key={this.props.result.story_id}>
      
      <td><input type= "checkbox" id = {id} onChange = {this.props.handleChange}/></td>
        <td classNamme = "js-modal-parent  is-hoverable " 
            data-target = "editQuestion " onClick={() => { document.getElementById("editQuestion").classList.add("is-active")}}>{this.props.result.title}</td>
        <td classNamme = "js-modal-parent  is-hoverable " 
            data-target = "editQuestion " onClick={() => { document.getElementById("editQuestion").classList.add("is-active")}}>{this.props.result.story}</td>
        <td classNamme = "js-modal-parent  is-hoverable " 
            data-target = "editQuestion " onClick={() => { document.getElementById("editQuestion").classList.add("is-active")}}>{this.props.result.createdAt.toString().split('T')[0]}</td>
           <td>
           <div
             className="dropdown is-right is-active"
             onClick={() => {
               this.handleToggle(`menu${this.props.result.story_id}`);
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
             <div className="dropdown-menu is-hidden" id={`menu${this.props.result.story_id}`} role="menu">
               <div className="dropdown-content">
                 <div className="dropdown-item">
                   <button
                     style={{ width: "100%" }}
                     className="button is-radiusless"
                     onMouseDown={() => {
                       console.log(this.props.result.story_id);
                     } }
                   >
                     Edit
                   </button>
                   <br />
                   <button
                     style={{ width: "100%"}}
                     className="button is-danger is-radiusless"
                     onMouseDown={() => {
                       this.removeStory()
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

export default StoryRow