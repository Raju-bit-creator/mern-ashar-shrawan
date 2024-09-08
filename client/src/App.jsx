

import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Alert from './components/Alert'
import Serviceitems from './components/Serviceitems'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home'
import About from './components/About'
import BlogState from './context/blogs/BlogState'
import Counter from './components/Reduce'
import Form from './components/Reduce'
import CartItems from './components/cartItems'
import Login from './components/Login'
import Signup from './components/Signup'




function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  console.log('API Key:', apiKey);

  const [mode, setMode] = useState('light')
  const [text, setButtonText] = useState('Enable Dark')
  const [alert, setAlert] = useState(null)

  const showAlert = (type, message) => {
    setAlert({
      type: type,
      message: message
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);

  }

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark')
      setButtonText('Enable light')
      showAlert('success', 'your dark mode has been enabled')
    }
    else {
      setMode('light')
      setButtonText('Enable dark')
      showAlert('success', 'your light mode has been enabled')
    }
  }
  return (
    <>
    <BlogState apiKey={apiKey}>
      <Router>
        <Navbar mode={mode} text={text} toggleMode={toggleMode} />
        <Alert alert={alert} showAlert={showAlert} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blogs' element={<Serviceitems apiKey={apiKey} />} />
          <Route path='/about' element={<About />} />
          <Route path='/reduce' element={<Form />} />
          <Route path='/cartitems' element={<CartItems/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup alert={alert} showAlert={showAlert}  />} />
        </Routes>
      </Router>
    </BlogState>
    </>
  )
}

export default App
