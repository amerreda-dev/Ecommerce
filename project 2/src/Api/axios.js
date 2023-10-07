import axios from "axios";
import {baseUrl} from "./api"
import Cookie from "cookie-universal"

const cookie = Cookie()
const token = cookie.get("e-commerce")

export const Axios = axios.create({
    baseURL:baseUrl,
    headers:{
        Authorization: `Bearer ${token}`
    }
})