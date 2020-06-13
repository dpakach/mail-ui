import React from 'react';

import arrowIcon from "../files/icon_arrow02.svg"
import attachmentIcon from "../files/icon_clip.svg"
import mailIcon from "../files/icon_mail_sp.svg"
import { FIELDS } from '../utils/consts';

// The email row in the Mail List
function Email(props) {
  // Get the email object from the props
  const {email} = props

  /**
   * format the date based on time since the email
   * 
   * if it is on current date use time
   *    eg. 1:20
   * if the year is same use month and date
   *    eg. Jan 14
   * otherwise full format
   *    eg 1/27/2018
   */
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

  // Get the to field of the email
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

  // Get the subject field of the email
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
      <td className={`emails-table__data emails-table__from ${props.sortBy === FIELDS.From ? "sort-active":""}`}>
        {email.From}
      </td>
      <td className={`emails-table__data emails-table__tofield ${props.sortBy === FIELDS.To ? "sort-active":""}`}>
        {to()}
      </td>
      <td className={`emails-table__data emails-table__subject ${props.sortBy === FIELDS.Subject ? "sort-active":""}`}>
        {subject()}
      </td>
      <td className={`emails-table__data emails-table__date ${props.sortBy === FIELDS.Date ? "sort-active":""}`}>
        {date()}
        <img className="emails-table__arrow" src={arrowIcon} alt=""/>
      </td>
    </tr>
  );
}

export default Email;