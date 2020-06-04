import React from 'react'

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
                    <Button type="facebook" href="/login/facebook" text="Continue with Facebook"/>
                    <Button type="phone" href="/login/phone" text="Continue with Phone"/>
                    <div className="login__alt">
                        Not able to login?
                        <a href=".">
                            Try here
                        </a>
                    </div>
                </div>
                <div className="version">
                    version 1.0
                </div>
            </div>
        </div>
    )
};
