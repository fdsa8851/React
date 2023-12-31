import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

// const columns = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },
// ];

const columns = [
  { id: 'no', label: '번호', minWidth: 100 },
  { id: 'title', label: '제목', minWidth: 170 },
  { id: 'registId', label: '등록자', minWidth: 170, align: 'right'},
  { id: 'registDate', label: '등록일시', minWidth: 170, align: 'right'},
  { id: 'views', label: '조회수', minWidth: 170, align: 'right'},
];


//function 을 만들고 사용하니 
function createData(no, title, registId, registDate, views) {
  return {no, title, registId, registDate, views};
}

const rows = [
  createData('비밀', '제목입니다1.', '등록', '4', '1'),
  createData('1', '제목입니다4.', '등록5', '5', '7'),
  createData('2', '제목입니다2.', '등록2', '6', '8')
];

function fileUpLoad() {
  return (
    <div>
    </div>
  );
}

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Stack direction='row' justifyContent='flex-end' spacing={2} margin={1}>
      <Button variant="outlined" href="/Board/Write">등록</Button>
      {/* <Button variant="outlined">목록</Button> */}
      </Stack>
     <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.title}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                        {value} 
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              <Button></Button>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );

}