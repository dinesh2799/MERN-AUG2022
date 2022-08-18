import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import SignUp from './pages/Signup';
import SignIn from './pages/Signin';
import Navbar from './components/Navbar'
import ResetPassword from './pages/ResetPassword'
import HomePage from './pages/HomePage'

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Navbar />
        {/* <Header /> */}
        <Routes>
           <Route path='/' element={<HomePage />} />
           <Route path='/signin' element= {<SignIn/>} /> 
           <Route path = '/signup' element = {<SignUp/>} />
           <Route path='/resetPassword' element= {<ResetPassword/>} />
        </Routes> 
        </div>
      </Router>
    </>
  );
}

export default App;
