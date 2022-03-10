import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from "./pages/login"
import User from "./pages/board-user"
import Admin from "./pages/board-admin"
import Tutor from "./pages/board-tutor"
import Nav from "./components/layout/navbar"
import Home from "./pages/home"
import QuestionTest from "./pages/QuestionTest"
import QuestionList from './pages/QuestionList';
import MathQuestions from './pages/maths/MathsQuestions';
import EnglishQuestions from './pages/english/EnglishQuestions';
import VerbalQuestions from './pages/verbal-reasing/VerbalQuestions';
import NonVerbalQuestions from './pages/non-verbal-reasoning/NonVerbalQuestions';
import ManagementAdmin from "./pages/management-admin";

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path="user" element={<User />} />
                <Route path="/tutor" element={<Tutor />} />
                <Route path="admin" element={<Admin />} />
                <Route path='management' element={<ManagementAdmin />} />
                <Route path="/test" element={<QuestionTest />} />
                <Route path="math" element={<QuestionList />} />
                <Route path="english" element={<QuestionList />} />
                <Route path="verbal" element={<QuestionList />} />
                <Route path="nonverbal" element={<QuestionList />} />
                <Route path="mathquestions" element={<MathQuestions />} />
                <Route path="englishquestions" element={<EnglishQuestions />} />
                <Route path="verbalquestions" element={<VerbalQuestions />} />
                <Route path="nonverbalquestions" element={<NonVerbalQuestions />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
