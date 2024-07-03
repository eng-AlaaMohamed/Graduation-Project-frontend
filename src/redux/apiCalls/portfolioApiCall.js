import { portfolioActions } from '../slices/portfolioSlice';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import request from '../../utils/request';


//Create project in portfolio
export function createProjectInPortfolio(newProject) {
    return async (dispatch,getState) => {
        try{
            dispatch(portfolioActions.setLoading());
            const { data } = await request.post(`/api/portfolio`, newProject, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type" : "multipart/form-data"
                }
            })
            dispatch(portfolioActions.setIsPortfolioCreated());
            setTimeout(() => dispatch(portfolioActions.clearIsPortfolioCreated(), 2000));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
};


//Fetch Single portfolio
export function fetchSinglePortfolio( portfolioId ) {
    return async (dispatch) => {
        try{
            const { data } = await request.get(`/api/portfolio/${portfolioId}`)
            dispatch(portfolioActions.setPortfolios(data));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
};

//Delete Portfolio
export function deletePortfolio( portfolioId ) {

    return async (dispatch,getState) => {
        try{
            const { data } = await request.delete(`/api/portfolio/${portfolioId}`,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(portfolioActions.deletePortfolio(data.portfolioId));
            setTimeout(() => dispatch(portfolioActions.clearIsPortfolioDeleted(), 2000));
        } catch (error) {
            toast.error(error.response?.data.message);
        }
    }
};


//Update Portfolio Image
export function updatePortfolioImage( newImage, portfolioId ) {
    return async (dispatch,getState) => {
        try{
            dispatch(portfolioActions.setLoading());
            await request.put(`/api/portfolio/update-image/${portfolioId}`, newImage,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                    "Content-Type" : "multipart/form-data",
                }
            })
            dispatch(portfolioActions.setIsPortfolioImageChanged())
            toast.success("تم تحديث الصوره للعمل بنجاح");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
};
//Update Portfolio
export function updatePortfolio( newPortfolio, portfolioId ) {

    return async (dispatch,getState) => {
        try{
            const { data } = await request.put(`/api/portfolio/${portfolioId}`, newPortfolio,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(portfolioActions.setPortfolio(data));
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
};