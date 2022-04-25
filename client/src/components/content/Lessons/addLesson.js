import React from "react"
import axios from "axios";
import authHeader from "../../../services/auth-header";
import AddLessonBody from "./addLessonBody";

import EnglishHeader from "./Header/EnglishHeader"
import MathsHeader from "./Header/MathsHeader"
import NonVerbalHeader from "./Header/NonVerbalHeader"
import VerbalHeader from "./Header/VerbalHeader"

class AddLesson extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        tableHeader: <MathsHeader />,
        type: "math",
        all: [],
        questions:[],
        arr:[],
        newResults:[],
        input: ""
    }
    
      
}

handleInput = (e) => {
  this.setState({input: e.target.value})
}

setQuestionsIds = (arr) =>{

  this.setState({

    questions : arr
  })
}

handleCreate = async (newInsert) => {
  let tempArray = this.state.newResults
  tempArray.push(newInsert)
  await this.setState({
    newResults: tempArray
  })
}

addLessonFunction = () =>{
  
    console.log(this.state.questions.length)
    if (this.state.input.trim() === ""){
      alert ("Please enter a Lesson Title")
      return
    }
    if(this.state.questions.length == 0){
        alert ("Please select a question")
        return

    }
    
   
    console.log(this.state.type)
    axios.get("https://kip-learning.herokuapp.com/api/lessons/add",
    {
      headers: authHeader(),
      params:{
        lesson_id: this.props.length+1,
        lesson_name: this.state.input,
        question_list: this.state.questions.toString(),
        lesson_type: this.state.type,

      }
    }).then(() => {
      alert ("Lesson Title:" + this.state.input + "Added!")
      
      this.handleCreate({
        lesson_id: this.props.length+1,
        lesson_name: this.state.input,
        question_list: this.state.questions,
        lesson_type: this.state.type,
        updatedAt: new Date().toISOString(),
      })
      .catch(e => {
        alert ("Couldn't add Lesson!!!")
      })
    }
    )
}

handleChange = (e) => {
  // console.log(e.target.id)
   let arr = this.state.arr
   console.log(arr)
   if(e.target.checked === true) {
     for(let i = 0; i < this.state.results.length; i++) {
       
       if(e.target.id == this.state.results[i].question_id) {
         arr[i] = this.state.results[i].question_id
         console.log(arr);
       }else{
         if(arr[i] == null){
           console.log("delete")
           arr = arr.filter(n => {return n != null})
         }
       }

       
     }
   }
   else{
     for(let i = 0; i < this.state.results.length; i++) {
          arr = arr.filter(a => {return a != e.target.id})
   }
     
     
       
   }
 
   console.log(arr)
 
   this.setState({arr: arr})
   

   this.setQuestionsIds(arr)
 }


componentDidMount(){
   axios.get('https://kip-learning.herokuapp.com/api/questions', {
     headers: authHeader()
   }).then(r => {
     this.setState({all: r.data})
   }).catch(e => {
     console.log(e)
   })

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

 EnglishQuestions = (e) => {

   
    this.setState({
      // table: <EnglishQuestions/>,
      tableHeader: <EnglishHeader />,
    
    }) 
  }

  MathsQuestions = (e) => {
 
  
    this.setState({
      // table: <MathsQuestions/>,
      tableHeader: <MathsHeader />,
  
    })  
  }

  NonVerbalQuestions = (e) => {

    this.setState({
      // table: <NonVerbalQuestions/>,
      tableHeader: <NonVerbalHeader />,

    }) 
  }

  VerbalQuestions = (e) => {
    console.log(this.state.questions)
    
    this.setState({
      // table: <VerbalQuestions/>,
      tableHeader: <VerbalHeader />,

    })

  }

resetQuestions = async (e) => {

  
  await this.setState({
    questions:[],
    arr:[],
  })
  //console.log(this.state.questions) 
  //console.log(this.state.arr) 
}

handleOption = async (e) => {

  
    console.log(e.target.value)


    await this.setState({
        type: e.target.value,
        questions: [],
        arr: [],
      }) 

      switch (e.target.value) {
        case "english":this.EnglishQuestions(); break
        case "math": this.MathsQuestions(); break;
        case "nonverbal": this.NonVerbalQuestions(); break
        case "verbal":this.VerbalQuestions();  break;
        default: break;
    }
 }


       render() {
        this.state.results = this.state.all
        let results = this.state.results
        switch (this.state.type) {
            case "english":results = this.englishResults(); break
            case "math": results = this.mathResults(); break;
            case "nonverbal": results = this.nonverbalResults(); break
            case "verbal":results = this.verbalResults();  break;
            default: break;
        }
        

        return (
            <div>
                <div className="modal is-fullwidth" id ="lesson">
                <div className = "modal-background"></div>
                <div className= "modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">New Lesson</p>
                        <button className="delete" aria-label="close" onClick={() => { document.getElementById("lesson").classList.remove("is-active")}}></button>
                    </header>
                    <section className="modal-card-body">
                        <div className ="question-container">
                            <table className="table is-striped users-table is-fullwidth">
                                <thead className >
                                    <tr className="table-row-head">
                                        <th>Lesson name</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                            <tbody>
                             <tr>
                                <td>
                                    <input className = "input" onChange = {this.handleInput}></input>
                                </td>
                                <td>
                                    <div className = "select" onClick = {this.resetQuestions}>
                                         <select id = "type" onChange={this.handleOption} >
                                         <option value = "math" >Maths</option>
                                         <option value = "english" >English</option>
                                         <option value = "nonverbal" >Non Verbal</option>
                                         <option value = "verbal" >Verbal</option>
                                         </select>
                                         
                        
                                    </div>
                                </td>
                                    
                            </tr>
                            </tbody>
                            </table>
                            <table className="table is-striped users-table is-fullwidth">
                                        {this.state.tableHeader}   
                            <tbody>
                            <AddLessonBody
                
                                setQuestionsIds = {(arr) => this.setQuestionsIds(arr)}
                                type={this.state.type}
                                results={results}
                                handleChange={this.handleChange}
                                />
                            </tbody>
                            </table>
                        </div> 
                    </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick ={() =>{this.addLessonFunction()}}>Submit</button>
                    <button className="button is-danger" onClick={() => { document.getElementById("lesson").classList.remove("is-active")}}>Cancel</button>
                </footer>
                </div>
                </div>
            </div>
        )
      }
    }

export default AddLesson