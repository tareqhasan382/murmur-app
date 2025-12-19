import { Routes, Route } from 'react-router-dom';
import Timeline from './pages/Timeline';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from "./components/NotFound.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import UserProfile from "./pages/UserProfile.tsx";

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={
               <Login/>
                } />
            <Route path="/profile/:id" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={ <ProtectedRoute><Timeline /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
