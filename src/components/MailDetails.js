import React from 'react';

import MailDetail from "./MailDetail"

import data from '../files/emails.json'

class MailDetails extends React.Component {

  constructor(props) {
      super(props)
      console.log(this)
      this.state = {
        showFor: props.showFor
      }
  }

  static getDerivedStateFromProps(props, state) {
      return {showFor: props.showFor}
  }

  getDetails = () => {
      return  this.state.showFor.map(id => <MailDetail key={id} mail={data.find(element => element.id === id)} hide={this.props.hideDetail} />)
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