import React, { Component } from 'react';
import './SearchBar.css';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import { throttle } from '../../utils';

class SearchBar extends Component {
  state = {
    query: '',
    showSearchBar: this.props.showSearchBar
  };

  searchInputRef = React.createRef();

  handleSearchBtnClick = throttle(() => {
    const query = this.state.query.trim();

    if (query !== '') {
      return this.props.onSearchSubmit(query);
    }

    this.searchInputRef.current.focus();
    this.setState(state => ({ showSearchBar: !state.showSearchBar }));
  }, 200);

  handleKeyDown = e => {
    e.stopPropagation();

    if (e.keyCode === 13) {
      // Enter key to perform the search
      this.handleSearchBtnClick();
    }
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  render() {
    let searchInputClasses = 'search-input';

    if (this.state.showSearchBar) {
      searchInputClasses += ' active';
    }

    return (
      <div className="search-wrapper relative">
        <input
          ref={this.searchInputRef}
          className={searchInputClasses}
          type="search"
          placeholder="Search"
          autoFocus={this.state.showSearchBar}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <button
          type="button"
          className="search-button absolute right-0"
          onClick={this.handleSearchBtnClick}
        >
          <SearchIcon className="text-gray-600 h-4 w-4 transition-all duration-200 mx-auto fill-current" />
        </button>
      </div>
    );
  }
}

export default SearchBar;
