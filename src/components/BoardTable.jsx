import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalAtom } from 'recoil/modalAtom';
import { boardAtom } from 'recoil/boardAtom';
import moment from 'moment/moment';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { CircularProgress } from '@mui/material';

const BoardTable = ({ rows, isLoading }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [boardState, setBoardState] = useRecoilState(boardAtom);
  const setModalState = useSetRecoilState(modalAtom);

  const handleSelectAllClick = (event) => {
    setBoardState((prev) => ({
      ...prev,
      selected: event.target.checked
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => item.idx)
        : [],
    }));
  };

  const handleSelectClick = (idx) => {
    setBoardState((prev) => ({
      ...prev,
      selected: prev.selected.includes(idx) ? prev.selected.filter((item) => item !== idx) : [...prev.selected, idx],
    }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setBoardState((prev) => ({
      ...prev,
      selected: [],
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleModalOpen = (data) => {
    setModalState((prev) => ({
      ...prev,
      isOpen: true,
      data: data,
    }));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={boardState.selected.length < 0 && boardState.selected.length < rows.length}
                    checked={
                      rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length > 0 &&
                      boardState.selected.length === rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length
                    }
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>no.</TableCell>
                <TableCell align="right">내용</TableCell>
                <TableCell align="right">작성일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isLoading && rows.length > 0 ? (
                rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                  <TableRow key={index} selected={boardState.selected.includes(item.idx)}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={boardState.selected.includes(item.idx)}
                        onChange={() => handleSelectClick(item.idx)}
                      />
                    </TableCell>
                    <TableCell>{item.rn}</TableCell>
                    <TableCell onClick={() => handleModalOpen(item)}>{item.text}</TableCell>
                    <TableCell align="right">{moment(item.created_at).format('YYYY-MM-DD')}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    {isLoading ? <CircularProgress color="inherit" /> : '등록된 내용이 없습니다.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default BoardTable;
