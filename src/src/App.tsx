import { Routes, Route } from 'react-router-dom';
import Timeline from './pages/Timeline';
import Profile from './pages/Profile';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Timeline />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}
