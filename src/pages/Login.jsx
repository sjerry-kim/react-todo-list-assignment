import { Button, TextField } from '@mui/material';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useChange from 'hooks/useChange';
import useValidation from '../hooks/useValidation';
import { signIn, signOut } from '../api/auth';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '../recoil/userAtom';
import LoginTypingText from '../components/LoginTypingText';

const Login = () => {
  const navigate = useNavigate();
  const [jsonData, setJsonData] = useState({
    email: '',
    password: '',
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
  };
  const { errors, validate } = useValidation(jsonData, validationRules);
  const setUser = useSetRecoilState(userAtom);

  const handleLogin = async () => {
    try {
      const res = await signIn(jsonData.email, jsonData.password);

      if (res.user) {
        await setUser(res.user);
        await navigate('/todo');
      } else {
        const message =
          res.code === 'email_not_confirmed' ? '이메일 인증 후 로그인할 수 있습니다.' : '로그인 정보가 일치하지 않습니다.';

        alert(message);

        throw res;
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = () => {
    const isValid = validate();

    if (isValid) {
      handleLogin();
    }
  };

  useEffect(() => {
    signOut();
    setUser(null);
  }, []);

  return (
    <main className={styles.main}>
      <header>
        <LoginTypingText />
      </header>
      <section className={styles.section}>
        <ul className={styles.ul}>
          <li>
            <TextField
              className={styles.input}
              error={!!errors.email}
              label="이메일"
              variant="outlined"
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
        </ul>
        <div className={styles.login_btn_box}>
          <Button className={styles.login_btn} variant="contained" size="large" onClick={handleSubmit}>
            로그인
          </Button>
        </div>
      </section>
      <div className={styles.signup_btn_box}>
        <Button onClick={() => navigate('signup')}>회원가입</Button>
      </div>
    </main>
  );
};

export default Login;
