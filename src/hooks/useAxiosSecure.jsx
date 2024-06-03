import axios from 'axios'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider';
import toast from 'react-hot-toast';

const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
})

const useAxiosSecure = () => {

    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);

    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem("access-token");
        config.headers.authorization = `Bearer ${token}`;

        return config;
    }, (error) => {
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use((response) => {
        return response
    }, (error) => {

        const status = error.response.status;
        if (status === 401 || status === 403) {
            logOut()
            .then(() => {
              toast.success("User logged out")
              navigate("/login")
      
            })
            .catch(error => {
              console.log(error)
            })
        }

        return Promise.reject(error);
    })

    return axiosSecure
}

export default useAxiosSecure