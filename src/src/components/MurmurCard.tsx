import {FaTrash, FaRegHeart, FaHeart} from 'react-icons/fa';
import type {Murmur} from "../types";
import {useLikeMurmurMutation} from "../redux/murmurs/murmursApi.ts";
import avatar from "../assets/avatar.jpg";
import {timeAgo} from "../helper/timeCalculate.ts";
interface Props {
    murmur: Murmur;
}


export default function MurmurCard({ murmur }: Props) {
    //const authString = localStorage.getItem("murmur");
    //const auth = authString ? JSON.parse(authString) : null;
     //console.log("auth:", auth?.user);
    //const token = auth ? auth.accessToken : null;
    const [likeMurmur, { isLoading }] = useLikeMurmurMutation();
    const handleLike = async () => {
        try {
            await likeMurmur(murmur.id).unwrap();
        } catch (error) {
            console.error("Failed to like murmur");
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
                                {murmur.user.name}
                            </p>
                            <p className="text-xs text-gray-500">{timeAgo(murmur?.createdAt)}</p>
                        </div>
                        <button
                            className="text-gray-400 hover:text-red-500">
                            <FaTrash size={14} />
                        </button>
                    </div>


                    <p className="mt-2 text-gray-800 leading-relaxed">
                        {murmur.content}
                    </p>


                    <div className="flex items-center gap-6 mt-3 text-gray-500">
                        <button
                            onClick={handleLike}
                            disabled={isLoading}
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