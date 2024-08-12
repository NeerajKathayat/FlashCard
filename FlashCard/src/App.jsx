import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './assets/Home'
import Dashboard from './assets/Dashboard';

function App() {

  return (
    <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
    </Router>
  )
}

export default App
