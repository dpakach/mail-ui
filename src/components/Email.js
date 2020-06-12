import React from 'react';

import attachmentIcon from "../files/icon_clip.svg"
import arrowIcon from "../files/icon_arrow02.svg"
import mailIcon from "../files/icon_mail_sp.svg"

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
          <img className="emails-table__attachment" src={attachmentIcon} alt=""/>
        </span>
    } else {
      return <span>{email.Subject}</span>
    }
  }

  return (
    <tr className="emails-table__row">
      <div className="emails-table__icons">
        <img src={mailIcon} alt=""/>
      </div>
      <td className={`emails-table__data emails-table__from ${props.sortBy === "From" ? "sort-active":""}`}>
        {email.From}
      </td>
      <td className={`emails-table__data emails-table__tofield ${props.sortBy === "To" ? "sort-active":""}`}>
        {to()}
      </td>
      <td className={`emails-table__data emails-table__subject ${props.sortBy === "Subject" ? "sort-active":""}`}>
        {subject()}
      </td>
      <td className={`emails-table__data emails-table__date ${props.sortBy === "Date" ? "sort-active":""}`}>
        {date()}
        <img className="emails-table__arrow" src={arrowIcon} alt=""/>
      </td>
    </tr>
  );
}

export default Email;