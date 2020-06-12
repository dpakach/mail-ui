import React from 'react';

import EmailHeader from "./EmailHeader"
import Email from "./Email"

function MailList(props) {
  const emails = props.emails.map(element => {
    return <Email sortBy={props.sortBy} email={element}/>  
  });
  return (
    <table className={`emails-table sort-by__${props.sortBy.toLowerCase()}`}>
      <EmailHeader/>
      <tbody>
        {emails}
      </tbody>
    </table>
  );
}

export default MailList;
