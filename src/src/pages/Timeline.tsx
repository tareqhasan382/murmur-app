import { murmurs } from '../data/mockData';
import MurmurCard from '../components/MurmurCard';
import CreateMurmur from '../components/CreateMurmur';
import Navbar from '../components/Navbar';

export default function Timeline() {
    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center">

            {/* Navbar */}
            <Navbar />

            {/* Centered content */}
            <main className=" px-4 pt-6 ">
                <h1 className="text-2xl font-bold mb-4 text-gray-900 text-center sm:text-left">
                    Home
                </h1>

                <CreateMurmur />

                <div className="space-y-4">
                    {murmurs.map(m => (
                        <MurmurCard key={m.id} murmur={m} />
                    ))}
                </div>
            </main>
        </div>
    );
}
