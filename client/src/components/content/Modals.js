document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
    
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a parent modal
    (document.querySelectorAll('.js-modal-parent') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
      //console.log($target);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });

    // Add a click event on buttons to open a child modal & close parent modal
    (document.querySelectorAll('.js-modal-child') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
      const $parent = document.getElementById("maths");
      //console.log($target);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
        closeModal($parent);
      });
    });

    (document.querySelectorAll('.child-button') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
      const $parent = document.getElementById("maths");
      
  
      $trigger.addEventListener('click', () => {
        openModal($parent);
        closeModal($target);
        

        
      });
    });

    //Open All Questions Modal
    (document.querySelectorAll('.js-modal-all') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
      const $maths = document.getElementById("MathsQuestions");
      const $eng = document.getElementById("EnglishQuestions");
      const $nonverbal = document.getElementById("NonVerbalQuestions");
      const $verbal = document.getElementById("VerbalQuestions");
      const $story = document.getElementById("Story");
      //console.log($target);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
        closeModal($maths);
        closeModal($eng);
        closeModal($nonverbal);
        closeModal($verbal);
        closeModal($story);
      });
    });

    (document.querySelectorAll('.js-modal-maths') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
      const $all = document.getElementById("AllQuestions");
      const $eng = document.getElementById("EnglishQuestions");
      const $nonverbal = document.getElementById("NonVerbalQuestions");
      const $verbal = document.getElementById("VerbalQuestions");
      const $story = document.getElementById("Story");
      //console.log($target);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
        closeModal($all);
        closeModal($eng);
        closeModal($nonverbal);
        closeModal($verbal);
        closeModal($story);
      });
    });

    (document.querySelectorAll('.js-modal-english') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
      const $maths = document.getElementById("MathsQuestions");
      const $all = document.getElementById("AllQuestions");
      const $nonverbal = document.getElementById("NonVerbalQuestions");
      const $verbal = document.getElementById("VerbalQuestions");
      const $story = document.getElementById("Story");
      //console.log($target);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
        closeModal($maths);
        closeModal($all);
        closeModal($nonverbal);
        closeModal($verbal);
        closeModal($story);
      });
    });

    (document.querySelectorAll('.js-modal-nonverbal') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
      const $maths = document.getElementById("MathsQuestions");
      const $eng = document.getElementById("EnglishQuestions");
      const $all = document.getElementById("AllQuestions");
      const $verbal = document.getElementById("VerbalQuestions");
      const $story = document.getElementById("Story");
      //console.log($target);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
        closeModal($maths);
        closeModal($eng);
        closeModal($all);
        closeModal($verbal);
        closeModal($story);
      });
    });
    (document.querySelectorAll('.js-modal-verbal') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
      const $maths = document.getElementById("MathsQuestions");
      const $eng = document.getElementById("EnglishQuestions");
      const $nonverbal = document.getElementById("NonVerbalQuestions");
      const $all = document.getElementById("AllQuestions");
      const $story = document.getElementById("Story");
      //console.log($target);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
        closeModal($maths);
        closeModal($eng);
        closeModal($nonverbal);
        closeModal($all);
        closeModal($story);
      });
    });

    (document.querySelectorAll('.js-modal-story') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
      const $maths = document.getElementById("MathsQuestions");
      const $english = document.getElementById("EnglishQuestions");
      const $nonverbal = document.getElementById("NonVerbalQuestions");
      const $verbal = document.getElementById("VerbalQuestions");
      const $all = document.getElementById("AllQuestions");
      console.log($target);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
        closeModal($maths);
        closeModal($english);
        closeModal($nonverbal);
        closeModal($verbal);
        closeModal($all);
      });
    });
    
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head, .delete, .modal-card-foot, .button is-danger') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  });