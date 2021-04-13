import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

    
//     '& .MuiDataGrid-iconSeparator': {
//       display: 'none',
//     },
//     '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
//       borderRight: `1px solid ${
//         theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
//       }`,
//     },
//     '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
//       borderBottom: `1px solid ${
//         theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
//       }`,
//     },
//     '& .MuiDataGrid-cell': {
//       color:
//         theme.palette.type === 'light'
//           ? 'rgba(0,0,0,.85)'
//           : 'rgba(255,255,255,0.65)',
//     },
//     '& .MuiPaginationItem-root': {
//       borderRadius: 0,
//     },
//     '& .MuiCheckbox-root svg': {
//       width: 16,
//       height: 16,
//       backgroundColor: 'transparent',
//       border: `1px solid ${
//         theme.palette.type === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
//       }`,
//       borderRadius: 2,
//     },
//     '& .MuiCheckbox-root svg path': {
//       display: 'none',
//     },
//     '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
//       backgroundColor: '#1890ff',
//       borderColor: '#1890ff',
//     },
//     '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
//       position: 'absolute',
//       display: 'table',
//       border: '2px solid #fff',
//       borderTop: 0,
//       borderLeft: 0,
//       transform: 'rotate(45deg) translate(-50%,-50%)',
//       opacity: 1,
//       transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
//       content: '""',
//       top: '50%',
//       left: '39%',
//       width: 5.71428571,
//       height: 9.14285714,
//     },
//     '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
//       width: 8,
//       height: 8,
//       backgroundColor: '#1890ff',
//       transform: 'none',
//       top: '39%',
//       border: 0,
//     },
//   },
// });

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 600,
    width: '100%',
    '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
      borderRight: `1px solid ${
      theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
    }`,},
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: 'lightgrey',
    },
   },
}));

const columns = [
  { field: 'id', hide: true },
  { field: 'number', headerName: 'Number', width: 110 },
  { field: 'name', headerName: 'Name', width: 350 },
  { field: 'address', headerName: 'Address', width: 350 },
  { field: 'position', headerName: 'Position', width: 270 },
  { field: 'banking', headerName: 'Banking', width: 110 },
  { field: 'bonus', headerName: 'Bonus', width: 100 },
  { field: 'status', headerName: 'Status', width: 100 },
];

function createData(id, number, name, address, position, banking, bonus, status) {
  return { id, number, name, address, position, banking, bonus, status };
}

export default function ListTable(data) {
  const classes = useStyles();
  data = data.data;
  let rows = [];
  if(data.length > 0)
  data.map( (sdata) =>
    rows.push(createData(sdata.recordid, sdata.fields.number, sdata.fields.name, sdata.fields.address, sdata.fields.position, sdata.fields.banking, sdata.fields.bonus, sdata.fields.status, sdata.recordid) ),
  )

  return (
    <div style={{ marginTop: '10%', height: 600, width: '100%' }}>
      <DataGrid className={classes.root} rows={rows} columns={columns} pageSize={15} rowsPerPageOptions={[15, 50, 100]} />
    </div>
  );
}
