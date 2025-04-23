import { useState, useEffect } from "react"
import { useSelector, useDispatch} from "react-redux"
import { toast } from "react-toastify"
import { setCredentials } from "../features/userAuthSlice";
import { useNavigate, Link } from "react-router";
import { useLoginMutation } from "../features/authApiSlice";

function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })
    
    const { userData } = useSelector((state) => state.userAuth);
    const { email, password } = loginData;

    const [login] = useLoginMutation();

    useEffect(() => {
        if (userData) 
        {
            navigate('/home');
        }
    }, [navigate, userData]);

    const handleSubmit = async(e) => {
        
        e.preventDefault()
        try 
            {   
                const res = await login({ email, password }).unwrap();
                console.log(res);
                dispatch(setCredentials({ ...res }));
                toast("Logged in successfully!");
                navigate("/home")
            } 
        catch (error) 
        {   
            toast.error(error?.data?.msg);
        }
    }

    return (
        <div className="w-6xl flex flex-row items-center justify-center m-auto gap-20">
            <div className="w-2xl flex flex-col items-start justify-center gap-4 mr-10 mb-20">
                <h1 className="text-5xl font-bold">MERN Authentication</h1>
                <p className="text-xl">This is a MERN Authentication Project. Authentication is done by storing JSON Web Tokens in HTTP-Only Cookies.</p>
            </div>
            <form className="w-lg m-auto bg-gray-950 rounded-xl p-5 my-25 shadow-2xl shadow-gray-500" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <h1 className="text-white font-bold text-4xl">Sign In</h1>
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="formLabels">E-mail</label>
                    <input type="email" className="inputFields" id="email" name="email"
                        value={email}
                        onChange={(e) => setLoginData({ ...loginData, [e.target.name]: e.target.value })}
                        placeholder="Enter email" required autoComplete="off" />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="formLabels">New Password</label>
                    <input type="password" className="inputFields" id="password" name="password" minLength={8}
                        value={password}
                        onChange={(e) => setLoginData({ ...loginData, [e.target.name]: e.target.value })}
                        placeholder="Enter password" required autoComplete="off" />
                </div>
                <button type="submit" className="btnPrimary mt-3">Login</button>
                <div className="mt-5">
                    <p className="text-amber-50 text-center">Not registered? <Link to="/register" className="text-blue-600 underline">Register</Link></p>
                </div>
            </form>
        </div>
    )
}

export default LoginPage