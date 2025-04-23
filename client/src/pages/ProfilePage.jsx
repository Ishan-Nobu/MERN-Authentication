import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from "../features/userAuthSlice"
import { toast } from "react-toastify"
import { useNavigate } from "react-router";
import { useUpdateProfileMutation } from "../features/authApiSlice"


function ProfilePage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatedData, setUpdatedData] = useState({
      username: "",
      email: "",
      currentPassword: "",
      newPassword: "",
  })

  const { userData } = useSelector((state) => state.userAuth);
  let { username, email, currentPassword, newPassword } = updatedData;

  const[updateProfile] = useUpdateProfileMutation();
  
  useEffect(() => {
    setUpdatedData({...updatedData, username: userData.username, email: userData.email});
  }, [userData.username, userData.email])

  const handleSubmit = async(e) => {

      e.preventDefault();
      try 
      {   
          const res = await updateProfile({ username, email, currentPassword, newPassword }).unwrap();
          dispatch(setCredentials({ ...res }));
          toast("Profile Updated!");
          navigate('/home')
      } 
      catch (error) 
      {
          toast.error(error?.data?.msg);
      }
  }

  return (
    <div className="flex flex-col items-center justify-center m-auto">
      <form className="w-lg m-auto bg-gray-950 rounded-xl p-5 my-12 shadow-gray-500" onSubmit={handleSubmit}>
        <div className="mb-5">
          <h1 className="text-white font-bold text-4xl">Update Profile</h1>
        </div>
        <div className="mb-5">
          <label htmlFor="username" className="formLabels">Username</label>
          <input type="text" className="inputFields" id="username" name="username"
            value={username}
            onChange={(e) => setUpdatedData({ ...updatedData, [e.target.name]: e.target.value })}
            placeholder="Enter username" autoComplete="off" />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="formLabels">E-mail</label>
          <input type="email" className="inputFields" id="email" name="email"
            value={email}
            onChange={(e) => setUpdatedData({ ...updatedData, [e.target.name]: e.target.value })}
            placeholder="Enter email" autoComplete="off" />
        </div>
        <div className="mb-5">
          <label htmlFor="currentPassword" className="formLabels">Current Password</label>
          <input type="password" className="inputFields" id="currentPassword" name="currentPassword" minLength={8}
            value={currentPassword}
            onChange={(e) => setUpdatedData({ ...updatedData, [e.target.name]: e.target.value })}
            placeholder="Enter password" required autoComplete="off" />
        </div>
        <div className="mb-5">
          <label htmlFor="newPassword" className="formLabels">New Password</label>
          <input type="password" className="inputFields" id="newPassword" name="newPassword" minLength={8}
            value={newPassword}
            onChange={(e) => setUpdatedData({ ...updatedData, [e.target.name]: e.target.value })}
            placeholder="Repeat password" autoComplete="off" />
        </div>
        <button type="submit" className="btnPrimary mt-3">Update</button>
      </form>
    </div>
  )
}

export default ProfilePage