import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from 'api/auth';
import onTextChange from 'utils/onTextChange';
import useValidation from 'hooks/useValidation';
import { useSetRecoilState } from 'recoil';
import { alertAtom } from 'recoil/alertAtom';
import styles from 'pages/Signup.module.css';
import { Button, TextField } from '@mui/material';

const Main = () => {
  const navigate = useNavigate();
  const [jsonData, setJsonData] = useState({
    email: '',
    password: '',
    displayName: '',
  });
  const validationRules = {
    email: {
      required: true,
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: {
      required: true,
      pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).+$/,
      minLength: 9,
      maxLength: 12,
    },
    displayName: {
      required: true,
      pattern: /^[a-zA-Z0-9가-힣_-]+$/,
      minLength: 2,
      maxLength: 15,
    },
  };
  const [isLoading, setIsLoading] = useState(false);
  const setAlertState = useSetRecoilState(alertAtom);
  const { handleChange } = onTextChange(setJsonData);
  let { errors, validate } = useValidation(jsonData, validationRules);

  // 회원가입
  const handleSigUup = async () => {
    try {
      setIsLoading(true);
      await signUp(jsonData);
      navigate('/signup-confirm');
    } catch (error) {
      // prettier-ignore
      setAlertState({
        open: true,
        message: error.message,
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    const isValid = validate();

    if (isValid) {
      handleSigUup();
    }
  };

  return (
    <main className={styles.main}>
      <header>
        <h1>회원 가입</h1>
      </header>
      <section className={styles.section}>
        <ul className={styles.ul}>
          <li>
            <TextField
              className={styles.input}
              error={!!errors.email}
              placeholder="이메일"
              variant="outlined"
              name="email"
              type="email"
              value={jsonData.email}
              sx={{ backgroundColor: '#fff' }}
              slotProps={{ inputLabel: { shrink: false } }}
              onChange={handleChange}
            />

            <p className={errors.email && styles.helper_text}>{errors.email && errors.email}</p>
          </li>
          <li>
            <TextField
              className={styles.input}
              error={!!errors.password}
              placeholder="패스워드"
              variant="outlined"
              type="password"
              name="password"
              value={jsonData.password}
              sx={{ backgroundColor: '#fff' }}
              slotProps={{ inputLabel: { shrink: false } }}
              onChange={handleChange}
            />
            <p className={errors.password && styles.helper_text}>{errors.password && errors.password}</p>
          </li>
          <li>
            <TextField
              className={styles.input}
              error={!!errors.displayName}
              placeholder="닉네임"
              variant="outlined"
              type="displayName"
              name="displayName"
              value={jsonData.displayName}
              sx={{ backgroundColor: '#fff' }}
              slotProps={{ inputLabel: { shrink: false } }}
              onChange={handleChange}
            />
            <p className={errors.displayName && styles.helper_text}>{errors.displayName && errors.displayName}</p>
          </li>
        </ul>
        <div className={styles.signup_btn_box}>
          <Button
            className={styles.signup_btn}
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{ backgroundColor: '#1F4529' }}
            onClick={handleSubmit}
          >
            회원가입
          </Button>
        </div>
      </section>
      <div className={styles.login_btn_box}>
        <Button color="success" sx={{ color: '#1F4529' }} onClick={() => navigate('/')}>
          로그인 페이지로
        </Button>
      </div>
    </main>
  );
};

export default Main;
