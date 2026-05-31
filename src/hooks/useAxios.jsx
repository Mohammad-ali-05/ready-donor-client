import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://ready-donor-server.onrender.com/api",
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;
