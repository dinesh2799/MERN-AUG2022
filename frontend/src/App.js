import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import ChangePassword from './pages/ChangePassword';

function App() {
  return (
    <>
      <Router>
        <div className="App">
        <Header />
        <Routes>
           <Route path='/' element={<Dashboard />} />
           <Route path='/login' element= {<Login/>} />
           <Route path = '/register' element = {<Register/>} />  
           <Route path='/changePassword' element= {<ChangePassword/>} />
        </Routes> 
        </div>
      </Router>
    </>
  );
}

export default App;
