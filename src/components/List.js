import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import * as dataActions from '../store/data/actions'
import {useDispatch} from 'react-redux'
//import {bindActionCreators} from 'redux'
//import {connect} from 'react-redux';
import axios from 'axios'

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
      id: 'population',
      label: 'Population',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'density',
      label: 'Density',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
        id: 'TOZ',
        label: 'TOZ',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'TOZ2',
        label: 'TOZ2',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
  ];
  
  function createData(name, code, population, size, TOZ, TOZ2) {
    const density = population / size;
    return { name, code, population, size, density, TOZ, TOZ2 };
  }
  
  const toz = "toz";
  const toz2 = "toz2";

  const rows = [
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('India', 'IN', 1324171354, 3287263, toz, toz2),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
  ];

const useStyles = makeStyles({
  tableroot: {
    width: '100%',
    marginTop: '10%',
  },
  container: {
    maxHeight: '100%',
  },
});

export default function ListTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const dispatch = useDispatch() 

//   function getData() {
//     dispatch(dataActions.getData());
//     console.log("ON GET DATA FUNCTION");
//   }

  function getData() {
        return axios
           .get('https://data.opendatasoft.com/api/records/1.0/search/?dataset=jcdecaux_bike_data%40public&q=&lang=fr&rows=10000&facet=banking&facet=bonus&facet=status&facet=contract_name&timezone=Europe%2FBerlin')
           .then(response => {
             console.log(response.data.records);
             return response
              })
            .catch(err => {
                 console.log(err)
            })
      }
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div> 
    <Paper className={classes.tableroot}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: '#c8ced3', fontWeight: 'bold' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    
    {getData()}
    </div>
    );
}

// function MapDispatchToProps(dispatch){
//     return bindActionCreators(dataActions.getData(),dispatch); 
// }

// connect (MapDispatchToProps)(ListTable);
