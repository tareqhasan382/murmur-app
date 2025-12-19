import { murmurs } from '../data/mockData';
import MurmurCard from '../components/MurmurCard';
import CreateMurmur from '../components/CreateMurmur';
import Navbar from '../components/Navbar';
import { useGetMeQuery } from '../redux/auth/authApi';
import { useGetMurmursQuery } from '../redux/murmurs/murmursApi';

export default function Timeline() {
      const { data: me, isLoading, isError } = useGetMeQuery();
      const { data:murmursData, isLoading:getMurmursLoading, isError:getMurmursIsError } = useGetMurmursQuery({
    page: 1,
    limit: 10,
  });
      console.log("data---->",me)
      console.log("murmursData---->",murmursData)
    // getMe  useGetMeQuery
    if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isError || !me) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Unauthorized. Please login.
      </div>
    );
  }
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
