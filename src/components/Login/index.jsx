import React from 'react'
import { Link } from 'react-router-dom'

import Button from '../Button'
import './Login.scss'

export default function Login() {
    return (
        <div className="login">
            <div className="login__header">
                <h1>
                    Welcome to 
                    <span className="login__header_high bold">Strings</span>
                    <span className="login__header_small bold">match, chat, connect.</span>
                </h1>
            </div>
            <div className="login__main">
                <div className="login__action">
                    <Button type="facebook" subClass="facebook" href="/signIn/facebook" text="Continue with Facebook"/>
                    <Button type="mail" subClass="mail" href="/signIn" text="SignIn with Mail"/>
                    <div className="login__alt">
                        Not able to login?
                        <Link to='/' className="red-link">
                            Try here
                        </Link>
                    </div>
                    <Link className="green-link" to='/signUp'>
                        Create an account
                    </Link>
                </div>
                <div className="version">
                    version 1.0
                </div>
            </div>
        </div>
    )
};
