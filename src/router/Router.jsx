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
import UpdateDonationRequest from "../components/dashboard/UpdateDonationRequest";
import ViewDonationRequestDetails from "../components/dashboard/ViewDonationRequestDetails";
import VolunteerRoute from "./VolunteerRoute";
import AddBlog from "../components/dashboard/AddBlog";
import ReadBlog from "../components/ReadBlog";
import VolunteerAddBlog from "../components/dashboard/VolunteerAddBlog";
import Payment from "../pages/Payment";

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
            {
                path: "/update-donation-requests/:id",
                element: <PrivateRoute>
                <UpdateDonationRequest />
                </PrivateRoute>,
                loader: () => fetch(`https://assignment-12-server-three-virid.vercel.app/donationRequest`)
            },
            {
                path: "/view-donation-request-details/:id",
                element: <PrivateRoute>
                <ViewDonationRequestDetails />
                </PrivateRoute>,
                loader: () => fetch(`https://assignment-12-server-three-virid.vercel.app/donationRequest`)
            },
            {
                path: "/blog/:id",
                element: <PrivateRoute>
                    <ReadBlog />
                </PrivateRoute>,
                loader: ({params}) => fetch(`https://assignment-12-server-three-virid.vercel.app/publishedBlogs/${params.id}`)
            },
            {
                path: "/payment",
                element: <PrivateRoute>
                    <Payment />
                </PrivateRoute>
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
            {
                path: "add-blog",
                element: <AdminRoute>
                <AddBlog />
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
                element: <VolunteerRoute>
                <VolunteerDashboard />
                </VolunteerRoute>
            },
            {
                path: "volunteer-all-donation-requests",
                element: <VolunteerRoute>
                <VolunteerDonationRequests />
                </VolunteerRoute>
            },
            {
                path: "volunteer-content-management",
                element: <VolunteerRoute>
                <VolunteerContentManagement />
                </VolunteerRoute>
            },
            {
                path: "volunteer-add-blog",
                element: <VolunteerRoute>
                <VolunteerAddBlog />
                </VolunteerRoute>
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
                path: "update-donation-requests",
                element: <PrivateRoute>
                <UpdateDonationRequest />
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