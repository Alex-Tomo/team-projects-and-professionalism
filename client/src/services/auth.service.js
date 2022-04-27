import axios from "axios"
const API_URL = "https://kip-learning.herokuapp.com/api/auth/"

/**
 * Various authentication services to be
 * used across the application. These are to
 * manipulate and update states that rely on
 * authentication and authorisation.
 * 
 * @author Jordan Short, W18039155
 */

class AuthService {

    //Login service
    async login(username, password) {
        return await axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then((response) => {
                if (response.data.accessToken) { 
                    localStorage.setItem("user", JSON.stringify(response.data))
                }
                return response.data
            })
    }

    //Logout service
    logout() {
        localStorage.removeItem("user")
    }

    //Register new user service
    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        })
    }

    //Current logged in user service
    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"))
    }

    //Reset password email service
    passReset(username) {
        return axios.post(API_URL + "password-recovery", {
            username
        })
    }

    //Change password service
    passChange(password, token) {
        return axios.post(API_URL + "password-reset", {
            token,
            password
        })
    }
}
export default new AuthService()
