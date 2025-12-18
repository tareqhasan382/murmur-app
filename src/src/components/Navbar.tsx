import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className="bg-white border-b sticky top-0 z-10">
            <div className="max-w-xl mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-blue-500 font-bold text-lg">
                    Murmur
                </Link>

                <Link to="/profile">
                    <img
                        src="https://i.pravatar.cc/40?img=1"
                        className="w-9 h-9 rounded-full"
                    />
                </Link>
            </div>
        </div>
    );
}
