import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import './style.scss';


export default function CustomMUITable({ hidePagination , rowsPerPageOptions=false , columns = [], rows = [], count = 0, perPage = 10, page = 1, handleChangePage = () => {},  handleChangeRowsPerPage = () => {} , ...props}) {
  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table className={'custom_datatable'} >
          <TableHead className="custom-table-head">
            <TableRow>
              {columns.map((column) => (
                <TableCell className='table_head'
                  key={column.id}
                  align={column.align}
                  style={{minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row,i) => {
              return ( 
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell className='table_cell' key={column.id} align={column.align}>
                          {column.format
                            ? column.format(value,row)
                            : (typeof value == "boolean" ? (value ? "True" : "False") : value)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              {!rows || rows.length === 0 ? 
                <TableCell colSpan={columns.length} align={'center'}>
                  No record found.
                </TableCell>: null
              }
          </TableBody>
        </Table>
      </TableContainer>
      {
        !hidePagination ? 
        <TablePagination
                className={'custom_datatable_pagination'}
                rowsPerPageOptions={rowsPerPageOptions || []}
                component="div"
                count={count}
                rowsPerPage={perPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />:
      null
      }
      
    </Paper>
  );
}