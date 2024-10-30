// client/src/App.js
import React from 'react';
import Login from './components/Login';
import TotalEntries from './components/TotalEntries';
import AdminDashboard from './components/AdminDashboard';
import WinnerDisplay from './components/WinnerDisplay';

function App() {
  const tweetId = '123456789'; // Replace with the actual tweet ID
  const adminAccount = 'adminAccountId'; // Replace with the actual admin account ID

  return (
    <div className="App">
      <Login />
      <TotalEntries tweetId={tweetId} />
      <AdminDashboard tweetId={tweetId} />
      <WinnerDisplay tweetId={tweetId} adminAccount={adminAccount} />
    </div>
  );
}

export default App;
