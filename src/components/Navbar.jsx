import styles from 'components/Navbar.module.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../api/auth';
import { useRecoilState } from 'recoil';
import { userAtom } from '../recoil/userAtom';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userAtom);

  const handleLogout = async () => {
    try {
      const res = await signOut();

      await setUser(res.user);
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li>반가워요, {user?.user_metadata?.display_name}님! </li>
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
