import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import Header from "./components/Header"
import ProtectedRoutes from "./components/ProtectedRoutes"
import { ToastContainer } from "react-toastify"
import { BrowserRouter, Routes, Route } from "react-router"

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header/>}>
          <Route index element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
            <Route path="" element={<ProtectedRoutes/>}>
              <Route path="/home" element={<HomePage/>}/>
              <Route path="/profile" element={<ProfilePage/>}/>
            </Route>
        </Route>
      </Routes>
    </BrowserRouter>  
    <ToastContainer/>
    </>
  )
}

export default App
