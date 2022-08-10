import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './components/styles.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
    <div style={{backgroundColor:'#f3f3f3',width:'100%',height:'100%'}}>
    <App />
    </div>
  </React.StrictMode>
);

