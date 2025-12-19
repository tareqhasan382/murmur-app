import { useState } from "react";
import { useCreateMurmurMutation } from "../redux/murmurs/murmursApi";
import avatar from "../assets/avatar.jpg";

export default function CreateMurmur() {
    const [content, setContent] = useState("");
    const [createMurmur, { isLoading }] = useCreateMurmurMutation();

    const handleSubmit = async () => {
        if (!content.trim()) return;

        try {
            await createMurmur({ content: content.trim() }).unwrap();
            setContent(""); // clear textarea after success
        } catch (error) {
            console.error("Failed to create murmur", error);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
            <div className="flex gap-3">
                <img
                    src={avatar}
                    className="w-10 h-10 rounded-full"
                    alt="avatar"
                />

                <textarea
                    placeholder="What's happening?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="flex-1 resize-none border-none focus:ring-0 text-lg outline-none"
                    rows={3}
                    maxLength={280}
                />
            </div>

            <div className="flex justify-between items-center mt-3">
        <span className="text-xs text-gray-400">
          {content.length}/280
        </span>

                <button
                    onClick={handleSubmit}
                    disabled={isLoading || !content.trim()}
                    className={`
            px-5 py-2 rounded-full font-medium transition
            ${
                        content.trim()
                            ? "bg-blue-500 hover:bg-blue-600 text-white"
                            : "bg-blue-300 text-white cursor-not-allowed"
                    }
            ${isLoading ? "opacity-70" : ""}
          `}
                >
                    {isLoading ? "Posting..." : "Murmur"}
                </button>
            </div>
        </div>
    );
}
