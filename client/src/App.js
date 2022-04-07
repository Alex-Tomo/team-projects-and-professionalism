import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Login from "./pages/login"
import User from "./pages/board-user"
import Admin from "./pages/board-admin"
import Tutor from "./pages/board-tutor"
import Nav from "./components/layout/navbar"
import Home from "./pages/home"
import TopicList from './components/lessons/TopicList';
import LessonList from './components/lessons/LessonList'
import Questions from './components/lessons/questions/Questions'
import CompletedLesson from './components/lessons/CompletedLesson'
import ViewLesson from './components/lessons/ViewLesson';
import MathQuestions from './components/lessons/questions/MathQuestions'
import EnglishQuestions from './components/lessons/questions/EnglishQuestions'
import VerbalQuestions from './components/lessons/questions/VerbalQuestions'
import NonVerbalQuestions from './components/lessons/questions/NonVerbalQuestions'
import ManagementAdmin from "./pages/management-admin"
import PasswordRecovery from "./pages/password-recovery"
import PasswordReset from "./pages/password-reset"
import CompletedLessonList from './components/lessons/CompletedLessonsList';

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/password-recovery' element={<PasswordRecovery />} />
                <Route path='/password-reset' element={<PasswordReset />} />
                <Route path="/user" element={<User />} />
                <Route path="/tutor" element={<Tutor />} />
                <Route path="/admin" element={<Admin />} />
                <Route path='/management' element={<ManagementAdmin />} />
                <Route path="/topics" element={<TopicList />} />
                <Route path="/questions" element={<Questions />} />
                <Route path="/completedlesson" element={<CompletedLesson />} />
                <Route path="/viewlesson" element={<ViewLesson />} />
                <Route path="/completed" element={<CompletedLessonList />} />
                <Route path="/math" element={<LessonList title="Math Test" type="math" />} />
                <Route path="/english" element={<LessonList title="English Test" type="english" />} />
                <Route path="/verbal" element={<LessonList title="Verbal Test" type="verbal_reasoning" />} />
                <Route path="/nonverbal" element={<LessonList title="Non Verbal Test" type="non_verbal_reasoning" />} />
                <Route path="/mathquestions" element={<MathQuestions />} />
                <Route path="/englishquestions" element={<EnglishQuestions />} />
                <Route path="/verbalquestions" element={<VerbalQuestions />} />
                <Route path="/nonverbalquestions" element={<NonVerbalQuestions />} />
                <Route path="/*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
