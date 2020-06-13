import React from 'react';

import EmailHeader from "./EmailHeader"
import Email from "./Email"

// The component responsible for displaying the emais list
function MailList(props) {
  // List of Email components from the emails in props
  const emails = props.emails.map(element => {
    return <Email key={element.id} sortBy={props.sortBy} email={element} showDetail={props.showDetail} showDetails={props.showDetails}/>  
  });
  return (
    <table className={`emails-table sort-by__${props.sortBy.toLowerCase()}`}>
      <thead>
        <EmailHeader showDetails={props.showDetails} showDetailsButton={props.showDetailsButton}/>
      </thead>
      <tbody>
        {emails}
      </tbody>
    </table>
  );
}

export default MailList;
