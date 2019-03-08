import React, { Component } from "react";
import "./App.css";
import SearchForm from "./components/searchForm/searchForm";

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1>POKEDEX!</h1>
        <SearchForm />
      </div>
    );
  }
}

export default App;
