import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../layout/MainLayouts";
import ErrorPage from "../errorPage/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DonationRequests from "../pages/DonationRequests";
import Blog from "../pages/Blog";
import SearchDonor from "../pages/SearchDonor";
import DashboardLayout from "../layout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/dashboard/admin/AllUsers";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayouts />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/donation-requests",
                element: <DonationRequests />
            },
            {
                path: "/blog",
                element: <Blog />
            },
            {
                path: "/search-donor",
                element: <SearchDonor />
            },
        ]
    }, 
    {
        path: "/dashboard",
        element: <PrivateRoute>
        <DashboardLayout />
        </PrivateRoute>,
        children: [

            // admin
            {
                path: "allUsers",
                element: <PrivateRoute>
                <AllUsers />
                </PrivateRoute>
            },

            // normal users
            
        ]
    }
])