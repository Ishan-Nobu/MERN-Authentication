import { useSelector } from "react-redux"

function HomePage(){

  const { userData } = useSelector((state) => state.userAuth)

  return (
    <div className="w-4xl h-100 flex flex-col items-center justify-center gap-5 mt-15 m-auto rounded-xl bg-gray-800">
       {userData &&
        <h1 className="text-5xl text-white font-bold text-center">Welcome, {userData.username}</h1> 
       }
       <p className="text-white text-2xl text-center p-2"> 
        This is a MERN Authentication Project. Authentication is done by storing JSON Web Tokens in HTTP-Only Cookies.
        This App uses Redux for state management and RTK Query for request handling. Styling is done with Tailwind CSS.</p>
    </div>
  )
}

export default HomePage