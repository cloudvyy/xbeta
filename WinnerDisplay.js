// client/src/components/WinnerDisplay.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WinnerDisplay = ({ tweetId, adminAccount }) => {
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await axios.get(`/api/entries/${tweetId}/draw-winners`);
        const checkFollowPromises = response.data.winners.map(async (winner) => {
          const isFollowing = await checkIfFollowing(winner.id, adminAccount);
          return { ...winner, isFollowing };
        });
        const winnersWithFollowStatus = await Promise.all(checkFollowPromises);
        setWinners(winnersWithFollowStatus);
      } catch (error) {
        console.error('Error fetching winners', error);
      }
    };

    fetchWinners();
  }, [tweetId, adminAccount]);

  const checkIfFollowing = async (userId, adminAccount) => {
    try {
      const response = await axios.get(`/api/follow-status/${userId}/${adminAccount}`);
      return response.data.isFollowing;
    } catch (error) {
      console.error('Error checking follow status', error);
      return false;
    }
  };

  return (
    <div>
      <h2>Winner List with Follow Status</h2>
      <ul>
        {winners.map((winner, index) => (
          <li key={index}>
            {winner.username} - Follows Admin: {winner.isFollowing ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WinnerDisplay;
