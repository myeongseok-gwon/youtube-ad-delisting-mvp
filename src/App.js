import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Container, Typography, Box } from '@mui/material';
import VideoTable from './components/VideoTable';
import './styles.css';

const CSV_URL = process.env.PUBLIC_URL + '/videos_may.csv';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse(CSV_URL, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: ({ data: rows }) => {
        const parsed = rows.map(r => ({
          ...r,
          gender_male: +r.gender_male,
          impressions: +r.impressions
        }));
        setData(parsed);
      }
    });
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Febreze Ads Campaign Detargeting
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">
          Out of 26,861 total videos, 12,315 videos are candidates for Detargeting.
        </Typography>
      </Box>
      <VideoTable rows={data} />
    </Container>
  );
}

export default App;
