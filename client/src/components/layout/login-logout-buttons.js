<<<<<<< HEAD
import { Link } from "react-router-dom"
import AuthService from "../../services/auth.service"

export default function LogButtons(props) {
  function logout() {
    AuthService.logout()
    window.location.href = "http://localhost:3000/"
  }
  let visible = false
  if (AuthService.getCurrentUser()) {
    visible = true
  }

  if (visible) {
    return (
      <button className="button is-danger" onClick={logout}>
        Logout
      </button>
    )
  } else {
    return (
      <Link className="button is-info" to="/login">
        Log in
      </Link>
    )
  }
}
=======
import { Link } from "react-router-dom"
import AuthService from "../../services/auth.service"

export default function LogButtons(props) {
  function logout() {
    AuthService.logout()
    window.location.href = "http://localhost:3000/"
  }
  let visible = false
  if (AuthService.getCurrentUser()) {
    visible = true
  }

  if (visible) {
    return (
      <button className="button is-danger" onClick={logout}>
        Logout
      </button>
    )
  } else {
    return (
      <Link className="button is-info" to="/login">
        Log in
      </Link>
    )
  }
}
>>>>>>> 765f8d850a3d348bf537100e686482219fb18127
