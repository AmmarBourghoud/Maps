import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const columns = [
    { id: 'number', label: 'Number', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 160 },
    { id: 'address', label: 'Address', minWidth: 170 },
    { id: 'position', label: 'Position', minWidth: 170 },
    { id: 'banking', label: 'Banking', minWidth: 100 },
    { id: 'bonus', label: 'Bonus', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100 },
  ];
  
  function createData(number, name, address, position, banking, bonus, status) {
    return { number, name, address, position, banking, bonus, status };
  }
  
const useStyles = makeStyles({
  tableroot: {
    width: '100%',
    marginTop: '10%',
  },
  container: {
    maxHeight: '100%',
  },
});

export default function ListTable(data) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [active, setActive] = useState(false);

  data = data.data;
  let rows = [];
  if(data !== undefined)
  data.map( (sdata) =>
    rows.push(createData(sdata.fields.number, sdata.fields.name, sdata.fields.address, sdata.fields.position, sdata.fields.banking, sdata.fields.bonus, sdata.fields.status) ),
  )

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (column) => {
      //console.log(column);
  }

  return (
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
                  <TableSortLabel
                    active={active}
                    direction={order}
                    onClick={handleSort(column)}
                  >
                  {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.position}>
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
    );
}
