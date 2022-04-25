import React from "react"
import axios from "axios";
import authHeader from "../../../services/auth-header";
import AddLessonBody from "./addLessonBody";

import EnglishHeader from "./Header/EnglishHeader"
import MathsHeader from "./Header/MathsHeader"
import NonVerbalHeader from "./Header/NonVerbalHeader"
import VerbalHeader from "./Header/VerbalHeader"

class EditContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        tableHeader:<MathsHeader/>,
        all: [],
        questions:[],
        arr:[],
        newResults:[],
        input: ""
    }
    
      
}

EnglishQuestions() {

   
  this.setState({
    // table: <EnglishQuestions/>,
    tableHeader: <EnglishHeader />,
  
  }) 
}

MathsQuestions (){


  this.setState({
    // table: <MathsQuestions/>,
    tableHeader: <MathsHeader />,

  })  
}

NonVerbalQuestions (){

  this.setState({
    // table: <NonVerbalQuestions/>,
    tableHeader: <NonVerbalHeader />,

  }) 
}

VerbalQuestions (){
  console.log(this.state.questions)
  
  this.setState({
    // table: <VerbalQuestions/>,
    tableHeader: <VerbalHeader />,

  })

}
handleInput = (e) => {
  this.setState({input: e.target.value})
  console.log(this.state.input)
}

setQuestionsIds = (arr) =>{

  this.setState({

    questions : arr
  })
}

handleUpdate = async (newInsert) => {
  let tempArray = this.state.newResults
  tempArray.push(newInsert)
  await this.setState({
    newResults: tempArray
  })
}

editLessonFunction = () =>{
  let title = this.state.input
    console.log(this.state.questions.length)
    if (this.state.input != ""){
      
      title = this.state.input
    
    }
    else{
    
      title = this.props.lesson.lesson_name
    }
    if(this.state.questions.length == 0){
        alert ("Please select a question")
        return

    }

    
    
    alert("Lesson Title:" + title + " Length: " + this.state.questions.length + " Questions: " + this.state.questions + " Type: " + this.props.lesson.lesson_type)

    axios.get("https://kip-learning.herokuapp.com/api/lessons/edit",
    {
      headers: authHeader(),
      params:{
        lesson_id: this.props.lesson.lesson_id,
        lesson_name: title,
        question_list: this.state.questions.toString(),
       

      }
    }).then(() => {
      alert ("Lesson Title:" + this.state.input + "Updated!")
      
      this.handleUpdate({
        lesson_id: this.props.lesson.lesson_id,
        lesson_name: title,
        question_list: this.state.questions,
    
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

   console.log(questions)

   return questions
  
 }

 englishResults = () => {

  
    
   let questions = []

   for (let i = 0; i < this.state.all.length; i++) {
     if (this.state.all[i].question_type === "english") {
       questions.push(this.state.all[i])
     }
   }
   console.log(questions)
   return (questions)
 }
 
 verbalResults = () => {
   let questions = []

   for (let i = 0; i < this.state.all.length; i++) {
     if (this.state.all[i].question_type === "verbal_reasoning") {
       questions.push(this.state.all[i])
     }
   }
   console.log(questions)
   return questions
 }

 nonverbalResults = () => {
   let questions = []

   for (let i = 0; i < this.state.all.length; i++) {
     if (this.state.all[i].question_type === "none_verbal_reasoning") {
       questions.push(this.state.all[i])
     }
   }
   console.log(questions)
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




       render() {
        this.state.results = this.state.all
        let results = this.state.results

        switch (this.props.lesson.lesson_type) {
          case "english":results = this.englishResults(); break
          case "math": results = this.mathResults(); break;
          case "non_verbal_reasoning": results = this.nonverbalResults(); break
          case "verbal_reasoning":results = this.verbalResults();  break;
          default: break;
      }

      
      console.log(results)


        return (
          <div>
           <div className="modal is-fullwidth" id ="editCurrLesson">
           <div className = "modal-background"></div>
           <div className= "modal-card is-fullwidth" id = "contentModal">
               <header className="modal-card-head  is-fullwidth">
                   <p className="modal-card-title">Edit Lesson</p>
                   <button className="delete" aria-label="close" onClick={() => { document.getElementById("editCurrLesson").classList.remove("is-active")}}></button>
               </header>
               <section className="modal-card-body  is-fullwidth">
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
                               <input id = "inputLesson" className = "input" onChange = {this.handleInput}  placeholder = {this.props.lesson.lesson_name}></input>
                           </td>
                           <td>
                               <input  id = "inputLesson" className = "input" onChange = {this.handleInput} placeholder = {this.props.lesson.lesson_type} disabled></input>
                           </td>
                               
                       </tr>
                       </tbody>
                       </table>
                       <table className = "table">
                           
                                   {this.state.tableHeader}   
                       <tbody>  
                      
                       <AddLessonBody
                           setQuestionsIds = {(arr) => this.setQuestionsIds(arr)}
                           type={this.props.lesson.lesson_type}
                           results={results}
                           handleChange={this.handleChange}/>
                       
                       </tbody>
                          
                       </table>
                   </div> 
               </section>
           <footer className="modal-card-foot">
           <button  className="button is-fullwitdth is-success js-modal-parent" data-target = "lesson" onClick={()=>{this.editLessonFunction()}}>Edit</button>
               <button className="button is-danger" onClick={() => { document.getElementById("editCurrLesson").classList.remove("is-active")}}>Cancel</button>
           </footer>
           </div>
           </div>
       </div>
        )
      }
    }

export default EditContent