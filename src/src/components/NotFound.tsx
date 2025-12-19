import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="lg:px-28 px-2 py-10 w-full h-[400px] flex flex-col items-center justify-center">
            <h1 className="text-7xl font-extrabold text-gray-900">404</h1>
            <p className="uppercase text-center text-gray-600 mt-2">
                We are sorry, but the page you requested was not found.
            </p>
            <div className="flex items-center gap-4 mt-5">
                <Link to="/">
                    <button className="w-[120px] h-[40px] bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                        Go Home
                    </button>
                </Link>
                <button className="w-[120px] h-[40px] bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition">
                    Contact us
                </button>
            </div>
        </div>
    );
};

export default NotFound;
