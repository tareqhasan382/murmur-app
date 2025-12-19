import {FaTrash, FaRegHeart, FaHeart} from 'react-icons/fa';
import type {Murmur} from "../types";
import {useLikeMurmurMutation,useDeleteMurmurMutation} from "../redux/murmurs/murmursApi.ts";
import avatar from "../assets/avatar.jpg";
import {timeAgo} from "../helper/timeCalculate.ts";
import {Link} from "react-router-dom";
interface Props {
    murmur: Murmur;
    me:ProfileProps
}

export default function MurmurCard({ murmur,me }: Props) {
    const [likeMurmur, { isLoading }] = useLikeMurmurMutation();
    const [deleteMurmur, { isLoading:isDeleting  }] = useDeleteMurmurMutation();
    const handleLike = async () => {
        try {
            await likeMurmur(murmur.id).unwrap();
        } catch (error) {
            console.error("Failed to like murmur");
        }
    };
    console.log("me------>",me)
    console.log("murmur------>",murmur)
    const handleDelete = async () => {
        const confirm = window.confirm("Delete this murmur?");
        if (!confirm) return;

        try {
            await deleteMurmur(murmur.id).unwrap();
        } catch {
            console.error("Failed to delete murmur");
        }
    };
    return (
        <div className="bg-white min-w-full rounded-2xl shadow-sm hover:shadow-md transition p-4 space-y-3">
            <div className="flex gap-3">
                {murmur?.user?.profileImage ? (
                    <img
                        alt="user avatar"
                        src={murmur?.user?.profileImage}
                        className="w-11 h-11 rounded-full ring-2 ring-blue-400"
                    />
                ):(
                    <img
                        alt="user avatar"
                        src={avatar}
                        className="w-11 h-11 rounded-full ring-2 ring-blue-400"
                    />
                )}

                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-gray-900">
                                <Link
                                    to={`/profile/${murmur.user.id}`}
                                    className="hover:underline hover:text-blue-600"
                                >
                                    {murmur.user.name}
                                </Link>
                            </p>
                            <p className="text-xs text-gray-500">{timeAgo(murmur?.createdAt)}</p>
                        </div>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting || me?.id !== murmur.user.id}
                            className={`
    transition
    ${me?.id === murmur.user.id
                                ? "text-gray-400 hover:text-red-500 cursor-pointer"
                                : "text-gray-300 cursor-not-allowed"}
    ${isDeleting ? "opacity-50" : ""}
  `}
                        >
                            <FaTrash size={14} />
                        </button>

                    </div>


                    <p className="mt-2 text-gray-800 leading-relaxed">
                        {murmur.content}
                    </p>


                    <div className="flex items-center gap-6 mt-3 text-gray-500">
                        <button
                            onClick={handleLike}
                            disabled={isLoading || murmur?.isLiked}
                            className={` ${murmur?.isLiked? 'text-red-500':''} flex items-center gap-2 hover:text-red-500 transition`}>
                            {/*<FaRegHeart  />*/}
                            {murmur?.isLiked? <FaHeart /> : <FaRegHeart />}
                            <span>{murmur.likesCount}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}