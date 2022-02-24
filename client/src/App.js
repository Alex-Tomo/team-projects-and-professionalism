import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from "./pages/login"
import User from "./pages/board-user"
import Admin from "./pages/board-admin"
import Tutor from "./pages/board-tutor"
import Nav from "./components/layout/navbar"
import Home from "./pages/home"
function App() {
  return (
    <BrowserRouter>
          <Nav />
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path='/login' element={<Login />}/>
              <Route path="user" element={<User />}/>
              <Route path="/tutor" element={<Tutor />}/>
              <Route path="admin" element={<Admin />}/>
            <Route path="*" element={<h1>404 Not Found</h1>}/>
          </Routes>
    </BrowserRouter>
  );
}

export default App;
