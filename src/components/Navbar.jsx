import { useNavigate } from 'react-router-dom';
import { signOut } from 'api/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAtom } from 'recoil/userAtom';
import styles from 'components/Navbar.module.css';
import { Button } from '@mui/material';
import { alertAtom } from '../recoil/alertAtom';

const Navbar = () => {
  const navigate = useNavigate();
  const [userState, setUserState] = useRecoilState(userAtom);
  const setAlertState = useSetRecoilState(alertAtom);

  const handleLogout = async () => {
    try {
      const result = await signOut();

      await setUserState(result.user);
      navigate('/', { replace: true });
    } catch (error) {
      // prettier-ignore
      setAlertState({
        open: true,
        message: error.message,
        severity: 'error'
      });
    }
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li>반가워요, {userState?.user_metadata?.display_name}님! </li>
        <li>
          <Button className={styles.login_btn} onClick={handleLogout}>
            로그아웃
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
