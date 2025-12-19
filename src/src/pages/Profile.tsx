import FollowButton from '../components/FollowButton';
import type {ProfileProps} from "../types";


export default function Profile({ user }: ProfileProps) {

    return (
        <div className="max-w-xl mx-auto mt-6 bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-4">
                <img src="https://i.pravatar.cc/100?img=3" className="w-16 h-16 rounded-full" />
                <div>
                    <h2 className="text-xl font-bold">{user?.name}</h2>
                    <p className="text-gray-500">@{user?.name}</p>
                </div>
                <FollowButton userId={user?.id} />
            </div>
        </div>
    );
}