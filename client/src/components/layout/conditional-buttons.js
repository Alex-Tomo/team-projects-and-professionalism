import { Link } from "react-router-dom"
import AuthService from "../../services/auth.service"

export default function ConditionalButtons(props) {
  let userRole
  if (AuthService.getCurrentUser()) {
    userRole = AuthService.getCurrentUser().roles[0]
  }

  if (userRole === "ROLE_ADMIN") {
    //Admin pages here
    return (
      <Link className="navbar-item" to="/admin">
        Admin Dashboard
      </Link>
    )
  } else if (userRole === "ROLE_USER") {
    //User pages here
    return (
      <Link className="navbar-item" to="/user">
        Student Dashboard
      </Link>
    )
  } else if (userRole === "ROLE_TUTOR"){
    return (
      <Link className="navbar-item" to="/tutor">
        Tutor Dashboard
      </Link>
    )
  }
   else {
    return ""
  }
}