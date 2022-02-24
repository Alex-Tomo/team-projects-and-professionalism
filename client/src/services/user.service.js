import axios from "axios"
import authHeader from "./auth-header"
import AuthService from "./auth.service"
const API_URL = "http://localhost:8080/api/test/"
class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all")
  }
  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() }).catch((err) => {
      AuthService.logout()
      window.location.replace("http://localhost:3000/login")
      console.log(err)
    })
  }
  getTutorBoard() {
      return axios.get(API_URL + "tutor", { headers: authHeader() }).catch((err) => {
        AuthService.logout()
        window.location.replace("http://localhost:3000/login")
        console.log(err)
      })
  }
  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() }).catch((err) => {
      AuthService.logout()
      window.location.replace("http://localhost:3000/login")
      console.log(err)
    })
  }
}
export default new UserService()