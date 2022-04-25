import React from "react"
import axios from "axios";
import authHeader from "../../../../../services/auth-header";
class AddStory extends React.Component {
  constructor(props) {
    super(props);

    this.state ={

        title: "",
        story: "",
        newResults:[],
    }
    
      
}



handleCreate = async (newInsert) => {
  let tempArray = this.state.newResults
  tempArray.push(newInsert)
  await this.setState({
    newResults: tempArray
  })
}
  handleTitle= (e) => {
    this.setState({title: e.target.value})
  }
  handleStory = (e) => {
    this.setState({story: e.target.value})
  }

  addStory= () =>{
  
    if (this.state.title.trim() === ""){
      alert ("Please enter a Title")
      return
    }
    if(this.state.story.trim() == ""){
        alert ("Please enter a Story")
        return

    }
    console.log("Title:" + this.state.title + " Story: " + this.state.story)

    axios.get("https://kip-learning.herokuapp.com/api/englishstory/add",
    {
      headers: authHeader(),
      params:{
        title: this.state.title,
        story: this.state.story,

      }
    }).then(() => {
      
        alert("Title:" + this.state.title + " Story: " + this.state.story + "Added!")
      
      this.handleCreate({
        title: this.state.title,
        story: this.state.story,
        updatedAt: new Date().toISOString(),
      })
      .catch(e => {
        alert ("Couldn't add Lesson!!!")
      })
    }
    )
}

       render() {
        
        return (
            <div>
                <div className="modal" id ="story">
                <div className = "modal-background"></div>
                <div className= "modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">New Question</p>
                        <button className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <div className ="question-container">
                            <table className="table is-striped users-table">
                                <thead>
                                    <tr className="table-row-head">
                                        <th>Title</th>
                                
                                    </tr>
                                </thead>
                            <tbody>
                             <tr>
                                <td>
                                    <input className = "input"onChange={this.handleTitle} ></input>
                                </td>
                            </tr>
                            </tbody>
                                <thead>
                                    <tr className="table-row-head">
                                    
                                        <th>Context</th>
                                    </tr>
                                </thead>
                            <tbody>
                             <tr>
                                <td>
                                <textarea id = "inputarea" className = "input" onChange={this.handleStory} ></textarea>
                                </td>
                            </tr>
                            </tbody>
                            </table>
                        </div> 
                    </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={this.addStory}>Submit</button>
                    <button className="button is-danger">Cancel</button>
                </footer>
                </div>
                </div>
            </div>
        )
      }
    }

export default AddStory