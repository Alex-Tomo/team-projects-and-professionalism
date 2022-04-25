import React from "react"
import MathsTemplate1 from "./templates/maths/mathsTemplate1";
import MathsTemplate2 from "./templates/maths/mathsTemplate2";
import MathsTemplate3 from "./templates/maths/mathsTemplate3";
import MathsTemplate4 from "./templates/maths/mathsTemplate4";
import MathsTemplate5 from "./templates/maths/mathsTemplate5";
import MathsTemplate6 from "./templates/maths/mathsTemplate6";

import "../Modals"
class AddMaths extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      }

      
    }

    openModal($el) {
      $el.classList.add('is-active');
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
    return (
    <div>
        <MathsTemplate1/>
        <MathsTemplate2/>
        <MathsTemplate3/>
        <MathsTemplate4/>
        <MathsTemplate5/>
        <MathsTemplate6/>
      <div className="modal is-fullwidth" id ="maths">
      <div className = "modal-background"></div>
      <div className= "modal-card">
          <header className="modal-card-head">
                <p className="modal-card-title">Math Questions</p>
          <button className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <div className ="template-container">
                <button id = "template-button" className="js-modal-child button is-fullwidth" data-target = "MathsTemp1">454 + 297 = ?</button>
            </div>
            <div className ="template-container">
                <button id = "template-button" className="js-modal-child button is-fullwidth" data-target = "MathsTemp2">? + 297 = 751</button>
            </div>
            <div className ="template-container">
                <button id = "template-button" className="js-modal-child button is-fullwidth" data-target = "MathsTemp3">454 + ? = 751</button>
            </div>
            <div className ="template-container">
                <button id = "template-button" className="js-modal-child button is-fullwidth" data-target = "MathsTemp4">	Which Two Numbers..</button>
            </div>
            <div className ="template-container">
                <button id = "template-button" className="js-modal-child button is-fullwidth" data-target = "MathsTemp5">	Which is the _____ in the group</button>
            </div>
            <div className ="template-container">
                <button id = "template-button" className="js-modal-child button is-fullwidth" data-target = "MathsTemp6">	Fill in the missing numbers in the sequences below..</button>
            </div>
         </section>
          <footer className="modal-card-foot">
          <button className="button is-danger">Cancel</button>
        </footer>
        </div>
      </div>
      </div>
    )
  }
}

export default AddMaths