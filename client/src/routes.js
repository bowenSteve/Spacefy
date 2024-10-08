import LoginPage from "./components/Loginpage";
import MainPage from "./components/MainPage";
import SpaceCard from "./components/SpaceCard";
import Home from "./components/Home"
import SignUp from "./components/SignUP"
import Payment from "./components/Payment"
import SimulatePay from "./components/SimulatePay";
import Profile from "./components/Profile"
import Services from "./components/Services";
import Agreement from "./components/Agreement";
import ContactPage from "./components/ContactPage";
import AboutUs from "./components/AboutUs"


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
    },  
    {
        path: "/payment/:id",
        element:<Payment />
    },
    {
        path:"/simulate",
        element:<SimulatePay />
    },
    {
        path:"/profile",
        element:<Profile />

    },
    {
        path:"/contact",
        element:<ContactPage />

    },
    {
        path:"/agreement",
        element:<Agreement />

    },
    {
        path:"/services",
        element:<Services/>
    },
    {
        path:"/aboutus",
        element:<AboutUs />
    }

]
export default routes;