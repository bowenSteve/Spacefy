import ContactPage from "./components/CantactPage";
import LoginPage from "./components/Loginpage";
import MainPage from "./components/MainPage";
import SpaceCard from "./components/SpaceCard";

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
    }



]
export default routes;