import { useSelector } from "react-redux";
import { useNavigate, Outlet, redirect } from "react-router";

const ProtectedRoutes = () => {

    const { userData } = useSelector((state) => state.userAuth);
    const navigate = useNavigate();

    return userData ? <Outlet/> : navigate('/');
}

export default ProtectedRoutes