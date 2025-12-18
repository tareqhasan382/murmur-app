export default function CreateMurmur() {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
            <div className="flex gap-3">
                <img
                    src="https://i.pravatar.cc/100?img=1"
                    className="w-10 h-10 rounded-full"
                />


                <textarea
                    placeholder="What's happening?"
                    className="flex-1 resize-none border-none focus:ring-0 text-lg"
                    rows={3}
                />
            </div>


            <div className="flex justify-end mt-3">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full font-medium">
                    Murmur
                </button>
            </div>
        </div>
    );
}