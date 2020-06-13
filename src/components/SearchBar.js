import React from 'react';
import searchButton from '../files/icon_search.svg'
import calenderIcon from '../files/icon_calender.svg'
import FilterContext from './filterContext'

// SearchBar includes the input field for filtering the emails based on date
class SearchBar extends React.Component {
  render() {
    return (
      <FilterContext.Consumer>
        {({filter, setFilter, emailsCount}) => {
          return (
            <>
              <div className="searchbar">
                  <input 
                  className="searchbar__input"
                  type="text"
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value)
                  }}
                  ></input>
                  <img className="searchbar__icon" src={calenderIcon} alt="select date"></img>
                  <img className="searchbar__button" src={searchButton} alt="search" />
              </div>
              <span className="result" >Results: <span className="result__number">{emailsCount}</span> mail(s)</span>
            </>
          )
        }}
      </FilterContext.Consumer>
    );
  }
}

// Use The filterContext for search related data
SearchBar.contextType = FilterContext

// Export the component
export default SearchBar;
