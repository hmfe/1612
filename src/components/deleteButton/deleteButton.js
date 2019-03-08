// Unecessary use of component but I had bigger things in mind which didn't fit the timeframe.

import React from "react";
import "./deleteButton.css";

class DeleteButton extends React.Component {
  render() {
    return (
      <button className='button-delete' onClick={this.props.deleteHistory}>
        Clear search history
      </button>
    );
  }
}

export default DeleteButton;
