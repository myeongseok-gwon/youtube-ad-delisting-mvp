import React, { useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function VideoTable({ rows }) {
  const columns = useMemo(() => [
    {
      field: 'id',
      headerName: 'Video',
      width: 300,
      renderCell: params => (
        <iframe
          title={params.value}
          width="380"
          height="220"
          src={`https://www.youtube.com/embed/${params.value}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )
    },
    { 
      field: 'gender_male', 
      headerName: 'Delisting Score', 
      width: 200,
      valueFormatter: ({ value }) => value.toFixed(2)
    },
    { field: 'impressions', headerName: 'Impressions', width: 200 },
    { field: 'reasoning', headerName: 'Reason', width: 400 }
  ], []);

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={rows}
        rowHeight={240}
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
        rowBuffer={5}
        density="compact"
      />
    </div>
  );
}
