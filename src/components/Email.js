import React from 'react';

import attachmentIcon from "../files/icon_clip.svg"

function Email(props) {
  const {email} = props

  const date = () => {
    const dateObj = new Date(Date.parse(email.Date))
    const today = new Date()
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"]

    if (dateObj.getFullYear() !== today.getFullYear()) {
      return dateObj.toLocaleDateString("en-US")
    }
    if (dateObj.getDate() !== today.getDate()) {
      return `${months[dateObj.getMonth()]} ${dateObj.getDate()}`
    }
    return `${dateObj.getHours()}:${dateObj.getMinutes()}`
  }

  const to = () => {
    if (email.To.length > 1) {
      return <span>
          <span>{email.To[0]}, ...</span>
          <span class="extra-email-counter">+{email.To.length - 1}</span>
        </span>
    } else {
      return <span>{email.To[0]}</span>
    }
  }

  const subject = () => {
    if (email.Attachment) {
      return <span>
          <span>{email.Subject}</span>
          <img src={attachmentIcon} alt=""/>
        </span>
    } else {
      return <span>{email.Subject}</span>
    }
  }

  return (
    <tr className="emails-table__row">
      <td className="emails-table__data">
        {email.From}
      </td>
      <td className="emails-table__data emails-table__tofield">
        {to()}
      </td>
      <td className="emails-table__data emails-table__subject">
        {subject()}
      </td>
      <td className="emails-table__data">
        {date()}
      </td>
    </tr>
  );
}

export default Email;