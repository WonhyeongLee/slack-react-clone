import axios, {AxiosRequestConfig} from "axios";
import {baseUrl} from "./constants.js"

const config: AxiosRequestConfig = {baseURL: baseUrl};
export const axiosInstance = axios.create(config);