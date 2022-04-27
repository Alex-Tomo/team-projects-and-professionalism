import axios from "axios"
import authHeader from "./auth-header"
import AuthService from "./auth.service"
const API_URL = "https://kip-learning.herokuapp.com/api/test/"

/**
 * User services that allow users access
 * to their respective dashboards and 
 * performs some validation to prevent access
 * to others.
 * 
 * @author Jordan Short, W18039155
 */

class UserService {
    
    //All access
    getPublicContent() {
        return axios.get(API_URL + "all")
    }

    //Student or user access
    getUserBoard() {
        return axios.get(API_URL + "user", { headers: authHeader() }).catch((err) => {
            if(!localStorage.getItem('user') || err.response.status === 401){
                AuthService.logout()
                window.location.replace("https://kipmcgrath.netlify.app/login")
            }
        })
    }

    //Tutor access
    getTutorBoard() {
        return axios.get(API_URL + "tutor", { headers: authHeader() }).catch((err) => {
            if(!localStorage.getItem('user') || err.response.status === 401){
                AuthService.logout()
                window.location.replace("https://kipmcgrath.netlify.app/login")
            }
        })
    }

    //Admin access
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