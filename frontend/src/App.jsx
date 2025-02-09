// eslint-disable-next-line no-unused-vars
import React from 'react';
//import './App.css';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className='w-full flex flex-col items-center justify-center'> 
      <FileUpload />
      <Dashboard />
      
    </div>
  );
}

export default App;

