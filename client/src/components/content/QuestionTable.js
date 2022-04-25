import React from "react"
import axios from "axios"
import AddMaths from "./QuestionTemplates/addMaths"

import EditQuestion from "./EditQuestion"


import "./Functionality/Checkbox"

import AddEnglish from "./QuestionTemplates/addEnglish"
import AddStory from "./QuestionTemplates/templates/story/addStory"
import AddVerbal from "./QuestionTemplates/addVerbal"
import AddNonVerbal from "./QuestionTemplates/addNonVerbal"

import QuestionBody from "./QuestionBody"

import authHeader from "../../services/auth-header"
import MathsHeader from "./Table/Header/MathsHeader"
import MathsRow from "./Table/Rows/MathsRow"

import EnglishHeader from "./Table/Header/EnglishHeader"
import EnglishRow from "./Table/Rows/EnglishRow"

import VerbalHeader from "./Table/Header/VerbalHeader"
import VerbalRow from "./Table/Rows/VerbalRow"

import NonVerbalHeader from "./Table/Header/NonVerbalHeader"
import  NonVerbalRow from "./Table/Rows/NonVerbalRow"

import StoryHeader from "./Table/Header/StoryHeader"
import StoryRow from "./Table/Rows/StoryRow"
import "./Modals"
import AllHeader from "./Table/Header/AllHeader"

import PageButtons from "./Functionality/PageButtons"

import magnifyingGlass from "../../images/magnifying_glass.svg"

class QuestionTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isCheckAll: false,
      numSelected: 0,
      tableHeader: <AllHeader />,
      tableName: "All Questions",
      questions: this.props.all,
      selected:[],
      arr:[],
      search: "",
      all: [],
      type: "all",
      story: this.props.story,
      storys:[],
      page: 1,
      curr:[],
      edit:[]
    }

    
  }


  setCurr = (curr) =>{

    this.setState({
  
      edit : curr
    })
  }
  setQuestionsIds = (arr) =>{

    this.setState({
  
      selected : arr
    })
  }

  remove()
  {

      if(this.state.type == "story")
      {
        this.removeStory()
      }
      else
      { 
        this.removeQuestion()
      }
  }

  removeStory()
  {

    let remove = window.confirm("Do you want to delete this Storys?")
    let arr = []
    if (remove){
    
    
    //console.log(this.state.all)
    //console.log(this.state.selected)
    for (let i = 0; i < this.state.selected.length; i++) {
      for (let j = 0; j < this.state.story.length; j++) {
        
        if(this.state.selected[i] == this.state.story[j].story_id)
          {
             

              arr[i] = this.state.story[j];
             // console.log(arr[i])
          }
        
      }
    }
    //console.log(arr.length);

    for (let i = 0; i <  this.state.selected.length; i++) {
      console.log(i);
    axios.get("https://kip-learning.herokuapp.com/api/englishstory/remove",
    {
      headers: authHeader(),
      params:{
        
          story_id: arr[i].story_id,
          title: ""

      }
    }).then(() => {
      this.removeStory( 
      {
          
        story_id: arr[i].story_id,
        title: ""
      })
    
      .catch(e => {
        alert ("Couldn't Remove!!")
      })})
    }
  }
  }

  removeQuestion()
  {
    let remove = window.confirm("Do you want to delete these Questions?")
    let arr = []
    if (remove){
    
    
    //console.log(this.state.all)
    //console.log(this.state.selected)
    for (let i = 0; i < this.state.selected.length; i++) {
      for (let j = 0; j < this.state.all.length; j++) {
        
        if(this.state.selected[i] == this.state.all[j].question_id)
          {
              //console.log(this.state.all[j])

              arr[i] = this.state.all[j];
          }
        
      }
    }
    //console.log(arr.length);

    for (let i = 0; i <  this.state.selected.length; i++) {
      console.log(i);
    axios.get("https://kip-learning.herokuapp.com/api/questions/remove",
    {
      headers: authHeader(),
      params:{
        
          question_id: arr[i].question_id,
          question_type: ""

      }
    }).then(() => {
      this.removeQuestion( 
      {
          
          question_id: arr[i].question_id,
          question_type: "",
      })
    
      .catch(e => {
        alert ("Couldn't Remove!!")
   
      })})
    }
  }
  }

  handleCurr = (e) => {

    console.log(e.target.id)
     // console.log(e.target.id)
      let curr = this.state.curr
 
     console.log(curr)
     if(e.target.checked === true) {
        for(let i = 0; i < this.state.all.length; i++) {
          
          if(e.target.id == this.state.all[i].question_id) {
            curr = this.state.all[i].question_id
          
      }

      console.log(curr)
    }
  }
}
   



  handleChange = (e) => {

   //console.log(this.state.all[e.target.id])
    // console.log(e.target.id)
     let arr = this.state.arr

    console.log(arr)
    if(e.target.checked === true) {
       for(let i = 0; i < this.state.all.length; i++) {
         
         if(e.target.id == this.state.all[i].question_id) {
           arr[i] = this.state.all[i].question_id
           console.log(arr);
          // console.log(this.state.all[i])
           
         }else{
           if(arr[i] == null){
            // console.log("delete")
             arr = arr.filter(n => {return n != null})
           }
         }
  
         
       }
     }
     else{
       for(let i = 0; i < this.state.all.length; i++) {
            arr = arr.filter(a => {return a != e.target.id})
     }
       
       
         
     }
   
     //console.log(arr)
   
     this.setState({arr: arr})
     
  
     this.setQuestionsIds(arr)
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
  openModal($el) {
    $el.classList.add('is-active');
  }


  componentDidMount(){
     this.getStory()

    axios.get('https://kip-learning.herokuapp.com/api/questions', {
      headers: authHeader()
    }).then(r => {
      this.setState({all: r.data})
    }).catch(e => {
      console.log(e)
    })

  }

  getStory = () =>{
    axios.get('https://kip-learning.herokuapp.com/api/englishstory', {
      headers: authHeader()
    }).then(r => {
      this.setState({story: r.data})
    }).catch(e => {
      console.log(e)
    })
  }



  AllQuestions = (e) => {
    this.setState({
      // table: <AllQuestions/>,
      tableHeader: <AllHeader />,
      table: "all",
      tableName: "All Questions",
      type: "all",
      page: 1,
      arr: [],
      selected: [],
    })
    this.handlePaginationClick(1)
  }

  EnglishQuestions = (e) => {
    this.setState({
      // table: <EnglishQuestions/>,
      tableHeader: <EnglishHeader />,
      page: 1,
      tableName: "English",
      type: "english",
      arr: [],
      selected: [],
    }) 
    this.handlePaginationClick(1)
  }

  MathsQuestions = (e) => {
    this.setState({
      // table: <MathsQuestions/>,
      tableHeader: <MathsHeader />,
      page: 1,
      tableName: "Maths",
      type: "math",
      arr: [],
      selected: [],
    })
    this.handlePaginationClick(1)  
  }

  NonVerbalQuestions = (e) => {
    this.setState({
      // table: <NonVerbalQuestions/>,
      tableHeader: <NonVerbalHeader />,
      page: 1,
      tableName: "Non Verbal",
      type: "nonverbal",
      arr: [],
      selected: [],
    }) 
    this.handlePaginationClick(1)
  }

  VerbalQuestions = (e) => {
    this.setState({
      // table: <VerbalQuestions/>,
      tableHeader: <VerbalHeader />,
      page: 1,
      tableName: "Verbal",
      type: "verbal",
      arr: [],
      selected: [],
    }) 
    this.handlePaginationClick(1)
  }

  Story = (e) => {
    this.setState({
      // table: <Story/>,
      tableHeader: <StoryHeader />,
      page: 1,
      tableName: "Storys",
      type: "story",
      arr: [],
      selected: [],
    })
    this.handlePaginationClick(1)
  }


  
  mathResults = () => {
    let questions = []

    for (let i = 0; i < this.state.all.length; i++) {
      if (this.state.all[i].question_type === "math") {
        questions.push(this.state.all[i])
      }
    }
    return questions
  }

  englishResults = () => {
    let questions = []

    for (let i = 0; i < this.state.all.length; i++) {
      if (this.state.all[i].question_type === "english") {
        questions.push(this.state.all[i])
      }
    }
    return (questions)
  }
  
  verbalResults = () => {
    let questions = []

    for (let i = 0; i < this.state.all.length; i++) {
      if (this.state.all[i].question_type === "verbal_reasoning") {
        questions.push(this.state.all[i])
      }
    }
    return questions
  }

  nonverbalResults = () => {
    let questions = []

    for (let i = 0; i < this.state.all.length; i++) {
      if (this.state.all[i].question_type === "none_verbal_reasoning") {
        questions.push(this.state.all[i])
      }
    }
    return questions
  }

  allResults = () => {
    let questions = []

    for (let i = 0; i < this.state.all.length; i++) {
      if (this.state.all[i].question_type != "") {
        questions.push(this.state.all[i])
      }
    }
    //console.log(questions)
    return questions
  }

  storyResults = () => {

    let storys = []

    for (let i = 0; i < this.state.story.length; i++) {
      if (this.state.story[i].title != "") {
        storys.push(this.state.story[i])
      }
    }
    console.log(storys)
    console.log(this.state.story)
    return storys
  }

  openModal($el) {
    $el.classList.add('is-active');
  }
  

  handleSearch = (e) => {
    this.setState({
      search: e.target.value,
      page: 1
    })
  }

  filterSearch = (s) => {

    let length = 0;

  
    if(this.state.search == s.question_type){
      return (
          s
        )
    }

    if(this.state.search == ""){
      
      return (
          s
        )
    }
    if(this.state.search == s.question_id){
      console.log(s);
      return (
          s
        )
    }
    }
  
  

  render() {
    let pageButtons = "";
    (document.querySelectorAll('.js-modal-parent') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
      
      
      $trigger.addEventListener('click', () => {
        this.openModal($target);
      });
    });

    let results = !this.state.all? "Loading..." :this.state.all 
    
   
    switch (this.state.type) {
      case "english": results = this.englishResults(); break
      case "math": results = this.mathResults(); break;
      case "nonverbal": results = this.nonverbalResults(); break
      case "verbal":results = this.verbalResults();  break;
      case "story": results = this.storyResults(); break;
      default: results = this.allResults(); break;
    }

    //let resultLength = !results ? 'Loading...' :results.length

    if ((results.length > 0) && (this.state.search !== undefined)) {
      results = results.filter(this.filterSearch)
  }

  let searchLength = results.length;
    if(results.length > 0) {
      const pageSize = 10
      let pageMax = this.state.page * pageSize
      let pageMin = pageMax - pageSize
  
      pageButtons = (
          <PageButtons
            currentPage={this.state.page}
            pageSize={pageSize}
            resultsLength={results.length}
            handlePaginationClick={(i) => this.handlePaginationClick(i)}
          />
      )
      results = results.slice(pageMin, pageMax)
    }
  

    return (
     
      <div>
          <AddMaths></AddMaths>
          <AddEnglish results={this.state.story}></AddEnglish>
          <AddStory></AddStory>
          <AddVerbal></AddVerbal>
          <AddNonVerbal></AddNonVerbal>
          <EditQuestion/>
          
        <div className="users-table-options">
          <div style={{ textAlign: "start" }}>
          
          <div className="dropdown is-hoverable">
                    <div className="dropdown-trigger">
                        <button className="button is-normal is-radiusless has-text-centered" aria-haspopup="true" aria-controls="dropdown-menu">
                            <span>{this.state.tableName}</span>
                        
                        <span className="icon is-small">
                             <i className="fas fa-angle-down" aria-hidden="true"></i>
                         </span>
                        </button>
                    </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">  

                          <div className="dropdown-content">
                            <button style={{ padding: "0" }} className="button is-fullwitdth dropdown-item is-hoverable is-radiusless has-text-centered" onClick = {this.AllQuestions} value = {0}>All Questions</button>
                            <button style={{ padding: "0" }} className="button is-fullwitdth dropdown-item is-hoverable is-radiusless has-text-centered" onClick = {this.MathsQuestions} value = {1}>Maths</button>
                            <button style={{ padding: "0" }} className="button is-fullwitdth dropdown-item is-hoverable is-radiusless has-text-centered" onClick = {this.EnglishQuestions} value = {2}>English</button>
                            <button style={{ padding: "0" }} className="button is-fullwitdth dropdown-item is-hoverable is-radiusless has-text-centered" onClick = {this.NonVerbalQuestions} value = {3}>Non Verbal</button>
                            <button style={{ padding: "0" }} className="button is-fullwitdth dropdown-item is-hoverable is-radiusless has-text-centered" onClick = {this.VerbalQuestions} value = {4}>Verbal</button>
                            <button style={{ padding: "0" }} className="button is-fullwitdth dropdown-item is-hoverable is-radiusless has-text-centered" onClick = {this.Story} value = {5}>Story</button>
                          </div>
                        
                        </div>
                    </div>
               </div>

          </div>
          <p>{this.state.selected.length} Selected</p>
          <div className="field has-addons">
            <div className="control">
                <div className="dropdown is-hoverable">
                    <div className="dropdown-trigger">
                        <button className="button is-normal is-radiusless has-text-centered" aria-haspopup="true" aria-controls="dropdown-menu">
                            <span>Add</span>
                        </button>
                    </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">  

                        <div className="dropdown-content">  
                          <button style={{ padding: "0" }} className="button is-fullwitdth dropdown-item is-hoverable js-modal-parent is-radiusless has-text-centered" data-target = "maths" >Maths</button>
                          <button style={{ padding: "0"  }} className="button is-fullwitdth dropdown-item is-hoverable js-modal-parent is-radiusless has-text-centered" data-target = "english" >English</button>
                          <button style={{ padding: "0" }} className="button is-fullwitdth dropdown-item is-hoverable js-modal-parent is-radiusless has-text-centered" data-target = "nonverbal" >Non Verbal</button>
                          <button style={{ padding: "0" }} className="button is-fullwitdth dropdown-item is-hoverable js-modal-parent is-radiusless has-text-centered" data-target = "verbal" >Verbal</button>
                          <button style={{ padding: "0"  }} className="button is-fullwitdth dropdown-item is-hoverable js-modal-parent is-radiusless has-text-centered" data-target = "story" >Story</button>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className = "control content-table-button-container ">
            <p className="control">
              <button  className="button is-danger is-rounded" onClick={() => this.remove()} disabled={this.state.selected.length < 1}>Remove</button>
            </p>
            </div>
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
        <table className = "table is-fullwidth">
            {this.state.tableHeader}    
          <tbody>
            <QuestionBody 
             
              type={this.state.type}
              results={results}
              story={this.state.story}
              setQuestionsIds = {(arr) => this.setQuestionsIds(arr)}
              setCurr = {(curr) => this.setQuestionsIds(curr)}
              handleCurr ={this.handleCurr}
              remove = {this.removeOne}
              handleChange ={this.handleChange}
              handlePaginationClick={this.handlePaginationClick}
              currentPage={this.state.page}
            />
          </tbody>
        </table>
        <div className="users-table-footer">
            <p>Showing {results.length} of {searchLength} results</p>
            {pageButtons}
          </div>
      </div>
        
    )
  }
}

export default QuestionTable