// Would like to break it out into more components.
// Thought of using the url from the API response as key when deleting single object but
// that would remove multiple searches on same character.

import React from "react";
import moment from "moment";
import DeleteButton from "../deleteButton/deleteButton";
import "./searchForm.css";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchHistory: [],
      activeSearch: [],
      inputValue: ""
    };
    this.logChange = this.logChange.bind(this);
    this.deleteHistory = this.deleteHistory.bind(this);
  }

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20")
      .then(res => {
        return res.json();
      })
      .then(({ results: activeSearch }) => this.setState({ activeSearch }));
  };

  inputValue = "";

  addPokemon = e => {
    e.preventDefault();
    const name = this.inputValue;
    const key = moment().format("DD hh:mm:ss");
    const timestamp = moment().format("YYYY-MM-DD, hh:mm a");

    this.setState(prevState => ({
      searchHistory: [{ name, timestamp, key }, ...prevState.searchHistory]
    }));
  };

  logChange(e) {
    e.preventDefault();
    this.inputValue = e.target.value;
  }

  deleteSingleHistory = key => {
    const filteredItems = this.state.searchHistory.filter(history => {
      return history.key !== key;
    });
    this.setState({
      searchHistory: filteredItems
    });
  };

  deleteHistory = () => {
    this.setState({
      searchHistory: []
    });
  };

  render() {
    let activeSearch = this.state.activeSearch;
    let searchHistory = this.state.searchHistory;
    return (
      <div>
        <form>
          <input
            type='text'
            placeholder='Add'
            name='pokesearch'
            list='pokesearch'
            value={this.activeSearch}
            onChange={this.logChange}
          />
          <button className='button-add' onClick={this.addPokemon}>
            Search
          </button>
          <datalist id='pokesearch'>
            {activeSearch.map(search => (
              <option key={search.url} value={search.name} />
            ))}
          </datalist>
        </form>

        <div className='history-container'>
          <span>Search history</span>
          <div className='history-container-list'>
            {searchHistory.map(history => (
              <p key={history.url}>
                <span>{history.name}</span>
                <span onClick={() => this.deleteSingleHistory(history.key)}>
                  {history.timestamp}
                </span>
              </p>
            ))}
          </div>
        </div>
        <DeleteButton deleteHistory={this.deleteHistory} />
      </div>
    );
  }
}

export default SearchForm;
