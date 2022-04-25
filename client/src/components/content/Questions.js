import React from "react"
import QuestionsTable from "../content/QuestionTable";
import "./Modals"
class Questions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      results: [],
      page: 1,
      search: ""
    }

   //this.handleSearch = this.handleSearch.bind(this)
  }
  
  openModal($el) {
    $el.classList.add('is-active');
  }

  Modal($el) {
    $el.classList.remove('is-active');
  }

  
  

  render() {



    (document.querySelectorAll('.js-modal-parent') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
     
  
      $trigger.addEventListener('click', () => {
        this.openModal($target);
      });
    });

    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head, .delete, .modal-card-foot, .button is-danger') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        this.closeModal($target);
      });
    });
    
    return (
        <>
        <QuestionsTable/>
        
        </>
    
    )
  }
}

export default Questions