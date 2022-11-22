import axios, {AxiosRequestConfig} from "axios";
import {baseUrl} from "./constants.js"

const config: AxiosRequestConfig = {baseURL: baseUrl, withCredentials:true};
export const axiosInstance = axios.create(config);