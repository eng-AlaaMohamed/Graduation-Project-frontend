import  axios from "axios";

const request = axios.create({
    baseURL: "https://graduation-project-backend-seven.vercel.app"
});

export default request;