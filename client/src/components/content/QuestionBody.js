import React from "react"
import MathRow from "./Table/Rows/MathsRow";
import EnglishRow from "./Table/Rows/EnglishRow";
import VerbalRow from "./Table/Rows/VerbalRow";
import NonVerbalRow from "./Table/Rows/NonVerbalRow";
import StoryRow from "./Table/Rows/StoryRow";
import AllRow from "./Table/Rows/AllRow"
import "./Modals"
import EditQuestion from "./EditQuestion";

class QuestionBody extends React.Component {

  
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



    getAll = () => {
        let questions = !this.props.results ? 'Loading...' : this.props.results.map((result, i) => {
          return (
        
                  
                  <AllRow 
                    key={i} 
                    result={result}
                    handleCurr ={this.props.handleCurr}
                    handleChange={this.props.handleChange}
                    isCheck={this.props.isCheck}
                    handleToggle={this.props.handleToggle}
                    
                  />
           
          )
      })
        return questions
      }

  getMath = () => {
    let questions = !this.props.results ? 'Loading...' : this.props.results.map((result, i) => {

    return (
          
              <MathRow 
                key={i} 
                result={result}
                handleChange={this.props.handleChange}
                handleToggle={this.props.handleToggle}
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
                story={this.props.story}
                  
                handleChange={this.props.handleChange}
                isCheck={this.props.isCheck}
                handleToggle={this.props.handleToggle}
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
                isCheck={this.props.isCheck}
                handleToggle={this.props.handleToggle}
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

  getStory = () => {
    let questions = !this.props.results ? 'Loading...' : this.props.results.map((result, i) => {
      return (
        
              <StoryRow
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
      case "all": questions = this.getAll(); break;
      case "english": questions = this.getEnglish(); break;
      case "math": questions = this.getMath(); break;
      case "nonverbal": questions = this.getNonVerbal(); break;
      case "verbal": questions = this.getVerbal(); break;
      case "story": questions = this.getStory(); break;
    }
  
    return (
      <>
        {questions !== "" ? questions : null}
      </>  )
    }
}

export default QuestionBody