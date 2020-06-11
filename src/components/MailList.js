import React from 'react';

import EmailHeader from "./EmailHeader"
import Email from "./Email"

import data from "../files/emails.json"

function MailList(props) {
  const emails = props.emails.map(element => {
    return <Email email={element}/>  
  });
  return (
    <table class="emails-table">
      <EmailHeader/>
      <tbody>
        {emails}
      </tbody>
    </table>
  );
}

export default MailList;
