import { useNavigate } from 'react-router-dom';
import { getBoard, patchBoard, postBoard } from 'api/board';
import useValidation from 'hooks/useValidation';
import onTextChange from 'utils/onTextChange';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { alertAtom } from 'recoil/alertAtom';
import { modalAtom } from 'recoil/modalAtom';
import { userAtom } from 'recoil/userAtom';
import { boardAtom } from 'recoil/boardAtom';
import styles from 'components/BoardModal.module.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';

const BoardModal = () => {
  const navigate = useNavigate();
  const [userState, setUserState] = useRecoilState(userAtom);
  const [boardState, setBoardState] = useRecoilState(boardAtom);
  const [modalState, setModalState] = useRecoilState(modalAtom);
  const setAlertState = useSetRecoilState(alertAtom);
  const validationRules = {
    text: {
      required: true,
      minLength: 1,
      maxLength: 30,
    },
  };
  const { handleChange } = onTextChange(setModalState);
  let { errors, validate } = useValidation(modalState.data, validationRules);

  const handleModalClose = () => {
    setModalState({
      isOpen: false,
      data: { text: '' },
    });
    errors.text = '';
  };

  // 등록
  const handleCreate = async () => {
    try {
      await postBoard(userState, modalState.data.text);

      const result = await getBoard(userState, boardState.select.ascending, boardState.search);

      setBoardState((prev) => ({
        ...prev,
        todoList: result.data,
      }));

      await handleModalClose();
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

  // 수정
  const handleUpdate = async () => {
    try {
      await patchBoard(userState, modalState.data.idx, modalState.data.text);

      const result = await getBoard(userState, boardState.select.ascending, boardState.search);

      setBoardState((prev) => ({
        ...prev,
        todoList: result.data,
      }));

      await handleModalClose();
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

  const handleSubmit = () => {
    const isValid = validate();

    if (isValid) {
      if (modalState.data.idx) {
        handleUpdate();
      } else {
        handleCreate();
      }
    }
  };

  return (
    <Modal
      keepMounted
      open={modalState.isOpen}
      onClose={handleModalClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box className={styles.modal}>
        <div className={styles.modal_header}>
          <h3 className={styles.modal_title}>
            <DoneIcon />
            Todo List
          </h3>
          <CancelIcon sx={{ cursor: 'pointer', color: '#47663B' }} onClick={handleModalClose} />
        </div>
        <TextField
          className={styles.modal_text_field}
          error={!!errors.text}
          id="filled-multiline-static"
          hiddenLabel
          multiline
          variant="filled"
          value={modalState.data.text}
          name="text"
          sx={{
            '& .MuiFilledInput-root': {
              backgroundColor: 'transparent',
              overflow: 'hidden !important',
              '&:before': { borderBottom: 'none !important' },
              '&:hover:before': { borderBottom: 'none !important' },
              '&:after': { borderBottom: 'none !important' },
              '&.Mui-focused': {
                backgroundColor: 'transparent',
              },
            },
            '& .MuiFilledInput-input': {
              overflow: 'hidden !important',
              textOverflow: 'ellipsis',
            },
          }}
          onChange={handleChange}
        />

        <p className={errors.text && styles.helper_text}>{errors.text && errors.text}</p>
        <Button variant="contained" sx={{ backgroundColor: '#47663B' }} onClick={handleSubmit}>
          {modalState.data.idx ? '수정 ' : '등록'}
        </Button>
      </Box>
    </Modal>
  );
};

export default BoardModal;
