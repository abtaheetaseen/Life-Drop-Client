import { useContext } from 'react'
import { AuthContext } from '../provider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useVolunteer = () => {

    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const {data: isVolunteer, isPending: isVolunteerLoading} = useQuery({
        queryKey: ["isVolunteer", user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/user/volunteer/${user?.email}`);
            console.log(res.data);
            return res.data?.volunteer;
        }
    })
    return [isVolunteer, isVolunteerLoading];

}

export default useVolunteer
