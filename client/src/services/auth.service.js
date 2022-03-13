import axios from "axios"
const API_URL = "http://localhost:8080/api/auth/"
class AuthService {
    login(username, password) {
        return axios
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
    logout() {
        localStorage.removeItem("user")
    }
    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        })
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"))
    }

    passReset(username){
        return axios.post(API_URL + "password-recovery", {
            username
        })
    }

    passChange(password, token){
        return axios.post(API_URL + "password-reset", {
            token,
            password
        })
    }
}
export default new AuthService()
