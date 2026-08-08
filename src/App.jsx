import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/user/Home'
import Login from './pages/auth/Login'
import PageNotFound from './pages/PageNotFound'
import About from './pages/user/About'
import RecipeScaler from './pages/user/RecipeScaler'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<PageNotFound />} />
      <Route path="/tools/recipe-scaler" element={<RecipeScaler />} />
    </Routes>
  )
}

export default App