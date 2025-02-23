import { Suspense } from 'react';
import Router from 'routes/router';
import Loading from 'components/Loading';
import CustomAlert from 'components/CustomAlert';
import theme from 'theme';
import { ThemeProvider } from '@mui/material/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Loading />}>
        <Router />
        <CustomAlert />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
