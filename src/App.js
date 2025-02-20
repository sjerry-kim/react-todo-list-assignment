import Router from './routes/router';
import { Suspense } from 'react';
import Loading from './components/Loading';
import CustomAlert from './components/CustomAlert';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router />
      <CustomAlert />
    </Suspense>
  );
}

export default App;
