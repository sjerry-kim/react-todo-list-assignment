import Router from './routes/router';
import { Suspense } from 'react';
import Loading from './components/Loading';
import CustomAlert from './components/CustomAlert';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

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
