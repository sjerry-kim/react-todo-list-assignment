import { Fragment, useEffect } from 'react';
import { deleteBoard, getBoard } from 'api/board';
import BoardTable from 'components/BoardTable';
import BoardSelect from 'components/BoardSelect';
import BoardSearchBar from 'components/BoardSearchBar';
import BoardModal from 'components/BoardModal';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userAtom } from 'recoil/userAtom';
import { boardAtom } from 'recoil/boardAtom';
import { modalAtom } from 'recoil/modalAtom';
import styles from 'pages/Board.module.css';
import { Button } from '@mui/material';

const Board = () => {
  const userState = useRecoilValue(userAtom);
  const [boardState, setBoardState] = useRecoilState(boardAtom);
  const setModalState = useSetRecoilState(modalAtom);

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
      console.error(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getBoard(userState, boardState.select.ascending, boardState.search);

        setBoardState((prev) => ({
          ...prev,
          todoList: result.data,
        }));
      } catch (error) {
        console.error(error);
        alert(error.message);
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
          <BoardTable rows={boardState.todoList} />
        </section>
      </main>
      <BoardModal />
    </Fragment>
  );
};

export default Board;
