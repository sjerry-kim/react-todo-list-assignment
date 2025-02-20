import { Backdrop, CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <Backdrop
      sx={(theme) => ({
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        color: 'rgba(255, 255, 255, 0.5)',
        zIndex: theme.zIndex.drawer + 1,
      })}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
