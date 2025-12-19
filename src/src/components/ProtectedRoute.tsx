import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type {RootState} from "../redux/store.ts";
import type {JSX} from "react";
// import { RootState } from "../Redux/store";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const auth = useSelector((state: RootState) => state.auth);
//console.log("auth------>",auth)
    if (!auth?.user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;