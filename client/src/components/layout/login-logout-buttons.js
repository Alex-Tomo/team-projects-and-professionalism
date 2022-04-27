import { Link } from "react-router-dom"
import AuthService from "../../services/auth.service"

/**
 * Login and logout buttons for the nav bar.
 * This will be changed based on if the user
 * is currently logged in.
 * 
 * @author Jordan Short, W18039155
 */

export default function LogButtons(props) {
    // Calls logout service checks if localhost or dev enviroment
    function logout() {
        AuthService.logout()
        if (window.location.href.indexOf("localhost") > -1) {
            window.location.href = "http://localhost:3000/"
          }else{
            window.location.href = "https://kipmcgrath.netlify.app/"
          }
        
    }
    let visible = false
    if (AuthService.getCurrentUser()) {
        visible = true
    }

    if (visible) {
        return (
            <button className="button kip-blue-background" onClick={logout}>
                Logout
            </button>
        )
    } else {
        return (
            <div>

                <Link className="button kip-blue-background focus-login" to="/login">    <span className="icon is-small">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </span><div>Sign In</div></Link>
            </div>

        )
    }
}
