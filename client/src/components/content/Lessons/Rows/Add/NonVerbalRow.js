import React from "react"

class NonVerbalRow extends React.Component {

      importAll = (r) => {

            let images = {}
        
            r.keys().forEach((item, index) => {
        
                images[item.replace('./', '')] = r(item)
        
            })
        
            return images
        
        }



render() {
  let id = !this.props.result.non_verbal_reasoning_questions[0] ? 'Loading...' :this.props.result.non_verbal_reasoning_questions[0].question_id
  let filename = !this.props.result.non_verbal_reasoning_questions[0] ? 'Loading...' :this.props.result.non_verbal_reasoning_questions[0].filename
      const images = this.importAll(require.context("../../../../lessons/nonverbalreasoningimages", false, /\.(svg)$/))
      return ( 
            <tr key={!this.props.result.non_verbal_reasoning_questions[0] ? 'Loading...' :this.props.result.non_verbal_reasoning_questions[0].question_id}>
                  <td><input type= "checkbox" id = {id} onChange = {this.props.handleChange}/></td>
        <td><pre ><img style={{width: "400px",wordWrap: "break", whiteSpace: "pre-line"}} src={images[filename]} alt="Non-Verbal" /></pre></td>
        <td><pre >{!this.props.result.non_verbal_reasoning_questions[0] ? 'Loading...' :this.props.result.non_verbal_reasoning_questions[0].answer}</pre></td>

         </tr>
      )}}

export default NonVerbalRow