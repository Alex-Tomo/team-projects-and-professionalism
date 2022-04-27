import React from "react"

/**
 * Display the page buttons and currently active button
 * Also enables and disables the next and prev buttons
 * as needed.
 *
 * @author Alex Thompson, W19007452
 */

class PageButtons extends React.Component {
  render() {
    let buttons = ""

    let arr = new Array(Math.ceil(this.props.resultsLength / this.props.pageSize))
    for (let i = 1; i <= Math.ceil(this.props.resultsLength / this.props.pageSize); i++) {
      arr[i-1] = i
    }

    let button = arr.map((i) => {
      if (i === 1) {
        return (<li key={i}>
          <button
              id={`page-button-${i}`}
              className="pagination-link button is-current is-rounded page-button"
              aria-label={"Goto page " + i}
              onClick={() => {
                this.props.handlePaginationClick(i)
              }}>{i}
          </button>
        </li>)
      }
      return (<li key={i}>
        <button
            id={`page-button-${i}`}
            className="pagination-link button is-rounded page-button"
            aria-label={"Goto page " + i}
            onClick={() => {
              this.props.handlePaginationClick(i)
            }}>{i}
        </button>
      </li>)
    })

    buttons = (
        <div
          className="pagination is-centered"
          role="navigation"
          aria-label="pagination"
        >
          <button
            className="pagination-previous button is-rounded page-button"
            onClick={() => {
              this.props.handlePaginationClick(this.props.currentPage - 1)
            }}
            disabled={this.props.currentPage <= 1}>&lt;
          </button>


          <button
            className="pagination-next button is-rounded page-button"
            onClick={() => {
              this.props.handlePaginationClick(this.props.currentPage + 1)
            }}
            disabled={this.props.currentPage >= Math.ceil(this.props.resultsLength / this.props.pageSize)}>&gt;
          </button>
          <ul
            id="pagination-list-id"
            className="pagination-list"
          >
            {button}
          </ul>

        </div>
    )

    return (
        <div>
          {buttons}
        </div>
    )
  }
}

export default PageButtons