import React from 'react';
import {
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
  FormGroup, Checkbox, Button, Box
} from '@mui/material';

const AGE_KEYS = [
  { label: '0–9세', key: 'age_0_9' },
  { label: '10대', key: 'age_10s' },
  { label: '20대', key: 'age_20s' },
  { label: '30대', key: 'age_30s' },
  { label: '40대', key: 'age_40s' },
  { label: '50+대', key: 'age_50_plus' },
];

export default function FilterPanel({ filters, setFilters }) {
  const { gender, ages } = filters;

  const toggleAge = key =>
    setFilters(f => ({
      ...f,
      ages: f.ages.includes(key)
        ? f.ages.filter(a => a !== key)
        : [...f.ages, key]
    }));

  const clearAges = () => setFilters(f => ({ ...f, ages: [] }));
  const selectAllAges = () =>
    setFilters(f => ({ ...f, ages: AGE_KEYS.map(a => a.key) }));

  return (
    <Box sx={{ display: 'flex', gap: 4 }}>
      {/* 성별 */}
      <FormControl>
        <FormLabel>Gender</FormLabel>
        <RadioGroup
          row
          value={gender}
          onChange={e => setFilters(f => ({ ...f, gender: e.target.value }))}
        >
          <FormControlLabel value="male" control={<Radio />} label="남성" />
          <FormControlLabel value="female" control={<Radio />} label="여성" />
        </RadioGroup>
      </FormControl>

      {/* 연령대 */}
      <FormControl>
        <FormLabel>Age Groups</FormLabel>
        <FormGroup row>
          {AGE_KEYS.map(({ label, key }) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={ages.includes(key)}
                  onChange={() => toggleAge(key)}
                />
              }
              label={label}
            />
          ))}
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
            <Button size="small" onClick={selectAllAges}>
              Select All
            </Button>
            <Button size="small" onClick={clearAges}>
              Clear All
            </Button>
          </Box>
        </FormGroup>
      </FormControl>
    </Box>
  );
}
