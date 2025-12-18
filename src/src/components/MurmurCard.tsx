import {  FaTrash, FaRegHeart } from 'react-icons/fa';
import type {Murmur} from "../types";



interface Props {
    murmur: Murmur;
}


export default function MurmurCard({ murmur }: Props) {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 space-y-3">
            <div className="flex gap-3">
                <img
                    src={murmur.user.profileImage}
                    className="w-11 h-11 rounded-full ring-2 ring-blue-400"
                />


                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-gray-900">
                                {murmur.user.name}
                            </p>
                            <p className="text-xs text-gray-500">{murmur.createdAt}</p>
                        </div>
                        <button className="text-gray-400 hover:text-red-500">
                            <FaTrash size={14} />
                        </button>
                    </div>


                    <p className="mt-2 text-gray-800 leading-relaxed">
                        {murmur.content}
                    </p>


                    <div className="flex items-center gap-6 mt-3 text-gray-500">
                        <button className="flex items-center gap-2 hover:text-red-500 transition">
                            <FaRegHeart />
                            <span>{murmur.likes}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}