import { useSelector, useDispatch} from "react-redux"
import { logout } from "../features/userAuthSlice";
import { useNavigate, Outlet } from "react-router";
import { toast } from "react-toastify"
import { useLogoutMutation } from "../features/authApiSlice";

function Header(){ 

  const { userData } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutReq] = useLogoutMutation();

  const handleLogout = async() => {
      dispatch(logout());
      try   
      {   
        await logoutReq().unwrap();
        toast("Logged Out!");
        window.location.reload();
      } 
      catch (error) 
      {
        console.error(error?.message);
      }
  }

  return (
    <>
      <nav className="bg-gray-900 border-2xl border-gray-950 shadow-lg shadow-gray-500">
          <div className="flex flex-wrap items-center justify-between mx-auto p-4">
            <h1 className="flex text-xl text-white font-bold items-center">MERN Authentication</h1>
          {userData ? (
            <>
            <div className="">
                <ul className="flex flex-row gap-4">
                  <li>
                    <button className="font-bold rounded-lg bg-blue-700 p-2 text-white hover:bg-blue-800 ease-in-out cursor-pointer" 
                    onClick={() => navigate("/home")}>Home</button>
                  </li>
                  <li>
                    <button className="font-bold rounded-lg bg-blue-700 p-2 text-white hover:bg-blue-800 ease-in-out cursor-pointer" 
                    onClick={() => navigate("/profile")}>Profile</button>
                  </li>
                  <li>
                    <button className="font-bold rounded-lg bg-blue-700 p-2 text-white hover:bg-blue-800 ease-in-out cursor-pointer" 
                    onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
            </div>         
            </> ) :
            <>
              <div className="">
                <ul className="flex flex-row gap-5">
                  <li>
                    <button className="font-bold rounded-lg bg-blue-700 p-2 text-white hover:bg-blue-800 ease-in-out cursor-pointer"
                    onClick={() => navigate('/')}>Login</button>
                  </li>
                  <li>
                    <button className="font-bold rounded-lg bg-blue-700 p-2 text-white hover:bg-blue-800 ease-in-out cursor-pointer" 
                    onClick={() => navigate('/register')}>Register</button>
                  </li>
                </ul>
              </div>
            </>
          }
        </div>
      </nav>
      <Outlet/>
    </>
  )
}

export default Header