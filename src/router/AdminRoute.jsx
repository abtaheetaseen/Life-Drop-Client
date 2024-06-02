import React, { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider';
import { Navigate } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();

    if(loading || isAdminLoading){
        return <div className='flex items-center justify-center'>
            <div className="loading loading-infinity loading-lg min-h-screen "></div>
        </div> 
    }

    if(user && isAdmin){
        return children;
    }

  return <Navigate to="/login"></Navigate>
}

export default AdminRoute
