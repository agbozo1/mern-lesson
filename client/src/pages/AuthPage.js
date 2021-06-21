import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'


export const AuthPage = () => {
    const message = useMessage()
    const auth = useContext(AuthContext)
    const{loading, request, error, clearError} = useHttp() //load custom  hooks

    const [form, setForm] = useState({
        email: '', password:''
    })

    useEffect (()=>{
        console.log('Error',error)
        message(error)
        clearError()
    }, [error, message, clearError])


    useEffect (()=>{
        window.M.updateTextFields()
    }, [])

    //create method
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {
            
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {
            
        }
    }

    //front-end
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h4>URL Shortener</h4>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authentication</span>

                        <div className="input-field ">
                            <input id="email" name="email" type="text" className="yellow-input" 
                            placeholder="Enter Your Email" autoComplete="off" value={form.email}
                            onChange={changeHandler} />
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-field ">
                            <input id="password" name="password" type="text" className="yellow-input" 
                            placeholder="Enter Your Password" autoComplete="off" value={form.password}
                            onChange={changeHandler}/>
                            <label htmlFor="password">Password</label>
                        </div>

                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4" 
                        style={{ marginRight: 10 }}
                        onClick={loginHandler} 
                        disabled={loading}>
                            Login
                            </button>
                        
                        <button className="btn yellow lighten-1 black-text" 
                        onClick={registerHandler} 
                        disabled={loading}>
                            Registration
                            </button>
                    </div>
                </div>
            </div>
        </div>
    )
}