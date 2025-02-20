import { useNavigate } from 'react-router-dom';
import { getBoard, patchBoard, postBoard } from 'api/board';
import onTextChange from 'utils/onTextChange';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalAtom } from 'recoil/modalAtom';
import { userAtom } from 'recoil/userAtom';
import { boardAtom } from 'recoil/boardAtom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import useValidation from '../hooks/useValidation';
import styles from '../pages/SignIn.module.css';
import { alertAtom } from '../recoil/alertAtom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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
    <div>
      <Modal
        keepMounted
        open={modalState.isOpen}
        onClose={handleModalClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Button onClick={handleModalClose}>Close</Button>
          <TextField
            error={!!errors.text}
            id="filled-multiline-static"
            label="내용"
            multiline
            rows={2}
            maxLength={2}
            variant="filled"
            value={modalState.data.text}
            name={'text'}
            onChange={handleChange}
          />
          <p className={errors.text && styles.helper_text}>{errors.text && errors.text}</p>

          <Button onClick={handleSubmit}>{modalState.data.idx ? '수정 ' : '등록'}</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default BoardModal;
