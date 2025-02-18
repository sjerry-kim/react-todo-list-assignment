import Router from './routes/router';
import { Suspense } from 'react';
import Loading from './components/Loading';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router />
    </Suspense>
  );
}

export default App;
