import LoginPage from "./components/Loginpage";
import MainPage from "./components/MainPage";
import SpaceCard from "./components/SpaceCard";
import Home from "./components/Home"
import SignUp from "./components/SignUP"

const routes = [

    {
        path: "/",
        element: <MainPage />
    },
    {
        path:"/space/:id",
        element: <SpaceCard />
    },
    {
        path:"/login",
        element:<LoginPage />
    },
    {
        path: "/home",
        element:<Home />
    },
    {
        path: "/signup",
        element: <SignUp />
    }


]
export default routes;