import React from 'react'
import RegForm from './components/RegForm'
import Home from './components/Home'
import Crud from './components/Crud'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/register"
            element={<RegForm />}
          />
          <Route
            path="/manage"
            element={<Crud />}
          />
        </Routes>
      </div>
    </Router>
  )
}
