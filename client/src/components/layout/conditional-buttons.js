import { NavLink } from "react-router-dom"
import AuthService from "../../services/auth.service"
import grid from "../../images/grid.svg"
import list from "../../images/list.svg"
import completed from "../../images/completed.svg"
import support from "../../images/support.svg"

export default function ConditionalButtons(props) {
    let userRole
    if (AuthService.getCurrentUser()) {
        userRole = AuthService.getCurrentUser().roles[0]
    }

    if (userRole === "ROLE_ADMIN") {
        //Admin pages here
        return (
            <div className="navbar-item center ">
                <NavLink className="navbar-item gaps small nav-text" to="admin">
                    <img className="mr-2" alt="dashboard" src={grid} />Dashboard
                </NavLink>
                <NavLink className="navbar-item gaps small nav-text" to="management">
                    <img className="mr-2" alt="management" src={list} />Management
                </NavLink>
                <NavLink className="navbar-item gaps small nav-text" to="admin">
                    <img className="mr-2" alt="support" src={support} />Support
                </NavLink>
            </div>
        )
    } else if (userRole === "ROLE_USER") {
        //User pages here
        return (
            <div className="navbar-item center ">
                <NavLink className="navbar-item gaps small nav-text" to="user">
                    <img className="mr-2" alt="dashboard" src={grid} />Dashboard
                </NavLink>
                <NavLink className="navbar-item gaps small nav-text" to="/topics">
                    <img className="mr-2" alt="practice" src={list} />Practice
                </NavLink>
                <NavLink className="navbar-item gaps nav-text" to="/completed">
                    <img className="mr-2" alt="completed" src={completed} />Completed Tests
                </NavLink>
                <NavLink className="navbar-item gaps small nav-text" to="/user">
                    <img className="mr-2" alt="support" src={support} />Support
                </NavLink>
            </div>
        )
    } else if (userRole === "ROLE_TUTOR") {
        return (
            <div className="navbar-item center ">
                <NavLink className="navbar-item gaps small" to="user">
                    <img className="mr-2" alt="dashboard" src={grid} />Dashboard
                </NavLink>
                <NavLink className="navbar-item gaps small" to="/math">
                    <img className="mr-2" alt="practice" src={list} />Practice
                </NavLink>
                <NavLink className="navbar-item gaps" to="/user">
                    <img className="mr-2" alt="completed" src={completed} />Completed Tests
                </NavLink>
                <NavLink className="navbar-item gaps small" to="/user">
                    <img className="mr-2" alt="support" src={support} />Support
                </NavLink>
            </div>
        )
    }
    else {
        return ""
    }
}