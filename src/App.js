import React from 'react';
import './App.css';
import './main.css';

import SearchBar from './components/SearchBar'
import MailList from './components/MailList';
import Email from './components/Email';

import data from "./files/emails.json"

import FilterContext from './components/filterContext'

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
    console.log("setting sort", this.state.sortBy, this.state.sortType)
    switch(this.state.sortBy) {
      case "Date":
        return emails.sort((a, b) => {
          return this.state.sortBy === "Asc" ?
           Date.parse(a["Date"]) - Date.parse(b["Date"]) :
           Date.parse(b["Date"]) - Date.parse(a["Date"])
        })
      default:
        console.log("setting sort", this.state.sortBy, this.state.sortType)
        return emails.sort((a, b) => {
          let first, second
          console.log(a[this.state.sortBy], b[this.state.sortBy])

          if (this.state.sortBy === "Asc") {
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

  render() {
    const {filter, sortBy, sortType} = this.state
    const {setFilter, setSort} = this
    return (
      <div className="container">
        <FilterContext.Provider value={{filter, setFilter, sortBy, sortType, setSort}}>
          <SearchBar number={this.state.emails.length}/>
          <MailList setSort={this.setSort} emails={this.sortEmails(this.state.emails)}/>
        </FilterContext.Provider>
      </div>
    );
  }
}

export default App;
