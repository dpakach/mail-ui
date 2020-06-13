import React from 'react';

import {formatDate} from "../utils"

class MailDetail extends React.Component {
  render() {
      return (
          <div className="maildetail">
              <div className="maildetail__header">
                <span className="maildetail__subject">{this.props.mail.Subject}</span>
                <span className="maildetail__from">From: {this.props.mail.From}</span>
                <span className="maildetail__to">To: {this.props.mail.To.join(", ")}</span>
                <span className="maildetail__date">Sent: {formatDate(this.props.mail.Date)}</span>
              </div>
            <p>{this.props.mail.text}</p>
            <button className="btn" onClick={() => this.props.hide(this.props.mail.id)}>close</button>
          </div>
      )
  }
}

export default MailDetail