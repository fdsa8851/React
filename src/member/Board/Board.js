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
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const columns = [
  { id: 'no', label: '번호', minWidth: 100 },
  { id: 'title', label: '제목', minWidth: 170 },
  { id: 'id', label: '등록자', minWidth: 170, align: 'right'},
  { id: 'iDate', label: '등록일시', minWidth: 170, align: 'right'},
  { id: 'views', label: '조회수', minWidth: 170, align: 'right'},
];

export default function StickyHeadTable() {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    try {
      axios.get('http://localhost:3001/board', null, {
        headers: {
          "Content-Type": `application/json`,
        },
      }).then((response)=> {
        setBoardData(response.data);
      });
    }catch(err) {
      console.log("Error : ", err);
    }
  }, []);

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
              {boardData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.no}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <Link to={`/board/Write/${row.no}`} state={{ no: row.no }}>{value}</Link>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            {/* <Button></Button> */}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={boardData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );

}