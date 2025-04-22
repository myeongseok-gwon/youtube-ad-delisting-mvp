import React, { useEffect, useState, useMemo } from 'react';
import Papa from 'papaparse';
import { Container, Typography, Box } from '@mui/material';
import FilterPanel from './components/FilterPanel';
import VideoTable from './components/VideoTable';
import './styles.css';

const CSV_URL = process.env.PUBLIC_URL + '/videos.csv';
const THRESHOLD = 0.4;

function App() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    gender: 'male',
    ages: ['age_0_9','age_10s','age_20s','age_30s','age_40s','age_50_plus']
  });

  // 1. CSV 로드
  useEffect(() => {
    Papa.parse(CSV_URL, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: ({ data: rows }) => {
        // 숫자형 변환
        const parsed = rows.map(r => ({
          ...r,
          age_0_9: +r.age_0_9,
          age_10s: +r.age_10s,
          age_20s: +r.age_20s,
          age_30s: +r.age_30s,
          age_40s: +r.age_40s,
          age_50_plus: +r.age_50_plus,
          gender_male: +r.gender_male,
          gender_female: +r.gender_female,
          impressions: +r.impressions
        }));
        setData(parsed);
      }
    });
  }, []);

  // 2. 필터 적용 (메모이제이션)
  const filtered = useMemo(() => {
    return data.filter(row => {
      const { gender, ages } = filters;
      // gender 기준
      const genderPass = row[`gender_${gender}`] >= THRESHOLD;
      // 연령 기준 (하나라도 threshold 이상이면 포함)
      const agePass = ages.some(ageKey => row[ageKey] >= THRESHOLD);
      return genderPass || agePass;
    });
  }, [data, filters]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        YouTube Ads Delisting MVP
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FilterPanel filters={filters} setFilters={setFilters} />
      </Box>
        {/* ↙ 여기에 전체/대상 개수 표시 */}
        <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">
          전체 {data.length.toLocaleString()}개 중 {filtered.length.toLocaleString()}개 동영상이 delist 대상입니다.
        </Typography>
      </Box>
      <VideoTable rows={filtered} />
    </Container>
  );
}

export default App;
