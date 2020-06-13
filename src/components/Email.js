import React from 'react';

import arrowIcon from "../files/icon_arrow02.svg"
import attachmentIcon from "../files/icon_clip.svg"
import mailIcon from "../files/icon_mail_sp.svg"
import { FIELDS } from '../utils/consts';

import {formatDate} from "../utils"
// The email row in the Mail List
function Email(props) {
  // Get the email object from the props
  const {email} = props

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

  const handleClick = () => {
    props.showDetail(email.id)
    props.showDetails()
  }

  return (
    <tr className="emails-table__row" onClick={handleClick}>
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
        {formatDate(email.Date)}
        <img className="emails-table__arrow" src={arrowIcon} alt=""/>
      </td>
    </tr>
  );
}

export default Email;