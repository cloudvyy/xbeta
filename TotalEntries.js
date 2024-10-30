// client/src/components/TotalEntries.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TotalEntries = ({ tweetId }) => {
  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    const fetchTotalEntries = async () => {
      try {
        const response = await axios.get(`/api/entries/${tweetId}/retweet-count`);
        setTotalEntries(response.data.totalEntries);
      } catch (error) {
        console.error('Error fetching total entries', error);
      }
    };
    fetchTotalEntries();
  }, [tweetId]);

  return <div>Total Entries: {totalEntries}</div>;
};

export default TotalEntries;
