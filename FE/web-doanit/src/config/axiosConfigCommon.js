import axios from "axios";
import {toast} from "react-toastify";

const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return false;
    }
    // Giải mã JWT để lấy thời gian hết hạn
    const { exp } = JSON.parse(atob(token.split('.')[1]));
    // So sánh thời gian hết hạn với thời gian hiện tại
    return Date.now() < exp * 1000;
};

const axiosCommon = () => {

    axios.defaults.baseURL="http://localhost:8080";
    axios.defaults.headers.common['Authorization']= "Bearer "+ localStorage.getItem("token");

    axios.interceptors.request.use(function (config) {
        config.headers['Authorization']= "Bearer "+ localStorage.getItem("token");

        if (!checkTokenExpiration() && config.url !== "/api/auth/sign-in" ) {
            // navigator("/login");

            toast.warning("Phiên làm việc đã hết,bạn cần phải đăng nhập laị",{autoClose:1800});
            setTimeout(() => {
                window.location.href = "/login";
            },2000)

        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
}

export default  axiosCommon;
