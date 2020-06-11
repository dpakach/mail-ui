import React from 'react';
import searchButton from '../files/icon_search.svg'
import calenderIcon from '../files/icon_calender.svg'
import FilterContext from './filterContext'

class SearchBar extends React.Component {
  render() {
    let {filter, setFilter}  = this.context

    return (
      <div className="searchheader">
        <div className="searchbar">
            <input 
            class="searchbar__input"
            type="text"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value)
            }}
            ></input>
            <img class="searchbar__icon" src={calenderIcon}></img>
            <img class="searchbar__button" src={searchButton} alt="search" />
        </div>
        <span class="result" >Results: <span class="result__number">{this.props.number}</span> mail(s)</span>
      </div>
    );
  }
}

SearchBar.contextType = FilterContext

export default SearchBar;
