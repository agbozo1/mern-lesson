import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Navbar = () => {

    const history = useHistory()

    const auth = useContext(AuthContext)


    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return(
        <nav>
            <div className="nav-wrapper teal darken-3" style ={{padding:'0 2rem'}}>
                <span href="/" className="brand-logo">Logo</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Create URL</NavLink></li>
                    <li><NavLink to="/links">Show Links</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Logout</a></li>

                </ul>
                
            </div>
            <p className="right black-txt">Welcome <span className="bolder"></span></p>
        </nav>
    )
}