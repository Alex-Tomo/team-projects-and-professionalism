import React from "react"
import MathRow from "./Rows/Add/MathsRow"
import EnglishRow from "./Rows/Add/EnglishRow"
import NonVerbalRow from "./Rows/Add/NonVerbalRow"
import VerbalRow from "./Rows/Add/VerbalRow"


class AddLessonBody extends React.Component {

  constructor(props){
    super(props)
    {
      this.state={
        isCheck: '',
        arr: [],
      }

    }
  }

  setQuestions =  async() =>{

    await this.setState({
  
        arr: []
    })
  }

  

  getMath = () => {
    let questions = !this.props.results ? 'Loading...' : this.props.results.map((result, i) => {

     return (
          
              <MathRow 
                key={i} 
                result={result}
                checked={this.isChecked}
                handleChange={this.props.handleChange}
              />
        
      )
  })
    return questions
  }

  getEnglish = () => {
    
    let questions = !this.props.results ? 'Loading...' : this.props.results.map((result, i) => {
      return (
           
              <EnglishRow 
                key={i} 
                result={result}
                handleChange={this.props.handleChange}
                  
        
              />
           
      )
  })
    return questions
  }

  getVerbal = () => {
 
    let questions = !this.props.results ? 'Loading...' : this.props.results.map((result, i) => {
      return (
           
              <VerbalRow 
                key={i} 
                result={result}
                handleChange={this.props.handleChange}  
              
              />
           
      )
  })
    return questions
  }

  getNonVerbal = () => {
  
    let questions = !this.props.results ? 'Loading...' : this.props.results.map((result, i) => {
      return (
           
              <NonVerbalRow 
                key={i} 
                result={result}
                  
                handleChange={this.props.handleChange}
                isCheck={this.props.isCheck}
                handleToggle={this.props.handleToggle}
              />
           
      )
  })
    return questions
  }

  

  render() {
    let questions = ""
    
    switch (this.props.type) {
      case "english": questions = this.getEnglish(); break;
      case "math": questions = this.getMath(); break;
      case "nonverbal": questions = this.getNonVerbal(); break;
      case "verbal": questions = this.getVerbal(); break;
      case "non_verbal_reasoning": questions = this.getNonVerbal(); break;
      case "verbal_reasoning": questions = this.getVerbal(); break;
      case "story": questions = this.getStory(); break;
    }
  
    return (
       <>
        {questions !== "" ? questions : null}
       </>
    )
    }
}

export default AddLessonBody