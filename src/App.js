import React from 'react';
import './App.css';
import './main.css';

import SearchBar from './components/SearchBar'
import MailList from './components/MailList';
import Email from './components/Email';

import data from "./files/emails.json"

import FilterContext from './components/filterContext'
import appLogo from "./files/logo.png"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: "",
      emails: [],
      sortBy: "Date",
      sortType: "Asc"
    }
    this.setFilter = this.setFilter.bind(this)
    this.setSort = this.setSort.bind(this)
  }

  setSort(sortBy, sortType) {
    this.setState({
      sortBy,
      sortType
    })
  }

  getEmails() {
    return data
  }

  setEmails() {
    this.setState({
      emails: this.filterEmails()
    })
  }

  sortEmails(emails) {
    switch(this.state.sortBy) {
      case "Date":
        return emails.sort((a, b) => {
          return this.state.sortType === "Asc" ?
           Date.parse(a["Date"]) - Date.parse(b["Date"]) :
           Date.parse(b["Date"]) - Date.parse(a["Date"])
        })
      default:
        return emails.sort((a, b) => {
          let first, second

          if (this.state.sortType === "Asc") {
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
  }

  componentDidMount() {
    this.setEmails(this.getEmails())
  }

  getEmailList() {
    return this.state.emails.map(email => {
      return <Email email={email}/>  
    });
  }

  getFilterDateStart() {
    const parts = this.state.filter.split('-')
    if (parts.length !== 2) {
      return false
    }
    return new Date(parts[0])
  }

  getFilterDateEnd() {
    const parts = this.state.filter.split('-')
    if (parts.length !== 2) {
      return false
    }
    return new Date(parts[1])
  }

  filterEmails() {
    const filterDateStart = this.getFilterDateStart()
    const filterDateEnd = this.getFilterDateEnd()
    if (filterDateEnd && filterDateStart) {
      if (isNaN(filterDateStart) || isNaN(filterDateEnd)) {
        return this.getEmails()
      }
      return this.getEmails().filter(email => {
        const date = new Date(email["Date"])
        return filterDateStart < date && date < filterDateEnd
      })
    }
    return this.getEmails()
  }

  async setFilter(filter) {
    await this.setState({
      filter
    })
    this.setEmails()
  } 

  getMailListComponent() {
    const emailsCount = this.state.emails.length
    if (emailsCount === 0) {
      return <div className="appLogo"><img src={appLogo} alt="Email Archiver"/></div>
    } else {
      return <MailList sortBy={this.state.sortBy} setSort={this.setSort} emails={this.sortEmails(this.state.emails)}/>
    }
  }

  render() {
    const {filter, sortBy, sortType} = this.state
    const {setFilter, setSort} = this
    const emailsCount = this.state.emails.length
    return (
      <div className="container">
        <FilterContext.Provider value={{filter, setFilter, sortBy, sortType, setSort}}>
          <SearchBar number={emailsCount}/>
          {this.getMailListComponent()}
        </FilterContext.Provider>
      </div>
    );
  }
}

export default App;
