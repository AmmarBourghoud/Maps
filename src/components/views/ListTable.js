import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Link } from '@material-ui/core';
import routes from '../../routing/routes'
import { useHistory } from "react-router-dom";

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

export default function ListTable(data) {
  const classes = useStyles();
  let history = useHistory();

 const columns = [
  { field: 'id', hide: true },
  { field: 'number', headerName: 'Number', width: 110, renderCell: (params) => (
    <div>
      <Typography><Link color="primary" onClick={() => history.push(routes[0].path.replace(':id',params.id))} >{params.row.number}</Link></Typography>
    </div>
  ), },
  { field: 'name', headerName: 'Name', width: 350 },
  { field: 'address', headerName: 'Address', width: 350 },
  { field: 'position', headerName: 'Position', width: 270 },
  { field: 'banking', headerName: 'Banking', width: 110 },
  { field: 'bonus', headerName: 'Bonus', width: 100 },
  { field: 'status', headerName: 'Status', width: 100 },
  { field: 'available_bike_stands', headerName: 'Available Bike Stands', width: 100 },
  { field: 'available_bikes', headerName: 'Available Bikes', width: 100 },
  { field: 'last_update', headerName: 'Last Update', width: 190 },
  { field: 'bike_stands', headerName: 'Bike Stands', width: 100 },
  { field: 'contract_name', headerName: 'Contract Name', width: 100 },
];

function createData(id, number, name, address, position, banking, bonus, status, available_bike_stands, available_bikes, last_update, bike_stands, contract_name) {
  return { id, number, name, address, position, banking, bonus, status, available_bike_stands, available_bikes, last_update, bike_stands, contract_name };
}

  data = data.data;
  let rows = [];
  if(data.length > 0)
  data.map( (sdata) =>
    rows.push(createData(sdata.recordid, sdata.fields.number, sdata.fields.name, sdata.fields.address, sdata.fields.position, sdata.fields.banking, sdata.fields.bonus, sdata.fields.status, sdata.fields.available_bike_stands, sdata.fields.available_bikes, sdata.fields.last_update, sdata.fields.bike_stands, sdata.fields.contract_name) ),
  )

  return (
    <div style={{ marginTop: '10%', height: 600, width: '100%' }}>
       <DataGrid className={classes.root} rows={rows} columns={columns.map((column) => ({...column, disableClickEventBubbling:true }))} pageSize={15} rowsPerPageOptions={[15, 50, 100]} />
    </div>
  );
}
