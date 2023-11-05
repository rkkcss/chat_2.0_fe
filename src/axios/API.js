import axios from 'axios';

const serverMode = process.env.NODE_ENV;

export const API = axios.create({
    baseURL: serverMode == "development" ? "http://localhost:8080" : ""
});

API.interceptors.request.use(
    async config => {
        config.withCredentials = true;
        config.headers["Accept"] = "application/json";
        config.headers["Content-Type"] = "application/json"
        return config;
    },
    error => {
        console.error(error)
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log('error',{error});
        if (error.response != null) {
            console.log('if 1')
            switch (error.response.status) {
                case 404:
                    // notification.error({ message: "Valami nincs rendben!" });
                    break;
                case 401:
                    window.location.href = '/logout';
                    break;
                default:
                    // notification.error({ message: error.response.statusText });
                    break;
            }   
        }else{
            window.location.href = '/logout'
        }
        return Promise.reject(error);
    }
)
