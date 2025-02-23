import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { getBoard, putBoard } from 'api/board';
import { userAtom } from 'recoil/userAtom';
import { modalAtom } from 'recoil/modalAtom';
import { boardAtom } from 'recoil/boardAtom';
import { alertAtom } from '../recoil/alertAtom';
import moment from 'moment/moment';
import styles from 'components/BoardTable.module.css';
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
import { CircularProgress, Switch, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const BoardTable = ({ rows, isLoading }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userState, setUserState] = useRecoilState(userAtom);
  const [boardState, setBoardState] = useRecoilState(boardAtom);
  const setModalState = useSetRecoilState(modalAtom);
  const setAlertState = useSetRecoilState(alertAtom);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  const handleFinishClick = async (item) => {
    try {
      await putBoard(item);

      const result = await getBoard(userState, boardState.select.ascending, boardState.search);

      setBoardState((prev) => ({
        ...prev,
        todoList: result.data,
        selected: [],
      }));
    } catch (error) {
      // prettier-ignore
      setAlertState({
        open: true,
        message: error.message,
        severity: 'error'
      });

      if (error.status === 401) {
        navigate('/404');
        setUserState(null);
      }
    }
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
    <Box sx={{ width: '100%', height: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <TableContainer>
          <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell align="center" padding="checkbox" sx={{ width: '10%' }}>
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
                <TableCell align="center" sx={{ width: '10%' }}>
                  no.
                </TableCell>
                <TableCell align="center" sx={{ width: '40%' }}>
                  내용
                </TableCell>
                <TableCell align="center" sx={{ width: '20%' }}>
                  완료
                </TableCell>
                {!isMobile && (
                  <TableCell align="center" sx={{ width: '20%' }}>
                    작성일
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody className={styles.table_body} sx={{ backgroundColor: '#fff' }}>
              {!isLoading && rows.length > 0 ? (
                rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                  <TableRow
                    key={index}
                    selected={boardState.selected.includes(item.idx)}
                    sx={{ height: '50px', cursor: 'pointer' }}
                    hover
                    onClick={(event) => {
                      if (event.target.type !== 'checkbox') {
                        handleModalOpen(item);
                      }
                    }}
                  >
                    <TableCell padding="checkbox" align="center" sx={{ width: '10%' }}>
                      <Checkbox
                        color="primary"
                        checked={boardState.selected.includes(item.idx)}
                        onChange={() => handleSelectClick(item.idx)}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ width: '10%' }}>
                      {item.rn}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: '40%',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.text}
                    </TableCell>
                    <TableCell align="center" sx={{ width: '20%' }}>
                      <Switch
                        checked={item.finish}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#47663B',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#1F4529',
                          },
                        }}
                        onChange={() => handleFinishClick(item)}
                      />
                    </TableCell>
                    {!isMobile && (
                      <TableCell align="center" sx={{ width: '20%' }}>
                        {moment(item.created_at).format('YYYY-MM-DD')}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow sx={{ height: '100px' }}>
                  <TableCell colSpan={isMobile ? 4 : 5} align="center">
                    {isLoading ? (
                      <CircularProgress color="success" />
                    ) : (
                      <div className={styles.no_data_box}>
                        등록된 내용이 없습니다
                        <SentimentVeryDissatisfiedIcon />
                      </div>
                    )}
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
