import React from 'react';

import MailDetail from "./MailDetail"

import data from '../files/emails.json'

class MailDetails extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        showFor: props.showFor
      }
  }

  static getDerivedStateFromProps(props, state) {
      return {showFor: props.showFor}
  }

  componentDidUpdate() {
    var element = document.querySelector('.detailpart');
    element.scrollTop = element.scrollHeight;
  }

  // Get the email object from given id
  // Currently just reads from a json file
  getEmail(id) {
    return data.find(element => element.id === id)
  }

  getDetails = () => {
      return  this.state.showFor.map(id => <MailDetail key={id} mail={this.getEmail(id)} hide={this.props.hideDetail} />)
  }

  render() {
      return (
          <div className="maildetails">
            {this.getDetails()}
          </div>
      )
  }
}

export default MailDetails