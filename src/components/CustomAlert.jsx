import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { alertAtom } from 'recoil/alertAtom';
import { Snackbar, Alert, Slide } from '@mui/material';

const CustomAlert = () => {
  const [alertState, setAlertState] = useRecoilState(alertAtom);

  useEffect(() => {
    if (alertState.open) {
      const timer = setTimeout(() => {
        setAlertState((prev) => ({ ...prev, open: false }));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alertState.open, setAlertState]);

  return (
    <Snackbar
      open={alertState.open}
      autoHideDuration={3000}
      onClose={() => setAlertState((prev) => ({ ...prev, open: false }))}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={(props) => <Slide {...props} direction="down" />}
    >
      <Alert severity={alertState.severity}>{alertState.message}</Alert>
    </Snackbar>
  );
};

export default CustomAlert;
