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
import styles from 'pages/Board.module.css';
import { Button } from '@mui/material';
import { alertAtom } from '../recoil/alertAtom';

const Board = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userState, setUserState] = useRecoilState(userAtom);
  const [boardState, setBoardState] = useRecoilState(boardAtom);
  const setModalState = useSetRecoilState(modalAtom);
  const setAlertState = useSetRecoilState(alertAtom);

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
    <Fragment>
      <main className={styles.main}>
        <section className={styles.section}>
          <Button className={styles.add_btn} variant="contained" size="large" onClick={handleModalOpen}>
            추가
          </Button>
          <Button className={styles.add_btn} variant="contained" size="large" onClick={handleDelete}>
            선택 삭제
          </Button>
          <BoardSearchBar />
          <BoardSelect />
          <BoardTable rows={boardState.todoList} isLoading={isLoading} />
        </section>
      </main>
      <BoardModal />
    </Fragment>
  );
};

export default Board;
