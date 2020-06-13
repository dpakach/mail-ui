import React from 'react';

//import './App.css';
import './main.css';

import EmailListFilterSort from './components/EmailListFilterSort'

// The main App Components
class App extends React.Component {
  render() {
    return (
      <div className="container">
        <EmailListFilterSort />
      </div>
    );
  }
}

export default App;