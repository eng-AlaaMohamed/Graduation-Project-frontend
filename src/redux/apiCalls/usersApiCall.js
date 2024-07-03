import { userActions } from '../slices/usersSlice';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import request from '../../utils/request';

// Get All Users profile
export function getAllUsersProfile( pageNumber ) {
    return async (dispatch) => {
        try{
            const { data } = await request.get(`/api/users/profilefreelancers?pageNumber=${pageNumber}`)
            dispatch(userActions.setUsers(data));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
};

//Fetch Users Based on category
export function fetchUsersBasedOnCategory(category) {
    return async (dispatch) => {
        try{
            const { data } = await request.get(`/api/users/profilefreelancers?category=${category}`)
            dispatch(userActions.setUsersCate(data));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
};

