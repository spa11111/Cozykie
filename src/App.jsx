import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/user/Home'
import Login from './pages/auth/Login'
import PageNotFound from './pages/PageNotFound'
import About from './pages/user/About'
import RecipeScaler from './pages/user/RecipeScaler'
import MeasurementConverter from './pages/user/MeasurementConverter'
import PantrySubstitution from './pages/user/PantrySubstitution'
import Signup from './pages/auth/Signup'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<PageNotFound />} />
      <Route path="/tools/scaler" element={<RecipeScaler />} />
      <Route path="/tools/converter" element={<MeasurementConverter />} />
      <Route path="/tools/substitution" element={<PantrySubstitution />} />

      <Route path="/create" element={<Signup />} />



    </Routes>
  )
}

export default App