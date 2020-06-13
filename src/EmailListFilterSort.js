import React from 'react';
import MailList from './components/MailList';
import SearchBar from './components/SearchBar'

import data from "./files/emails.json"

import FilterContext from './components/filterContext'
import appLogo from "./files/logo.png"

import {SORT_TYPES, FIELDS} from "./utils/consts"

/**
 * Email List component with filter and sort
 * 
 * This component is responsible for fetching the emails data and 
 * managing the state of the emails table like sort and filter etc
 */
class EmailListFilterSort extends React.Component {

  // Initialize the component with initial state values
  constructor(props) {
    super(props)
    this.state = {
      filter: "",
      emails: [],
      sortBy: FIELDS.Date,
      sortType: SORT_TYPES.Descending
    }
    this.setFilter = this.setFilter.bind(this)
    this.setSort = this.setSort.bind(this)
  }

  // Set the Sort type
  setSort(sortBy, sortType) {
    this.setState({
      sortBy,
      sortType
    })
  }

  // Get the list of emails
  // Currently just reads from json file
  getEmails() {
    return data
  }

  // Set the emails in state
  setEmails() {
    this.setState({
      emails: this.filterEmails()
    })
  }

  // Sort the emails based on method specified in the state
  sortEmails(emails) {
    // if sortby is date sort by date
    if (this.state.sortBy === FIELDS.Date) {
      return emails.sort((a, b) => {
        return this.state.sortType === SORT_TYPES.Ascending ?
          Date.parse(a[FIELDS.Date]) - Date.parse(b[FIELDS.Date]) :
          Date.parse(b[FIELDS.Date]) - Date.parse(a[FIELDS.Date])
      })
    }
    // sort alphebatically
    return emails.sort((a, b) => {
      let first, second

      if (this.state.sortType === SORT_TYPES.Ascending) {
        first = a
        second = b
      } else {
        first = b
        second = a
      }
      if (first[this.state.sortBy] < second[this.state.sortBy]) return -1;
      else if (first[this.state.sortBy] > second[this.state.sortBy]) return 1;
      else return 0
    })
  }

  // Set the emails in state when the component mounts
  componentDidMount() {
    this.setEmails(this.getEmails())
  }

  // Get the start date from the filter sting
  getFilterDateStart() {
    const parts = this.state.filter.split('-')
    if (parts.length !== 2) {
      return false
    }
    return new Date(parts[0])
  }

  // Get the end date from the filter sting
  getFilterDateEnd() {
    const parts = this.state.filter.split('-')
    if (parts.length !== 2) {
      return false
    }
    return new Date(parts[1])
  }

  // Filter the emails based on the filter string
  filterEmails() {
    const filterDateStart = this.getFilterDateStart()
    const filterDateEnd = this.getFilterDateEnd()
    if (filterDateEnd && filterDateStart) {
      if (isNaN(filterDateStart) || isNaN(filterDateEnd)) {
        return this.getEmails()
      }
      return this.getEmails().filter(email => {
        const date = new Date(email[FIELDS.Date])
        return filterDateStart < date && date < filterDateEnd
      })
    }
    return this.getEmails()
  }

  // Set the filter string in the state
  async setFilter(filter) {
    await this.setState({
      filter
    })
    this.setEmails()
  } 

  // Get the MailList component or the logo if there are no emails
  getMailListComponent() {
    const emailsCount = this.state.emails.length
    if (emailsCount === 0) {
      return <div className="appLogo"><img src={appLogo} alt="Email Archiver"/></div>
    } else {
      return <MailList sortBy={this.state.sortBy} setSort={this.setSort} emails={this.sortEmails(this.state.emails)}/>
    }
  }

  // render the component
  render() {
    const {filter, sortBy, sortType} = this.state
    const {setFilter, setSort} = this
    const emailsCount = this.state.emails.length
    console.log(setFilter)
    return (
      <FilterContext.Provider value={{filter, setFilter, sortBy, sortType, setSort, emailsCount}}>
        <SearchBar/>
        {this.getMailListComponent()}
      </FilterContext.Provider>
    );
  }
}

export default EmailListFilterSort;
