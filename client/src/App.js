import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [accountInsights, setAccountInsights] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('/api/account-insights');
      setAccountInsights(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Account Insights</h1>
      </header>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Impressions</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {accountInsights.map((account, index) => (
            <tr key={index}>
              <td>{account.account_name}</td>
              <td>{account.impressions}</td>
              <td>{account.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
