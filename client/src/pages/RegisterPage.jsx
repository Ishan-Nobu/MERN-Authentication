import { useState } from "react"
import { useDispatch } from "react-redux"
import { setCredentials } from "../features/userAuthSlice"
import { toast } from "react-toastify"
import { useNavigate } from "react-router";
import { useRegisterMutation } from "../features/authApiSlice"

function RegisterPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const { username, email, password, confirmPassword } = formData;

    const [register] = useRegisterMutation();

    const handleSubmit = async(e) => {
        
        e.preventDefault();
        if (password !== confirmPassword) 
        {
            toast.error("Passwords do not match!");
        }
        else 
        {   
            try 
            {   
                const res = await register({ username, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast("Registered!");
                navigate("/home")
            } 
            catch (error) 
            {
                toast.error(error?.data?.msg);
            }
        }
    }
    return (
        <div className="flex flex-col items-center justify-center m-auto">
            {/* <h1 className="mt-10 font-bold text-3xl">MERN Authentication</h1> */}
            <form className="w-lg m-auto bg-gray-950 rounded-xl p-5 my-12 shadow-gray-500" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <h1 className="text-white font-bold text-4xl">Register</h1>
                </div>
                <div className="mb-5">
                    <label htmlFor="username" className="formLabels">Username</label>
                    <input type="text" className="inputFields" id="username" name="username"
                    value={username}
                    onChange={(e) => setFormData( {...formData, [e.target.name]: e.target.value} )} 
                    placeholder="Enter username" required autoComplete="off"/>
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="formLabels">E-mail</label>
                    <input type="email" className="inputFields" id="email" name="email"
                    value={email}
                    onChange={(e) => setFormData( {...formData, [e.target.name]: e.target.value} )} 
                    placeholder="Enter email" required autoComplete="off"/>
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="formLabels">New Password</label>
                    <input type="password" className="inputFields" id="password" name="password" minLength={8}
                    value={password}
                    onChange={(e) => setFormData( {...formData, [e.target.name]: e.target.value} )} 
                    placeholder="Enter password" required autoComplete="off"/>
                </div>
                <div className="mb-5">
                    <label htmlFor="confirmPassword" className="formLabels">Confirm Password</label>
                    <input type="password" className="inputFields" id="confirmPassword" name="confirmPassword" minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setFormData( {...formData, [e.target.name]: e.target.value} )} 
                    placeholder="Repeat password" required autoComplete="off"/>
                </div>
                <button type="submit" className="btnPrimary mt-3">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage