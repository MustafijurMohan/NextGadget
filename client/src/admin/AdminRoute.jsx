import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
    const { token, isAdmin } = useSelector(state => state.user);

    if (!token || !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default AdminRoute;
