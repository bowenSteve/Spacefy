import ContactPage from "./components/CantactPage";
import LoginPage from "./components/Loginpage";
import MainPage from "./components/MainPage";
import SpaceCard from "./components/SpaceCard";
import Home from "./components/Home"
import SignUp from "./components/SignUP"
import Payment from "./components/Payment"

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
        path:"/contact",
        element: <ContactPage/>

    },
    {
        path: "/home",
        element:<Home />
    },
    {
        path: "/signup",
        element: <SignUp />
    }
    // {
    //     path: "/payment/:id",
    //     element:<Payment />
    // }



]
export default routes;