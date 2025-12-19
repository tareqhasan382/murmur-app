

export default function Footer() {
    return (
        <footer className="w-full bg-amber-200 text-gray-700 py-6 mt-8">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

                {/* Left section: copyright */}
                <p className="text-sm text-center sm:text-left">
                    &copy; {new Date().getFullYear()} Murmurs. All rights reserved.
                </p>

                {/* Center section: navigation links */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                    <a href="/murmurs" className="hover:text-blue-600 transition text-center sm:text-left">About</a>
                    <a href="/murmurs" className="hover:text-blue-600 transition text-center sm:text-left">Contact</a>
                    <a href="/murmurs" className="hover:text-blue-600 transition text-center sm:text-left">Privacy Policy</a>
                </div>

                {/* Right section: social links */}
                <div className="flex justify-center sm:justify-end gap-3">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">Twitter</a>
                    <a href="https://github.com/tareqhasan382" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition">GitHub</a>
                </div>

            </div>
        </footer>
    );
}
