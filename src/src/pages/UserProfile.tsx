import FollowButton from '../components/FollowButton';
import {useParams} from "react-router-dom";
import {useGetUserQuery} from "../redux/auth/authApi.ts";


export default function UserProfile() {
    const { id } = useParams(); // get the id from URL
    const userId = Number(id);
    const { data:user, isLoading, isError } = useGetUserQuery(userId);
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (isError || !user?.data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                User not found
            </div>
        );
    }
    return (
        <div className="max-w-xl mx-auto mt-6 bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/100?img=3" className="w-16 h-16 rounded-full" />
                <div>
                    <h2 className="text-xl font-bold">{user?.data?.name}</h2>
                    <p className="text-gray-500">@{user?.data?.name}</p>
                </div>
                <FollowButton userId={user?.data?.id} />
            </div>
        </div>
    );
}