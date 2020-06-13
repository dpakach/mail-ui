import React from 'react';

import './main.css';

import EmailListFilterSort from './components/EmailListFilterSort'
import MailDetails from './components/MailDetails';

// The main App Components
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      details: [1, 4],
      showDetails: false,
      showList: true
    }

    this.showDetail = this.showDetail.bind(this)
    this.hideDetail = this.hideDetail.bind(this)
    this.hideDetailsBar = this.hideDetailsBar.bind(this)
    this.showDetailsBar = this.showDetailsBar.bind(this)
  }

  showDetail(mailId) {
    if (!this.state.details.includes(mailId)) {
      this.setState({details: [...this.state.details, mailId]})
    }
  }

  hideDetail(mailId) {
    const details = this.state.details.filter(elem => elem !== mailId)
    if (details.length === 0) {
      this.hideDetailsBar()
    }
    this.setState({details})
  }

  hideDetailsBar() {
    this.setState({
      showDetails: false,
      showList: true
    })
  }

  showDetailsBar() {
    this.setState({
      showDetails: true,
      showList: false
    })
  }

  render() {
    return (
      <div className="container">
        <div className={`listpart ${this.state.showList ?"":"listpart--hidden"}`}>
          <EmailListFilterSort showDetail={this.showDetail} showDetails={this.showDetailsBar} showDetailsButton={this.state.details.length > 0} />
        </div>
        <div className={`detailpart ${ this.state.showDetails === false || this.state.details.length === 0 ? "detailpart--hidden" : ""}`}>
          <button className="btn hide-on-big" onClick={this.hideDetailsBar}>Go Back to List</button>
          <MailDetails showFor={this.state.details} hideDetail={this.hideDetail}/>
        </div>
      </div>
    );
  }
}

export default App;