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
import Profile from "../pages/dashboard/forEveryone/Profile";
import AdminRoute from "./AdminRoute";
import DonorDashboard from "../pages/dashboard/user/DonorDashboard";
import MyDonationRequest from "../pages/dashboard/user/MyDonationRequest";
import CreateDonationRequest from "../pages/dashboard/user/CreateDonationRequest";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";
import AllBloodDonationRequests from "../pages/dashboard/admin/AllBloodDonationRequests";
import ContentManagement from "../pages/dashboard/admin/ContentManagement";
import VolunteerDashboard from "../pages/dashboard/volunteer/VolunteerDashboard";
import VolunteerDonationRequests from "../pages/dashboard/volunteer/VolunteerDonationRequests";
import VolunteerContentManagement from "../pages/dashboard/volunteer/VolunteerContentManagement";

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
                element: <AdminRoute>
                <AllUsers />
                </AdminRoute>
            },
            {
                path: "admin-dashboard",
                element: <AdminRoute>
                <AdminDashboard />
                </AdminRoute>
            },
            {
                path: "all-blood-donation-request",
                element: <AdminRoute>
                <AllBloodDonationRequests />
                </AdminRoute>
            },
            {
                path: "content-management",
                element: <AdminRoute>
                <ContentManagement />
                </AdminRoute>
            },

            // profile page for all
            {
                path: "profile",
                element: <PrivateRoute>
                <Profile />
                </PrivateRoute>
            },

            // volunteer pages
            {
                path: "volunteer-dashboard",
                element: <PrivateRoute>
                <VolunteerDashboard />
                </PrivateRoute>
            },
            {
                path: "volunteer-all-donation-requests",
                element: <PrivateRoute>
                <VolunteerDonationRequests />
                </PrivateRoute>
            },
            {
                path: "volunteer-content-management",
                element: <PrivateRoute>
                <VolunteerContentManagement />
                </PrivateRoute>
            },

            // user/donor pages
            {
                path: "donor-dashboard",
                element: <PrivateRoute>
                <DonorDashboard />
                </PrivateRoute>
            },
            {
                path: "my-donation-requests",
                element: <PrivateRoute>
                <MyDonationRequest />
                </PrivateRoute>
            },
            {
                path: "create-donation-requests",
                element: <PrivateRoute>
                <CreateDonationRequest />
                </PrivateRoute>
            },
        ]
    }
])