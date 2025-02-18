import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>회원가입을 축하합니다.</h1>
      <p>이메일 인증 후, 로그인 가능합니다 :)</p>
      <Button variant="outlined" onClick={() => navigate('/')}>
        로그인하기
      </Button>
    </div>
  );
};

export default NotFound;
