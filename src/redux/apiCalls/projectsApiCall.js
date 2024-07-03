import { projectActions } from '../slices/projectsSlice';
import 'react-toastify/dist/ReactToastify.css';
import request from '../../utils/request';
import { toast } from "react-toastify";


//Fetch Projects Based on page number
export function fetchProjects( pageNumber ) {
    return async (dispatch) => {
        try{
            const { data } = await request.get(`/api/projects?pageNumber=${pageNumber}`)
            dispatch(projectActions.setProjects(data));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
};

//Fetch Projects Count
export function fetchProjectsCount() {
    return async (dispatch) => {
        try{
            const { data } = await request.get(`/api/projects/count`)
            dispatch(projectActions.setProjectsCount(data));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
};

//Fetch Projects Based on category
export function fetchProjectsBasedOnCategory(category) {
    return async (dispatch) => {
        try{
            const { data } = await request.get(`/api/projects?category=${category}`)
            dispatch(projectActions.setprojectsCate(data));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
};

//Fetch Single Projects
export function fetchSingleProject( projectId ) {
    return async (dispatch) => {
        try{
            const { data } = await request.get(`/api/projects/${projectId}`)
            dispatch(projectActions.setProject(data));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
};

//Update Projects
export function updateProject( newProject, projectId ) {

    return async (dispatch,getState) => {
        try{
            const { data } = await request.put(`/api/projects/${projectId}`, newProject,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(projectActions.setProject(data));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
};

//Delete Projects
export function deleteProject( projectId ) {

    return async (dispatch,getState) => {
        try{
            const { data } = await request.delete(`/api/projects/${projectId}`,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(projectActions.deleteProject(data.projectId));
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
};

//Fetch All Projects
export function getAllProjects() {
    return async (dispatch) => {
        try{
            const { data } = await request.get(`/api/projects`);
            dispatch(projectActions.setProjects(data));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
};