import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signOut } from 'api/auth';
import onTextChange from 'utils/onTextChange';
import useValidation from 'hooks/useValidation';
import LoginTypingText from 'components/LoginTypingText';
import { useSetRecoilState } from 'recoil';
import { userAtom } from 'recoil/userAtom';
import { alertAtom } from 'recoil/alertAtom';
import styles from 'pages/SignIn.module.css';
import { Button, TextField } from '@mui/material';

const SignIn = () => {
  const navigate = useNavigate();
  const [jsonData, setJsonData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
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
  const setUserState = useSetRecoilState(userAtom);
  const setAlertState = useSetRecoilState(alertAtom);
  const { handleChange } = onTextChange(setJsonData);
  let { errors, validate } = useValidation(jsonData, validationRules);

  // 로그인
  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const result = await signIn(jsonData);
      setUserState(result.user);
      navigate('/board');
    } catch (error) {
      // prettier-ignore
      setAlertState({
        open: true,
        message: error.message,
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();

    if (isValid) {
      handleSignIn();
    }
  };

  useEffect(() => {
    signOut();
    setUserState(null);
  }, []);

  return (
    <main className={styles.main}>
      <header>
        <LoginTypingText />
      </header>
      <section className={styles.section}>
        <form onSubmit={handleSubmit}>
          <ul className={styles.ul}>
            <li>
              <TextField
                className={styles.input}
                error={!!errors.email}
                label="이메일"
                variant="outlined"
                value={jsonData.email}
                name="email"
                sx={{ backgroundColor: '#fff' }}
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
                sx={{ backgroundColor: '#fff' }}
                onChange={handleChange}
              />
              <p className={errors.password && styles.helper_text}>{errors.password && errors.password}</p>
            </li>
          </ul>
          <div className={styles.login_btn_box}>
            <Button
              className={styles.login_btn}
              type="submit"
              variant="contained"
              size="large"
              sx={{ backgroundColor: '#1F4529' }}
              disabled={isLoading}
            >
              로그인
            </Button>
          </div>
        </form>
      </section>
      <div className={styles.signup_btn_box}>
        <Button variant="text" color="success" sx={{ color: '#1F4529' }} onClick={() => navigate('signup')}>
          회원가입
        </Button>
      </div>
    </main>
  );
};

export default SignIn;
