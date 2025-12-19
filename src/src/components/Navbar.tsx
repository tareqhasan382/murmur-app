
import Profile from "../pages/Profile.tsx";
import type {ProfileProps} from "../types";

export default function Navbar({ user }: ProfileProps) {
    return (
        <div className="bg-white rounded-xl mt-1 sticky top-0 z-10">
            <div>
                <Profile user={user} />

            </div>
        </div>
    );
}
