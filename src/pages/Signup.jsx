import { Button, TextField } from '@mui/material';
import styles from './Signup.module.css';
import { useState } from 'react';
import useChange from 'hooks/useChange';
import useValidation from '../hooks/useValidation';
import { signUp } from 'api/auth';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  const [jsonData, setJsonData] = useState({
    email: '',
    password: '',
    displayName: '',
  });
  const { handleChange } = useChange(setJsonData);
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
  const { errors, validate } = useValidation(jsonData, validationRules);

  const handleSignup = async () => {
    try {
      await signUp(jsonData.email, jsonData.password, jsonData.displayName);
      navigate('/signup-confirm');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    const isValid = validate();

    if (isValid) {
      handleSignup();
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
              label="이메일"
              variant="outlined"
              type="email"
              value={jsonData.email}
              name="email"
              onChange={handleChange}
            />
            <p className={errors.email && styles.helper_text}>{errors.email && errors.email}</p>
          </li>
          <li>
            <TextField
              className={styles.input}
              error={!!errors.password}
              label="패스워드"
              variant="outlined"
              type="password"
              value={jsonData.password}
              name="password"
              onChange={handleChange}
            />
            <p className={errors.password && styles.helper_text}>{errors.password && errors.password}</p>
          </li>
          <li>
            <TextField
              className={styles.input}
              error={!!errors.displayName}
              label="닉네임"
              variant="outlined"
              type="displayName"
              value={jsonData.displayName}
              name="displayName"
              onChange={handleChange}
            />
            <p className={errors.displayName && styles.helper_text}>{errors.displayName && errors.displayName}</p>
          </li>
        </ul>
        <div className={styles.signup_btn_box}>
          <Button className={styles.signup_btn} variant="contained" size="large" onClick={handleSubmit}>
            회원가입
          </Button>
        </div>
      </section>
      <div className={styles.login_btn_box}>
        <Button onClick={() => navigate('/')}>로그인 페이지로</Button>
      </div>
    </main>
  );
};

export default Main;
