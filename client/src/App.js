import Admin from "./components/Admin"
import {BrowserRouter, Routes, Route} from "react-router-dom"

import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App