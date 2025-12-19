// export default function FollowButton() {
//     return (
//         <button className="px-4 py-1 border rounded-full hover:bg-blue-500 hover:text-white">
//             Follow
//         </button>
//     );
// }
import { useFollowUserMutation, useUnfollowUserMutation, useGetMyFollowsQuery } from "../redux/follows/followsApi";
import { useState, useEffect } from "react";

interface Props {
    userId: number; // the profile user ID
}

export default function FollowButton({ userId }: Props) {
    const [isFollowing, setIsFollowing] = useState(false);
    const { data } = useGetMyFollowsQuery();
    const [followUser, { isLoading: isFollowingLoading }] = useFollowUserMutation();
    const [unfollowUser, { isLoading: isUnfollowing }] = useUnfollowUserMutation();

    // check if already following
    useEffect(() => {
        if (data?.data) {
            const followingIds = data.data.following.map((u) => u.id);
            setIsFollowing(followingIds.includes(userId));
        }
    }, [data, userId]);

    const handleClick = async () => {
        try {
            if (isFollowing) {
                await unfollowUser({ userId }).unwrap();
                setIsFollowing(false);
            } else {
                await followUser({ userId }).unwrap();
                setIsFollowing(true);
            }
        } catch (err) {
            console.error("Failed to update follow status", err);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={isFollowingLoading || isUnfollowing}
            className={`px-4 py-1 rounded-full border transition ${
                isFollowing
                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
        >
            {isFollowing ? "Following" : "Follow"}
        </button>
    );
}
