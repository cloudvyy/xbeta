// client/src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = ({ tweetId }) => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await axios.get(`/api/entries/${tweetId}/draw-winners`);
        setWinners(response.data.winners);
      } catch (error) {
        console.error('Error fetching winners', error);
      }
    };
    fetchWinners();
  }, [tweetId]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>20 Random Winners</h2>
      <ul>
        {winners.map((winner, index) => (
          <li key={index}>{winner.username} (Retweeted: {winner.tweetLink})</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
