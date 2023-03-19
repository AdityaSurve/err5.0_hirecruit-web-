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
import PostJob from './pages/PostJob';
import UserProfile from './pages/UserProfile';
import Search from './pages/Search';
import Feedback from './pages/Feedback';
import Jobapp from './pages/Jobapp';
import Notifications from './pages/Notifications';


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
          <Route path='/postjob' element={<PostJob/>} />
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/search' element={<Search />} />
          <Route path='/search/:topic' element={<Search />} />
          <Route path='/feedback' element={<Feedback/>} />
          <Route path='/applications/:jobid' element={<Jobapp/>} />
          <Route path='/notifications' element={<Notifications/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
