import React from "react"
import axios from "axios";
import authHeader from "../../../services/auth-header";
import EnglishHeader from "./Header/EnglishHeader"
import MathsHeader from "./Header/MathsHeader"
import NonVerbalHeader from "./Header/NonVerbalHeader"
import VerbalHeader from "./Header/VerbalHeader"
import EditContent from "./editContent";
import EditLessonBody from "./editLessonBody";
class EditLesson extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        tableHeader: <MathsHeader />,
        type: this.props.lesson.lesson_type,
        all: [],
        questionsSplit:[],
        questions:[],
        arr:[],
        input: "",
        list: []
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


 mathResults = () => {
   let questions = []

  for (let i = 0; i < this.state.all.length; i++) {
    if (this.state.all[i].question_type === "math") {
      for (let j = 0; j < this.state.list.length; j++) {
        if (this.state.all[i].question_id === this.state.list[j]){
            console.log(this.state.all[i])
            questions.push(this.state.all[i])
        }
      }
    }
  }
  
  
   return (questions)
 }

 englishResults = () => {
    
   let questions = []

   for (let i = 0; i < this.state.all.length; i++) {
    if (this.state.all[i].question_type === "english") {
      for (let j = 0; j < this.state.list.length; j++) {
        if (this.state.all[i].question_id === this.state.list[j]){
            console.log(this.state.all[i])
            questions.push(this.state.all[i])
        }
      }
    }
  }
   return (questions)
 }
 
 verbalResults = () => {
   let questions = []

   for (let i = 0; i < this.state.all.length; i++) {
     if (this.state.all[i].question_type === "verbal_reasoning") {
      for (let j = 0; j < this.state.list.length; j++) {
        if (this.state.all[i].question_id === this.state.list[j]){
            console.log(this.state.all[i])
            questions.push(this.state.all[i])
        }
      }
     }
   }
   return questions
 }

 nonverbalResults = () => {
   let questions = []

   for (let i = 0; i < this.state.all.length; i++) {
     if (this.state.all[i].question_type === "none_verbal_reasoning") {
      for (let j = 0; j < this.state.list.length; j++) {
        if (this.state.all[i].question_id === this.state.list[j]){
            console.log(this.state.all[i])
            questions.push(this.state.all[i])
        }
      }
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

      switch (this.props.lesson.lesson_type) {
        case "english":this.EnglishQuestions(); break
        case "math": this.MathsQuestions(); break;
        case "non_verbal_reasoning": this.NonVerbalQuestions(); break
        case "verbal_reasoning":this.VerbalQuestions();  break;
        default: break;
    }
 }

 openEdit(){

  document.getElementById("editCurrLesson").classList.add("is-active")
  document.getElementById("editLesson").classList.remove("is-active")

 }

       render() {

         
        let tempArr = []
        let questionsSplit = !this.props.lesson.question_list? "Loading..." :this.props.lesson.question_list.split(',');
        for ( let i = 0; i < questionsSplit.length ; i++) {
                //console.log(list[i])
                tempArr[i] = Number.parseInt(questionsSplit[i],10)
                
                //console.log(tempArr[i])
                }
        this.state.list = tempArr
        console.log(tempArr)
        //console.log(this.props.lesson.lesson_type)
            

        this.state.results = this.state.all
        let results = this.state.results
        switch (this.props.lesson.lesson_type) {
            case "english":results = this.englishResults(); break
            case "math": results = this.mathResults(); break;
            case "non_verbal_reasoning": results = this.nonverbalResults(); break
            case "verbal_reasoning":results = this.verbalResults();  break;
            default: break;
        }
        
       


        return (
           
            <div>
               <EditContent lesson={this.props.lesson}/>
                <div className="modal is-fullwidth" id ="editLesson">
                <div className = "modal-background"></div>
                <div className= "modal-card is-fullwidth" id = "contentModal">
                    <header className="modal-card-head  is-fullwidth">
                        <p className="modal-card-title">View Lesson</p>
                        <button className="delete" aria-label="close" onClick={() => { document.getElementById("editLesson").classList.remove("is-active")}}></button>
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
                                    <input id = "inputLesson" className = "input" onChange = {this.handleInput} style ={{fontWeight: "400"}} placeholder = {this.props.lesson.lesson_name} disabled></input>
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
                           
                            <EditLessonBody
                                setQuestionsIds = {(arr) => this.setQuestionsIds(arr)}
                                type={this.props.lesson.lesson_type}
                                results={results}
                                handleChange={this.handleChange}/>
                            
                            </tbody>
                               
                            </table>
                        </div> 
                    </section>
                <footer className="modal-card-foot">
                <button  className="button is-fullwitdth is-success js-modal-parent" data-target = "editCurrLesson" onClick={() => {this.openEdit()}}>Edit</button>
                    <button className="button is-danger" onClick={() => { document.getElementById("editLesson").classList.remove("is-active")}}>Cancel</button>
                </footer>
                </div>
                </div>
            </div>
        )
      }
    }

export default EditLesson