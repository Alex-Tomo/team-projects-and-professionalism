import React from "react"

import axios from "axios"
import authHeader from "../../../services/auth-header";
import "../Modals"
import EnglishTemplate from "./templates/english/englishTemplate";

class AddEnglish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isCheckAll: false,
        isCheck: [],
        numSelected: 0,
        story: this.props.results,
        current: "Mi Nuong’s father was an influential Lord. He ruled all of the lands of the Red River and his palace stood tall and majestic on its broad, sloping banks. Yet, Mi Nuong was forlorn and melancholy. Her father kept her locked away at the top of the palace’s tallest tower in order to keep her out of harm’s way. Mi Nuong felt trapped; the only company she had was her maid and her daily routine was always 5    the same. Everyday, she would sit by her window embroidering and look out of her window, gazing sorrowfully down at the waters rushing past far below. Often, she dreamed of being carried away in the fast flowing rapids to distant lands.One morning, Mi Nuong heard music floating through her open window. She hurried over to see where the sound was coming from. There, on the river below, was a little golden fishing boat. Mi Nuong 10  heard the music rise up from the boat, and caught snatches of a song: “My love is like a blossom in the breeze. My love is like a moonbeam on the waves. The music was captivating, drawing Mi Nuong like a flickering candle flame draws the unwary moth. The voice was clear and sweet and Mi Nuong leaned out as far out as she could to try to catch sight of the singer. As the boat bobbed past, she glimpsed the tiny figure of a man standing on the prow with a 15  net. A sudden glimmer of hope lit up in her heart and she felt as if she was floating on air. Perhaps this man had come to release her from the tower. Perhaps he was a Mandarin’s son in disguise; the man she was destined to marry...",
        id: "",
        
    }


  }

  openModal($el) {
    $el.classList.add('is-active');
  }

  closeModal($el) {
    $el.classList.remove('is-active');
  }
  componentDidMount(){
    //this.getStory()
    //this.currStory()
  } 

handleChange = (e) =>{

    let storyLength = this.props.results.length
//console.log(storyLength)
    for(let i = 0; i < storyLength; i++){
     //   console.log(this.props.results[i])
    if (this.props.results[i].story === e.target.value){

    this.setState({
        current: this.props.results[i].story,
        id: this.props.results[i].story_id,
      })
      //console.log(this.state.id)
    }
    }
   
}





    render() {
        (document.querySelectorAll('.js-modal-parent') || []).forEach(($trigger) => {
            const modal = $trigger.dataset.target;
            const $target = document.getElementById(modal);
            //console.log($target);
        
            $trigger.addEventListener('click', () => {
              this.openModal($target);
            });
          });

      
 

      
    let handleStorys = !this.props.results ? 'Loading...' :this.props.results.map(({story_id, title, story,}) => {
      
        
        if (title != "") {
            return(
                <option value = {story}>{title} </option>)
            }
      
            
    })

        
    
        return (
           
            <div>
                 <EnglishTemplate id = {this.state.id}/>
                <div className="modal is-fullwidth" id ="english">
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
                                        <th>Select a Story</th>
                                        
                                    </tr>
                                </thead>
                            <tbody>
                            <><tr>
                                <td>
                                    <div>
                                        <div className="select">
                                            <select id = "storys" onChange = {this.handleChange} >
                                                {handleStorys}
                                            </select>
                                        </div>
                                    </div>
                                </td>
                                </tr>
                            <tr>
                            <td>
                                <textarea   id = "inputarea" className = "textarea is-info"  style= {{color: "black",opacity: "1"}}placeholder = {this.state.current} disabled>
                                </textarea>
                            </td>
                            </tr></>
                            </tbody>
                            </table>
                        </div> 
                    </section>
                <footer className="modal-card-foot">
                    <button id = "template-button" className="js-modal-child button is-success" data-target = "englishTemplate" onClick = {"this.state.story ? 'Loading...' :this.state.story[this.state.id].story}"}>	Next</button>
                    <button className="button is-danger" data-target = "english" onClick={this.closeModal}>Cancel</button>
                </footer>
                </div>
                </div>
            </div>
        )
      }
    }

export default AddEnglish