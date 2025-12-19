import { Routes, Route } from 'react-router-dom';
import Timeline from './pages/Timeline';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from "./components/NotFound.tsx";
import UserProfile from "./pages/UserProfile.tsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Timeline />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
