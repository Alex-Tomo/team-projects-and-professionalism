import React from "react"
import axios from "axios"
import "../Modals"
import "../Functionality/Checkbox"
import AddLesson from "./addLesson"
import authHeader from "../../../services/auth-header"
import EditLesson from "./editLesson"
import PageButtons from "../Functionality/PageButtons"
import magnifyingGlass from "../../../images/magnifying_glass.svg"
import ellipsis from "../../../images/ellipsis.svg"
import Checkbox from "../Functionality/Checkbox"
class LessonsTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isCheckAll: false,
      numSelected: 0,
      type: 0,
      tableName: "All Questions",
      all: [],
      type: "all",
      lessons: this.props.lessons,
      story: [],
      result : [],
      selected:[],
      arr:[],
      page: 1,
    }
  }

  removeLesson()
  {
    let remove = window.confirm("Do you want to delete these Lessons?")
    let arr = []
    let lessonLength = !this.state.lessons ? 'Loading...' :this.state.lessons.length

    if (remove){
    
    
    //console.log(this.state.all)
    console.log(this.state.selected)
    for (let i = 0; i < this.state.selected.length; i++) {
      for (let j = 0; j < lessonLength; j++) {
        
        if(this.state.selected[i] == this.state.lessons[j].lesson_id)
          {
              arr[i] = this.state.lessons[j];
              
              console.log(arr[i])

          }
        
      }
    }
  

    for (let i = 0; i <  lessonLength; i++) {
      console.log(arr[i].lesson_id)
    axios.get("https://kip-learning.herokuapp.com/api/lessons/remove",
    {
      headers: authHeader(),
      params:{
        
          lesson_id: arr[i].lesson_id,
          lesson_type: ""

      }
    }).then(() => {
      this.removeLesson( 
      {
          
        lesson_id: arr[i].lesson_id,
        lesson_type: ""
      })
    
      .catch(e => {
        alert ("Couldn't Remove!!")
   
      })})
    }
  }
  }



  handleChange = (e) => {

    let arr = this.state.arr
    let lessonLength = !this.state.lessons ? 'Loading...' :this.state.lessons.length
    let lesson = !this.state.lessons ? 'Loading...' :this.state.lessons
  
      if(e.target.checked === true) {
          
       for(let i = 0; i < lessonLength; i++) {
         if(e.target.id == lesson[i].lesson_id){
            arr[i] = lesson[i].lesson_id
           // console.log(arr);
            //console.log(lesson)
       }else{
        if(arr[i] == null){
        // console.log("delete")
          arr = arr.filter(n => {return n != null})
        }
      }
    }
    }
    else{
        for(let i = 0; i < lessonLength; i++) {
             arr = arr.filter(a => {return a != e.target.id})
        }
    }
   // console.log(arr)

     this.setState({arr: arr})

     this.setQuestionsIds(arr)
   }


   setQuestionsIds = (arr) =>{
    this.setState({
      selected : arr
    })
      
    }
  
  handlePaginationClick = (pageNumber) => {
    let button = document.getElementById(`page-button-${pageNumber}`)

    let li = document.getElementById('pagination-list-id').getElementsByTagName('li')

    for (let i = 0; i < li.length; i++) {
      let buttons = li[i].getElementsByTagName('button')
      for (let j = 0; j < buttons.length; j++) {
        if (buttons[j] !== undefined) {
          buttons[j].classList.remove("is-current")
        }
      }
    }

    button.classList.add("is-current")
    this.setState({page: pageNumber})
  }

componentDidMount(){
    this.getAllLessons()

 }

 getAllLessons = () =>{
  axios.get('https://kip-learning.herokuapp.com/api/lessons/all', {
    headers: authHeader()
  }).then(r => {
    this.setState({lessons: r.data})
  }).catch(e => {
    console.log(e)
  })
}

editLesson = (e) =>{
  console.log(e.target.id)
  document.getElementById("editLesson").classList.add("is-active")
  

  let result = this.state.lessons[e.target.id-1]
  //console.log(result)
  this.setState({

    result : result
  })
  return result
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
  let pageButtons = "";
   
    let results = !this.state.lessons ? 'Loading...' :this.state.lessons.map(({id, lesson_id, lesson_name, question_list, lesson_type}) => {

      if(lesson_type !== "")
      {
        return (
          <>
          
          <tr key={id}>
          
                    <td><input type= "checkbox" id = {lesson_id} onChange = {this.handleChange}/></td>
                    <td className = "js-modal-parent  is-hoverable " id = {lesson_id} data-target = "editLesson " onClick={this.editLesson}>{lesson_name}</td>
                    <td className = "js-modal-parent  is-hoverable " id = {lesson_id} data-target = "editLesson " onClick={this.editLesson}>{question_list}</td>
                    <td className = "js-modal-parent  is-hoverable "id = {lesson_id} data-target = "editLesson " onClick={this.editLesson}>{lesson_type}</td>
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
                        this.editLesson()
                        } }
                     >
                       Edit
                     </button>
                     <br />
                     <button
                       style={{ width: "100%"}}
                       className="button is-danger is-radiusless"
                       onMouseDown={() => {
                         console.log(id);
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
              
          </>
        
        )
      }
      else
      {

      }
    })
     

    let lessonLength = !this.state.lessons ? 'Loading...' :this.state.lessons.length

    if(lessonLength > 0) {
      const pageSize = 10
      let pageMax = this.state.page * pageSize
      let pageMin = pageMax - pageSize
  
  
      pageButtons = (
          <PageButtons
            currentPage={this.state.page}
            pageSize={pageSize}
            resultsLength={lessonLength}
            handlePaginationClick={(i) => this.handlePaginationClick(i)}
          />
      )
  
      results = results.slice(pageMin, pageMax)
    }
  

    return (
      <div>
          <AddLesson length = {lessonLength}></AddLesson>
          <EditLesson lesson = {this.state.result}/> 
          <div className="users-table-options">
          <div style={{ textAlign: "start" }}>

          <div><p className = "Control has-text-centered" >All Lessons</p></div>
           
            </div>
           
          
          <p>{this.state.selected.length} Selected</p>
          <div className="field has-addons">
            
            <div className="control content-table-search-container">
            <button  className="button is-fullwitdth js-modal-parent" data-target = "lesson" onClick={() => { document.getElementById("lesson").classList.add("is-active")}} >Add</button>
            </div>
            <p className="control content-table-search-container">
              <button id="remove-button" className="button is-danger" onClick={()=>{this.removeLesson()}} disabled={this.state.selected.length < 1}>Remove</button>
            </p>
            <div className="control has-icons-right content-table-search-container">
            <input
              id="content-search"
              className="input"
              type="search"
              placeholder="Search"
              onChange={this.handleSearch}
            />
            <span className="icon is-small is-right">
              <img
                src={magnifyingGlass}
                alt="Magnifying Glass"
              />
            </span>
          </div>
          
        </div>
        
      </div> 
      <table className="table is-striped users-table is-fullwidth">
          <thead>
              <th><Checkbox/></th>
              <th>Lesson Name</th>
              <th>Questions</th>
              <th>Type</th>
              <th>Actions</th>
              
          </thead>
          <tbody>
          {results}

          </tbody>
        </table>
        <div className="users-table-footer">
            <p>Showing {results.length} of {lessonLength} results</p>
            {pageButtons}
          </div>
      </div>
      
    )
  
    }
    }

export default LessonsTable