// import { murmurs } from '../data/mockData';
import MurmurCard from '../components/MurmurCard';
import CreateMurmur from '../components/CreateMurmur';
import Navbar from '../components/Navbar';
import { useGetMeQuery } from '../redux/auth/authApi';
import { useGetMurmursQuery } from '../redux/murmurs/murmursApi';
import Footer from "./Footer.tsx";

export default function Timeline() {
      const { data: me, isLoading, isError } = useGetMeQuery();
      const { data:murmursData, isLoading:getMurmursLoading, isError:getMurmursIsError } = useGetMurmursQuery({
    page: 1,
    limit: 10,
  });
    if (getMurmursLoading || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

  if (isError || getMurmursIsError || !me) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Unauthorized. Please login.
      </div>
    );
  }  if (getMurmursIsError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Unauthorized. Please login.
            </div>
        );
    }
    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center">

            {/* Navbar */}
            <Navbar user={me?.data} />

            {/* Centered content */}
            <main className=" px-4 pt-6 w-[310px]">
                <h1 className="text-2xl font-bold mb-4 text-gray-900 text-center sm:text-left">
                    Murmurs
                </h1>

                <CreateMurmur />

                <div className="space-y-4">
                    {murmursData?.data.map((murmur) => (
                        <MurmurCard key={murmur.id} murmur={murmur} />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
