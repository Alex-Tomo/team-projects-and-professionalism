import React from "react"
import LessonsTable from "../Lessons/LessonsTable"
import "../Modals"
class Lessons extends React.Component {
  constructor(props) {
    super(props)


  }
  
  openModal($el) {
    $el.classList.add('is-active');
  }

  render() {

    (document.querySelectorAll('.js-modal-parent') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
    
  
      $trigger.addEventListener('click', () => {
        this.openModal($target);
      });
    });

    return (
        <>
        <LessonsTable/>
        
        </>
    
    )
  }
}

export default Lessons