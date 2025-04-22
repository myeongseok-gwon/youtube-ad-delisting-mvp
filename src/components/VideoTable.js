import React, { useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function VideoTable({ rows }) {
  // 컬럼 정의: id → iframe, impressions, reasoning, 그리고 scores
  const columns = useMemo(() => {
    const scoreCols = ['gender_male','gender_female',
      'age_0_9','age_10s','age_20s','age_30s','age_40s','age_50_plus'
    ].map(key => ({
      field: key,
      headerName: key.replace(/_/g, ' '),
      width: 120,
      valueFormatter: ({ value }) => value.toFixed(2)
    }));

    return [
      {
        field: 'id',
        headerName: 'Video',
        width: 200,
        renderCell: params => (
          <iframe
            title={params.value}
            width="180"
            height="100"
            src={`https://www.youtube.com/embed/${params.value}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )
      },
      { field: 'impressions', headerName: 'Impressions', width: 130 },
      ...scoreCols,
      { field: 'reasoning', headerName: 'Reasoning', width: 300 }
    ];
  }, []);

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={rows}
        rowHeight={160}
        columns={columns}
        getRowId={r => r.id}
        pagination
        pageSizeOptions={[10, 25, 50, 100]}
        initialState={{
          pagination: { paginationModel: { pageSize: 25, page: 0 } },
          sorting: {
            sortModel: [{ field: 'gender_male', sort: 'desc' }]
          }
        }}
        disableRowSelectionOnClick
        rowBuffer={5}            // 추가 버퍼
        density="compact"
      />
    </div>
  );
}
