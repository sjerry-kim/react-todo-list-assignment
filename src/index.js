import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App';
import 'reset.css';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
