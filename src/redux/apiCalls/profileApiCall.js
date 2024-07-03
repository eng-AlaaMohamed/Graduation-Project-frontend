import { profileActions } from '../slices/profileSlice';
import { authActions } from '../slices/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import request from '../../utils/request';
import { toast } from "react-toastify";
import Swal from "sweetalert2";


//Get User profile
export function getUserProfile( userId ) {
return async (dispatch) => {
    try{
        const { data } = await request.get(`/api/users/profile/${userId}`)
        dispatch(profileActions.setProfile(data));
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
};

//Upload profile photo
export function uploadProfilePhoto( newPhoto ) {
return async (dispatch, getState) => {
    try{
        dispatch(profileActions.setLoading());
        const { data } = await request.post(`/api/users/profile/profile-photo-upload`, newPhoto, {
            headers:{
                Authorization: "Bearer " + getState().auth.user.token,
                "Content-Type" : "multipart/from-data"
            }
        })
        dispatch(profileActions.setProfilePhoto(data.profilePhoto));
        dispatch(authActions.setUserPhoto(data.profilePhoto));
        dispatch(profileActions.clearLoading());
        Swal.fire({
            position: "center",
            icon: "success",
            title: "تم تغيير الصوره بنجاح",
            showConfirmButton: false,
            timer: 1500
            });
        setTimeout(() => window.location.reload(), 1511);

        //modify the user in locale storage withnew photo
        const user = JSON.parse(localStorage.getItem('userInfo'));
        user.profilePhoto = data?.profilePhoto;
        localStorage.setItem("userInfo", JSON.stringify(user));
        
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
};

//Update profile
export function updateProfile( userId,profile ) {
return async (dispatch, getState) => {
    try{
        const { data } = await request.put(`/api/users/profile/${userId}`, profile, {
            headers:{
                Authorization: "Bearer " + getState().auth.user.token,
            }
        })
        dispatch(profileActions.updateProfile(data));
        dispatch(authActions.setUsername(data.username));

        //modify the user in locale storage with new username
        const user = JSON.parse(localStorage.getItem('userInfo'));
        user.username = data?.username;
        localStorage.setItem("userInfo", JSON.stringify(user));
        
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
};

//Get Users count (For admin dashboard)
export function getUsersCount() {
return async (dispatch,getState) => {
    try{
        const { data } = await request.get(`/api/users/count`, {
            headers: {
                Authorization: "Bearer " + getState().auth.user.token,
            }
        })
        dispatch(profileActions.setUserCount(data));
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
};

//Get All Users Profile (For admin dashboard)
export function getAllUsersProfile() {
return async (dispatch,getState) => {
    try{
        const { data } = await request.get(`/api/users/profile`, {
            headers: {
                Authorization: "Bearer " + getState().auth.user.token,
            }
        })
        dispatch(profileActions.setProfiles(data));
    } catch (error) {
        toast.error(error.response.data.message)
    }
}
};

//Delete profile (Acount)
export function deleteProfile( userId ) {
return async (dispatch, getState) => {
    try{
        dispatch(profileActions.setLoadingDelete());
        const { data } = await request.delete(`/api/users/profile/${userId}`,{
            headers:{
                Authorization: "Bearer " + getState().auth.user.token,
            }
        })
        
        dispatch(profileActions.setIsProfileDeleted());
        toast.success(data.message);
        setTimeout(() => dispatch(profileActions.clearIsProfileDeleted()), 2000);
    } catch (error) {
        toast.error(error.response.data.message);
        dispatch(profileActions.clearLoadingDelete());
    }
}
};