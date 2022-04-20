import axios from "axios"
import authHeader from "./auth-header"
import AuthService from "./auth.service"
const API_URL = "https://kip-learning.herokuapp.com/api/test/"
class UserService {
    getPublicContent() {
        return axios.get(API_URL + "all")
    }
    getUserBoard() {
        return axios.get(API_URL + "user", { headers: authHeader() }).catch((err) => {
            if(!localStorage.getItem('user') || err.response.status === 401){
                AuthService.logout()
                window.location.replace("https://kipmcgrath.netlify.app/login")
            }
        })
    }
    getTutorBoard() {
        return axios.get(API_URL + "tutor", { headers: authHeader() }).catch((err) => {
            if(!localStorage.getItem('user') || err.response.status === 401){
                AuthService.logout()
                window.location.replace("https://kipmcgrath.netlify.app/login")
            }
        })
    }
    getAdminBoard() {
        return axios.get(API_URL + "admin", { headers: authHeader() }).catch((err) => {
            if(!localStorage.getItem('user') || err.response.status === 401){
                    AuthService.logout()
                    window.location.replace("https://kipmcgrath.netlify.app/login")
                }
        })
    }
}
export default new UserService()