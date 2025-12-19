import { Routes, Route } from 'react-router-dom';
import Timeline from './pages/Timeline';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Timeline />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}
