import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from 'pages/NotFound.module.css';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Button } from '@mui/material';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.not_found_container}>
      <ErrorOutlineIcon sx={{ color: '#1F4529', fontSize: '80px' }} />
      <h1 className={styles.not_found_text}>존재하지 않는 페이지입니다.</h1>
      <Button variant="contained" sx={{ backgroundColor: '#1F4529' }} onClick={() => navigate(-1)}>
        뒤로가기
      </Button>
    </div>
  );
};

export default NotFound;
