import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteBoard, getBoard } from 'api/board';
import BoardTable from 'components/BoardTable';
import BoardSelect from 'components/BoardSelect';
import BoardSearchBar from 'components/BoardSearchBar';
import BoardModal from 'components/BoardModal';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAtom } from 'recoil/userAtom';
import { boardAtom } from 'recoil/boardAtom';
import { modalAtom } from 'recoil/modalAtom';
import { alertAtom } from 'recoil/alertAtom';
import styles from 'pages/Board.module.css';
import { useTheme } from '@mui/material/styles';
import { Button, useMediaQuery } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

const Board = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userState, setUserState] = useRecoilState(userAtom);
  const [boardState, setBoardState] = useRecoilState(boardAtom);
  const setModalState = useSetRecoilState(modalAtom);
  const setAlertState = useSetRecoilState(alertAtom);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleModalOpen = () => {
    setModalState((prev) => ({
      ...prev,
      isOpen: true,
    }));
  };

  // 선택 삭제
  const handleDelete = async () => {
    try {
      await deleteBoard(boardState.selected);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getBoard(userState, boardState.select.ascending, boardState.search);
        setBoardState((prev) => ({
          ...prev,
          todoList: result.data,
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [boardState.select]);

  return (
    <>
      <section className={styles.section}>
        <div className={styles.board_container}>
          <ul className={styles.ul}>
            <li>
              <Button
                className={styles.delete_btn}
                variant="contained"
                sx={{ cursor: 'pointer', backgroundColor: '#47663B' }}
                onClick={handleDelete}
              >
                {isMobile ? <DeleteOutlineIcon /> : '선택 삭제'}
              </Button>
            </li>
            <li className={styles.search_btn_box}>
              <BoardSearchBar />
              <BoardSelect />
            </li>
          </ul>
          <BoardTable rows={boardState.todoList} isLoading={isLoading} />
        </div>
        <div className={styles.add_btn_container}>
          <Button
            className={styles.add_btn}
            variant="outlined"
            size="large"
            sx={{ cursor: 'pointer', color: '#fff', backgroundColor: '#47663B' }}
            onClick={handleModalOpen}
          >
            {isMobile ? <DriveFileRenameOutlineIcon /> : '추가'}
          </Button>
        </div>
      </section>
      <BoardModal />
    </>
  );
};

export default Board;
