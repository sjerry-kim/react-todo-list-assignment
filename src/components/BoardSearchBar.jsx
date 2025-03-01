import { useNavigate } from 'react-router-dom';
import { getBoard } from 'api/board';
import onTextChange from 'utils/onTextChange';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAtom } from 'recoil/userAtom';
import { boardAtom } from 'recoil/boardAtom';
import { alertAtom } from 'recoil/alertAtom';
import styles from 'components/BoardSearchBar.module.css';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const BoardSearchBar = () => {
  const navigate = useNavigate();
  const [userState, setUserState] = useRecoilState(userAtom);
  const [boardState, setBoardState] = useRecoilState(boardAtom);
  const setAlertState = useSetRecoilState(alertAtom);
  const { handleChange } = onTextChange(setBoardState);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
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
      })

      if (error.status === 401) {
        navigate('/404');
        setUserState(null);
      }
    }
  };

  return (
    <Paper
      className={styles.search_paper}
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
    >
      <InputBase
        className={styles.input}
        sx={{ ml: 1, flex: 1 }}
        placeholder="내용 검색"
        value={boardState.search}
        name={'search'}
        onChange={handleChange}
      />
      <IconButton type="submit" sx={{ p: '7px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default BoardSearchBar;
