import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from 'pages/SignupConfirm.module.css';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const SignupConfirm = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.text}>🥳 회원가입에 성공하였습니다.</h1>
        <div className={styles.subtext}>
          <ErrorOutlineIcon sx={{ color: '#1F4529', marginRight: '5px' }} />
          이메일 인증 후, 로그인 가능합니다.
        </div>
        <Button
          variant="contained"
          className={styles.navigate_btn}
          sx={{ backgroundColor: '#1F4529' }}
          onClick={() => navigate('/')}
        >
          로그인하기
        </Button>
      </div>
    </div>
  );
};

export default SignupConfirm;
