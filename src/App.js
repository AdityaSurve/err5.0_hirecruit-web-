import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import {AuthContextProvider} from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import JobDesc from './pages/JobDesc';


function App() {
  const [isTopOfpage, setIsTopOfpage] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY === 0) setIsTopOfpage(true)
      if(window.scrollY !== 0) setIsTopOfpage(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  },[])

  return (
    <div className="">
      <AuthContextProvider>

      <BrowserRouter>
        <Navbar isTopOfpage={isTopOfpage} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/job/:jobId' element={<JobDesc/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
