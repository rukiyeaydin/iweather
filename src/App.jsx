import './App.css'
import {Routes, Route, Router} from "react-router-dom"
import Home from './components/Home'
import Details from './components/Details'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/details/:cityName" element={<Details/>} />
    </Routes>
    </>
  )
}

export default App
